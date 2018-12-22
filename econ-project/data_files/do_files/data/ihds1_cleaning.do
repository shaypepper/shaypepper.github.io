**************************************************************
*  Relationship between Domestic Violence  and work in India *
*  by Shay Culpepper with much help from Prabal De           *
*  City College of New York                                  *
**************************************************************

clear
capture log close
cd "/Users/shaypepper/Documents/2018-fall-ccny/econometrics/data/IHDS-I/"

**************************************************************
*  INDEX
**************************************************************

* 1.   DEPENDENT VARIABLES   : (y#)   Labor Force Participation
* 2.a  INDEPENDENT VARIABLES : (xi#)  Individual Level
* 2.b  INDEPENDENT VARIABLES : (xs#)  Spouse Level
* 2.c  INDEPENDENT VARIABLES : (xh#)  Household Level
* 2.d  INDEPENDENT VARIABLES : (xdv#) Women's Questions
* 2.e  INDEPENDENT VARIABLES : (xv#)  Village Level
*      MERGE DATA
* 3    DESCRIPTIVES
* 4    REGRESSIONS

*************************************************************
** 1. DEPENDENT VARIABLES : Labor Force Participation
*************************************************************
use "dtas/individual.dta", clear

** y1 : Did this person work?  
  gen work__any = 0
  recode AN6 (. = 0) (1 = 0) (2/3 = 1), gen (AN6b)

  foreach var of varlist FM29 NF17 NF26 NF8 WS5A AN6b {
    * Remove missing observations
    recode `var' (. = 0) (-5/-1 = .) (1/365=1), gen(`var'b)
    replace work__any = 1 if `var'b == 1
    local label : variable label `var'
    la var `var'b `"Binary: `label''"'
  }

  gen work_bus = 0 if (NF17 != .) | (NF26!= .) | (NF8b != .)
  replace work_bus = 1 if NF17b > 0 | NF26b > 0 | NF8b > 0

  ren FM29b work_farm
  ren WS5Ab work_wage
  ren AN6b work_animal

  gen work_home = max(work_farm, work_animal, work_bus)
  gen work_outside = work_wage
  gen work_none = min(1-work_outside, 1-work_home)
  
** y2 : Hours worked
  foreach var of varlist FM29 FM30 ///
  NF17 NF18 NF26 NF27 NF8 NF9 WS6YEAR {
    recode `var' (. = 0) (-5/-1 = .), gen(`var't)
    local label : variable label `var'
    la var `var't `"`label'"'
  }
  gen work_hours = FM29t*FM30t + NF17t*NF18t + NF26t*NF27t ///
    + NF8t*NF9t + WS6YEARt
    
** y3 : Full-time/Part-time
  recode work_hours (0=0)(1/1250=1)(1250/9850=0), gen(work_parttime)
  recode work_hours (0=0)(1/1250=0)(1250/9850=1), gen(work_fulltime)
  recode work_hours (0=0)(1/1250=1)(1250/9850=2), gen(work_partfulltime)
  label define partfull 0 "No work" 1 "Part-time" 2 "Full-time"
  label values work_partfulltime partfull

** y4 : Salary
recode WS8ANNUAL (. = 0), gen(work_earnings)

** Labeling Variables
la var work__any         "y1 : Any work?"
la var work_animal       "y1 : Work with animals?"
la var work_bus          "y1 : Work in a household business?"
la var work_farm         "y1 : Work on the farm?"
la var work_wage         "y1 : Work for wages or salary?"
la var work_home         "y1 : Work at home?"
la var work_outside      "y1 : Work outside of the home?"
la var work_none         "y1 : No work?"
la var work_hours        "y2 : Hours worked"
la var work_parttime     "y3 : Part-time worker"
la var work_fulltime     "y3 : Full-time worker"
la var work_partfulltime "y3 : Part/Full-time worker"
la var work_earnings     "y4 : Salary"

****************************************************************
** 2.A INDEPENDENT VARIABLES : Individual Level
****************************************************************

** xi1 : Age
  gen age = RO5
  gen age_sq = age^2

** xi2 : Education Level
  recode ED5 HHED5ADULT HHED5F HHED5M (-7/-1 =.)             ///
    (0=0 "xi2: No school") (1/5=1 "xi2: Primary")            ///
    (6/10=2 "xi2: Upper Primary")(11/12=3 "xi2: Secondary")  ///
    (13/15=4 "xi2: Higher"),                                 ///
    gen(edu_levels highestedu highesteduf highestedum) label(edu)

  recode edu_levels (0/3=0)(4=1), gen(edu_anycollege)
  recode ED5 (-7/-1 =.)(0/14=0)(15=1), gen(edu_collegegrad)

  gen edu_current =  .
  replace edu_current = 0 if ED3 == 0
  replace edu_current = ED4 if ED3 == 1

** xi3 : Literacy
  recode ED2 (-4/-1 = .), gen(edu_lit)

** xi4 : Married or single?
  recode RO6 (0/1 = 1)(2/5 = 0), gen(married)

** xi5 : Gender
  gen male   = 2 - RO3
  gen female = RO3 - 1

** xi6 : Smoking, Drinking, Chewing
  recode TO2 TO3 TO4 (-6/-1 = .)(. = 0) (1=0) (2=1), ///
    gen(ta_smoke ta_chew ta_drink)
  gen ta_any = ta_smoke + ta_chew + ta_drink
  recode ta_any (1/3 = 1)

la var age                 "xi1: Age"
la var age_sq              "xi1: Age Squared"
la var edu_levels          "xi2: Education level"
la var edu_current         "xi2: Currently Enrolled"
la var edu_collegegrad     "xi2: College Grad"
la var edu_anycollege      "xi2: Any college"
la var edu_lit             "xi3: Literacy"
la var married             "xi4: Married"
la var female              "xi5: Gender - Female"
la var male                "xi5: Gender - Male"
la var ta_smoke            "xi6: Tob/Acl - Smoke"
la var ta_chew             "xi6: Tob/Acl - Chew"
la var ta_drink            "xi6: Tob/Acl - Drink"
la var ta_any              "xi6: Tob/Acl - Sm/Ch/Drink"

** xh6 : Children at home
    tempvar youngest
    egen `youngest' = min(age), by (IDHH)
    recode `youngest' (0/5 = 1) (6/200 =0), gen(nunder5)
    drop `youngest'

***************************************************************
** 2.B INDEPENDENT VARIABLES : Spouse Variables from IL
***************************************************************
  gen PERSONIDM = PERSONID if (married == 1)
  gen spouseid1 = PERSONIDM + RO7
  gen spouseid2 = abs(PERSONIDM - RO7)

foreach var of varlist age* edu_* work_* ta_* {
  foreach g in male female {
    gen  `g'`var' = `var' if   (`g' == 1) & (married == 1)
    egen `g'_sp_`var' = mean(`g'`var'), by(IDHH spouseid1 spouseid2)
  }
  replace male_sp_`var' = female_sp_`var' if (male == 1) & (married == 1)
  egen SP_`var'=mean(male_sp_`var'), by(IDHH RO7)
  local label : variable label `var'
  la var SP_`var' `"sp`label'"'
  drop *male*`var'
}


** xs1 : Spouse Education
  label values SP_edu_levels edu

** xs2 : Spouse work

** xs3 : Spouse Literacy

***************************************************************
** SORT AND ORDER DATA
***************************************************************
gen EWPERSON = PERSONID
sort IDHH PERSONID
order IDHH PERSONID CASEID female male age married edu_* SP* work_*
save "dtas/individualfinal.dta", replace

***************************************************************
** 2.C INDEPENDENT VARIABLES : Household Level
***************************************************************
use "dtas/hh.dta", clear

** xh1 : Religion (HH pg3)
  recode ID14 (-7/-1 = .) (1 = 1 "Hindu") (2=2 "Muslim")   ///
             (3=3 "Christian")(4/9 = 4 "Other"),          ///
             gen(hh_religion) label(hh_religion)

  recode ID13 (-7/-1 = .), gen(hh_caste)
  label values hh_caste ID13

  ta hh_religion, gen(hh_rel)
  ta hh_caste, gen(hh_cas)

  forv x = 1/4 {
    local rel`x' : label hh_religion `x'
    la var hh_rel`x' `"xh1: Religion - `rel`x'' "'
  }

  forv x = 1/5 {
    local cas`x' : label hh_caste `x'
    la var hh_cas`x' `"xh1: Caste - `cas`x'' "'
  }      

  la var hh_religion   "xh1: Religion"
  la var hh_caste      "xh1: Caste "
 
** xh2 : Urban/Rural
  recode ID9 (1 = 0) (2/3 = 1), gen(urban)
  label value urban URBAN

** xh3 : Region
  recode STATEID (1 2 3 4 5 6 7 9 = 1 "Northern") /// 
			/// Jammu & Kashmir, Himachal Pradesh, Punjab, Chandigarh, Uttaranchal
			/// Haryana, Delhi, Uttar Pradesh
    (11 12 17 18 = 2 "Northeastern")              ///
			/// Sikkim, Arunachal Pradesh, Meghalaya, Assam
    (10 13 14 15 16 19 20 21 = 3 "Eastern")       ///
			/// Bihar, Nagaland, Manipur, Mizoram, Tripura
			/// West Bengal, Jharkhand, Orissa
    (8 24 25 26 27 30 = 4 "Western")              ///
			/// Rajasthan, Gujarat, Daman & diu, Dadra+Nagar Haveli
			/// Maharashtra, Goa
    (28 29 31 32 33 34 = 5 "Southern")            ///
			/// Andhra Pradesh, Karnataka, Lakshadweep, Kerala
			/// Tamil Nadu, Pondicherry
    (22 23 = 6 "Central"),                        ///
			/// Chattishgarh, Madhya Pradesh
    gen(REGION) label(REGION)
  ta REGION, gen(REGION)
  forv x = 1/6 {
    local REG`x' : label REGION `x'
    la var REGION`x'   "xh3: Region - `REG`x'' "
  }

** xh4 : Assets & Affluence
  gen hh_assets = HHASSETS
  quietly pca HHASSETS HHED2 HHED5ADULT
  quietly predict hh_aff1-hh_aff6, score

  egen affcut=cut(hh_aff1), group(5)
  egen cutCOPC = cut(COPC), group(5)
  egen cutASSETS = cut(hh_assets), group(5)
	label define affcut 0 "Poorest" 1 "Poorer" 2 "Middle" ///
		3 "Richer" 4 "Richest", add
	label values affcut affcut

** xh5 : Main source of income
  local xh5 "xh5: HH Income -" 
  recode ID15 (1 2 5 6 7 = 1 "`xh5' Business")        ///       
             (3 4 8 9   = 2 "`xh5' Wage Income")      ///      
             (10 11     = 3 "`xh5' Unearned Income"), ///      
             gen(hh_mainincome) label(hhmi)
      
la var hh_religion    "xh1: Religion"
la var hh_caste       "xh1: Caste "
la var urban          "xh2: Urban "
la var REGION         "xh3: Region "
la var hh_assets      "xh4: Household Assets "
la var INCOME5        "xh5: Income Quintile (Neg = 0)"
la var cutCOPC        "xh5: Consumption Quintile"
la var COPC           "xh5: Consumption per capita"
la var affcut         "xh5: Affluence Quintile"
la var hh_mainincome  "xh5: Primary HH Income Source "

save "dtas/hhfinal.dta", replace

************************************************************
** 2.D INDEPENDENT VARIABLES : Gender Relations Variables
************************************************************
clear

use M* GR* EW3 FH1 FH2 ID* STATEID DISTNAME REGION SWEIGHT urban ///
	using "dtas/hhfinal.dta"

*************************************************************
** 2.D.1 INDEPENDENT VARIABLES : DOMESTIC VIOLENCE
*************************************************************

** xidv1 : BEATINGS COMMON FOR LEAVING W/OUT PERMISSION
** xidv2 : BEATINGS COMMON FOR NOT HAVING ENOUGH DOWRY
** xidv3 : BEATINGS COMMON FOR NEGLECTING HOUSE
** xidv4 : BEATINGS COMMON FOR BAD COOKING
** xidv5 : BEATINGS COMMON FOR EXTRAMARITAL RELATIONS

local c1 "leaving"
local l1 "dv1: Leaving, no permit" 
local c2 "dowry"
local l2 "dv2: Too Little Dowry"
local c3 "neglect"
local l3 "dv3: Neglecting the House"
local c4 "cooking"
local l4 "dv4: Bad Cooking"
local c5 "affair"
local l5 "dv5: Male Relations"

forv Z = 1/4 {
    recode GR2`Z' (-1 =.)(-2 =.)(-3 =.), gen(iDV`Z'`c`Z'')
    la var iDV`Z' `"xi`l`Z'' "'
}

gen iDVcomp = iDV1 + iDV2 +iDV3 + iDV4
recode iDVcomp (1/4=1)
   
*************************************************************
** 2.D.2 INDEPENDENT VARIABLES : DOWRY
*************************************************************
   
local A "gold"
local B "silver"
local C "land"
local D "car"
local E "scooter or motorcycle"
local F "TV"
local G "fridge"
local H "furniture"
local I "pressure cooker"
local J "utensils"
local K "mixer or grinder"
local L "bedding or mattress"
local M "watch"
local N "bicycle"
local O "sewing machine"
local P "livestock"
local Q "tractor"
local R "cash"

local MP5let " A B C D E F G H I J K L M N O P Q R "
foreach Z in `MP5let' {
    recode MP5`Z' (-3/-1 =.)(1/2=1), gen(iMP5`Z')
    la var iMP5`Z' "xi: Dowry - ``Z''"
}

************************************************************
** 2.D.3 INEPENDENT VARIABLES : INDEPENDENCE VARIABLES
************************************************************

local agency1 = "GR1A GR2A GR3A GR4A GR5A GR11A GR12A GR9 GR6F " + ///
	"GR7F GR8F GR6A GR7A GR8A GR18* GR19"
local agency2 "GR20"
local agency3 "iGR9 iGR6A iGR7A iGR8A"

recode `agency1' (-6/-1=.)(9=.)(1/3 = 1) (4/6 = 0), pre(i)
recode `agency2' (-6/-1=.)(9 = 0), pre(i)
recode `agency3' (0 = 1) (1 = 0) 

recode MH5A (1/2=1)(3/4=0)(-6/-1=.),gen(choice)
replace choice = 1 if MH5B == 1
la var choice "xm1: Marriage Choice"

recode MH2A MH19A (-6/-1=.) (88=.) (99=.) (291=.), gen(gaunaage gaunaage2)
replace gaunaage = MH19A if gaunaage2 < gaunaage
la var gaunaage "xm2: Gauna Age"

recode FH1 (-1=.), gen(sonsathome)
recode FH2 (-1=.), gen(dtrsathome)
gen childrenathome = sonsathome + dtrsathome
la var childrenathome "xm3: Children at Home"

recode MH3 (-6/-1 = .)(0/1=0)(2=1) (3/5=0), gen(widow)
la var widow "xm4: Widow"

recode GR9 (-6/-1=.) (3 = .),gen(purdah)
la var purdah "xm5: Purdah"

gen EWPERSON = EW3
save "dtas/igrfinal.dta", replace

**************************************************************
** 2.E REGIONAL PCA VARIABLES
**************************************************************
clear

global vlg  "IDPSU"
global dst  "DISTNAME"
global sta  "STATEID"
global reg  "REGION"
global lvls "vlg dst sta reg"

local DVn "2"
local DVl "Dom. Violence"
local DVc "dv"
local GRn "5"
local GRl "Gender Relations"
local GRc "gr"
local MPn "3"
local MPl "Dowry"
local MPc "d"
   

foreach X in $lvls {
  foreach Y in DV GR MP {
    use SWEIGHT i`Y'* $`X' urban using "dtas/igrfinal.dta", clear
    save  "dtas/`X'`Y'.dta", replace 
    collapse  (mean) i`Y'* (median) urban [pw=SWEIGHT], by($`X')
    quietly pca i`Y'*
    quietly predict `X'`Y'pca1-`X'`Y'pca``Y'n', score
    forv Z =1/``Y'n' {
      la var `X'~a`Z' "x`X'``Y'c': ``Y'l' Score (`X')"
    }
    if "`Y'" == "DV" & ("`X'" == "dst" | "`X'" == "vlg") {
      foreach Z in 5 25 100 {
        egen `X'DVcompall`Z' = cut(iDVcomp), group(`Z')
        egen `X'DVcompurban`Z' = cut(iDVcomp) if urban == 1, group(`Z')
        egen `X'DVcomprural`Z' = cut(iDVcomp) if urban == 0, group(`Z')
      }
    }
    save  "dtas/`X'`Y'.dta", replace
  }
}

use "dtas/igrfinal.dta"
   
foreach X in $lvls {
  foreach Y in DV GR MP {
    merge m:1 $`X' using "dtas/`X'`Y'.dta", nogen
  }
}

save "dtas/rgrfinal.dta", replace

*****************************************************************
** MERGE DATA
*****************************************************************

use "dtas/individualfinal.dta", clear
merge m:1 IDHH using "dtas/hhfinal.dta", nogen
merge 1:1 IDHH EWPERSON using "dtas/igrfinal.dta", nogen
merge m:1 IDHH using "dtas/rgrfinal.dta", nogen

** Eligible Women
   gen EW = 0
   replace EW = 1 if (EW3 == PERSONID)
   la var EW   "Eligible Women"

local c5 "affair"
local l5 "dv5: Male Relations"
recode GR25 (-1 =.)(-2 =.)(-3 =.), gen(iDV5`c5')
la var iDV5 `"xi`l5' "'


svyset IDPSU [pw = SW]
keep if EW
keep REGION* hh_rel* *hh_cas* *urban* hh_* SP_* cut* i* female nunder5 ///
choice gaunaage gaunaage2 sonsathome dtrsathome childrenathome widow purdah ///
vlg* dst* sta* reg* EW* WK* edu_* work_* *ID* DIST* SWEIGHT METRO6 INC* POOR*  ///
age* *cut* ta* PCPL COPC GROUPS8  NPERSONS NCHILDREN NTEENS NADULTS NMARRIEDF NMARRIEDM ///


save "dtas/combined.dta", replace
