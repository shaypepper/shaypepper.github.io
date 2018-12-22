********************************************************************************
* NFHS Summary Statistics
********************************************************************************

capture log close
cd "/Users/shaypepper/Dropbox/dtas/"
clear

********************************************************************************
* Statistics
********************************************************************************

// Import Couples Data, just women's info and domestic violence info
use v* d* mv* caseid s46 spsu  ///
	using "/Users/shaypepper/Dropbox/dtas/IACR52FL.dta", clear // draw from couples data

save "NFHSsummary.dta", replace

*---------------------------*
* Household level variables *
*---------------------------*
rename v025 urban // 1: urban, 2: rural
label define urban 1 "Urban" 2 "Rural"
label value urban urban 

rename v190 affcut // 1: poorest, 5: richest
label define affcut 1 "Poorest" 2 "Poorer" 3 "Middle" ///
		4 "Richer" 5 "Richest"
label value affcut affcut

recode v130 ///
	(1 = 1 "Hindu") /// code test
	(2 = 2 "Muslim") /// 
	(3 = 3 "Christian") /// 
 	(else = 4 "Other"), gen(religion)  label(religion)
	// 4: sikh, 5: buddhist, 6: jain, 7: jewish, 8: parsi/zoroastrian,
	// 9: none, 10: donyi polo, 96: other

recode v024 ///
	(1 2 3 22 5 6 7 9 = 1 "Northern") /// 
		/// Jammu & Kashmir 1, Himachal Pradesh 2, Punjab 3, Chandigarh 22, 
		/// Uttaranchal 5, Haryana 6, Delhi 7, Uttar Pradesh 9
  (11 12 17 18 = 2 "Northeastern")              ///
		/// Sikkim 11, Arunachal Pradesh 12, Meghalaya 17, Assam 18
  (10 13 14 15 16 19 20 21 = 3 "Eastern")       ///
		/// Bihar 10, Nagaland 13, Manipur 14, Mizoram 15, Tripura 16
		/// West Bengal 19, Jharkhand 20, Orissa 21
  (8 24 27 30 = 4 "Western")              ///
		/// Rajasthan 8, Gujarat 24, Daman & diu --, Dadra+Nagar Haveli --
		/// Maharashtra 27, Goa 30
  (28 29 32 33 = 5 "Southern")            ///
		/// Andhra Pradesh 28, Karnataka 29, Lakshadweep --, Kerala 32
		/// Tamil Nadu 33, Pondicherry --
  (22 23 = 6 "Central")                        ///
		/// Chattishgarh 22, Madhya Pradesh 23
	(else = 99 "Check it out!"), ///
  gen(region) label(region)

rename v024 state

	
label variable urban 		"Urban or Rural"
label variable religion "Religion"
label variable region 	"Region"
label variable state 		"State"

*-----------------------------*
* Survey Sampling Information *
*-----------------------------*
rename v002 house
rename spsu psu

*----------------------------*
* Individual Women Variables *
*----------------------------*

rename v106 edu_level
label define edu_level 0 "None" 1 "Primary" 2 "Secondary" 3 "Higher"
label values edu_level edu_level
recode edu_level (9 = .)

recode v155 (0 = 0 "Cannot Read") (1/2 = 1 "Can read") (3/9 = .), gen(edu_literacy)
	// 0: Cannot, 1: Parts of Sentence, 2: Whole Sentence, 
	// 3: no card w/ language, 4: blind/visually impaired
	
rename v012 age
gen age_squared = age^2

label variable edu_level 			"Highest Education Level"
label variable age 			 			"Age"
label variable age_squared 		"Age squared"


*----------------------------*
* Individual Men Variables *
*----------------------------*

rename mv106 medu_level
label copy edu_level medu_level
label values medu_level medu_level
codebook medu_level
	// 0: none, 1: primary, 2: secondary, 3: higher
recode medu_level (9 = .)

recode mv155 (0 = 0 "Cannot Read") (1/2 = 1 "Can read") (3/9 = .), gen(medu_literacy)
	// 0: Cannot, 1: Parts of Sentence, 2: Whole Sentence, 
	// 3: no card w/ language, 4: blind/visually impaired
	
rename mv012 mage
gen mage_squared = age^2

label variable medu_level 			"Highest Education Level"
label variable mage 			 			"Age"
label variable mage_squared 		"Age squared"


*-----------------------------*
* Domestic Violence Variables *
*-----------------------------*

*-- Get rid of of missing values --*
foreach V of varlist d104 d106 d107 d108 v744* mv744* {
	recode `V' (8 = 0) (9 = .) 			
}

*-- Reported abuse variables based on v103, v105 --*
gen dv_any = d106+d107+d108
recode dv_any (1/3 = 1)	

gen dv_ns = d106+d107
recode dv_ns (1/2 = 1)	

rename d104 dv_emotional
rename d106 dv_ls
rename d107 dv_severe
rename d108 dv_sex


*-- Domestic Violence Attitudes  --*
*-- (Is a man justified in beating his wife for...) --*

*-- Women --*

gen v744x = .
replace v744x = 0 if v744a==0 & v744b==0 & v744c==0 & v744d==0 & v744e==0
replace v744x = 1 if v744a==1 | v744b==1 | v744c==1 | v744d==1 | v744e==1
				
rename v744a dva1_leaving // Leaving without permission
rename v744c dva2_arguing // Arguing w/ husband
rename v744b dva3_neglect // Neglecting the children
rename v744e dva4_cooking // Burning the food
rename v744d dva5_nosex   // Refusing to have sex
rename v744x dvacomp      // Any reason listed above


*-- Men --* 

gen mv744x = .
replace mv744x = 0 if mv744a==0 & mv744b==0 & mv744c==0 & mv744d==0 & mv744e==0
replace mv744x = 1 if mv744a==1 | mv744b==1 | mv744c==1 | mv744d==1 | mv744e==1
				
rename mv744a mdva1_leaving // Leaving without permission
rename mv744c mdva2_arguing // Arguing w/ husband
rename mv744b mdva3_neglect // Neglecting the children
rename mv744e mdva4_cooking // Burning the food
rename mv744d mdva5_nosex   // Refusing to have sex
rename mv744x mdvacomp      // Any reason listed above

save "NFHSsummary.dta", replace

*---------------------------*
* Caste Information         *
*---------------------------*
use "castetribe.dta", clear
keep if ctind == . // only keep household information
rename (ct*) (*)
do "/Users/shaypepper/Dropbox/shay/do/data/brahmin.do"
	
save "hhcaste.dta", replace

use "NFHSSummary.dta", clear
merge m:1 state psu house using "hhcaste.dta"
drop if _merge == 2

rename s46 caste
label copy s46 caste
label values caste caste
recode caste (4 = 5) (8/9 = .) // other
replace caste = 4 if brahmin == 1
label define caste 1 "SC" 2 "ST" 3 "OBC" 4 "Brahmin" 5 "Other", modify

save "NFHSsummary.dta", replace

