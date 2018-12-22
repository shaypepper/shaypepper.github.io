/* Work Map for Combined Data */
// cd "/Users/shaypepper/Documents/2018-fall-ccny/econometrics/data/IHDS-II/"
cd "/Users/shaypepper/Documents/2018-fall-ccny/econometrics/data/IHDS-I/"
use dtas/combined.dta, clear

// keep WTEW ///
keep female EW SW nunder5 ///
	WK* age *DV* urban edu_levels ///
	hh_caste hh_religion hh_aff1 purdah REGION

egen hh_affcut = cut(hh_aff1) if urban, group(15)
egen hh_affcut2 = cut(hh_aff1) if !urban, group(15) 
replace hh_affcut = hh_affcut2 if !urban
egen hh_affcut1 = cut(hh_aff1), group(15)


keep if age > 14 & age < 50
recode age (15/19=0) (20/24=1) (25/29=2) (30/34=3) ///
		(35/39=4) (40/44=5) (45/49=6)
		
expand 2, gen(urt)
replace urt = urban + 1 if urt == 1
drop urban
gen vlgDV = vlgDVcompall25 if urt == 0
replace vlgDV = vlgDVcompurban25 if urt == 2
replace vlgDV = vlgDVcomprural25 if urt == 1

replace hh_affcut = hh_affcut1 if urt ==0

egen WKWAGE = anymatch(WKAG WKNONAG), v(1) 
egen WKOUTSIDE = anymatch(WKAG WKNONAG WKSALARY), v(1) 

// keep WTEW ///
keep nunder5 SW /// 
	WK* iDV* purdah REGION ///
	hh_caste hh_religion hh_affcut vlgDV edu_levels age urt

rename WK* wk#, renumber(0)
rename (iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp purdah REGION hh_caste hh_religion) ///
			 (d1V d2V d3V d4V d5V dV pd rg ca rl)

rename nunder5 ch 
	
rename (hh_affcut vlgDV edu_levels) (aff vdv edu)

save "dtas/worklines.dta", replace

foreach X in aff vdv edu age {
	preserve
	
local lch "Children under 5?"
local ld1V "Beating for leaving?"
local ld2V "Beating for dowry?"
local ld3V "Beating for neglect?"
local ld4V "Beating for bad cooking?"
local ld5V "Beating for affair?"
local ldV "Beating for any of these?"
local lpd "Practices Purdah?"

local vlist "ch d1V d2V d3V d4V d5V dV pd"

local ch0 "No"
local ch1 "Yes"

local pd0 "No"
local pd1 "Yes"

foreach Y in d1V d2V d3V d4V d5V dV {
	local `Y'0 "Not common"
	local `Y'1 "Common"
}		
	
	foreach Y of varlist d1V d2V d3V d4V d5V dV pd {
		levelsof `Y', local(z)
		forv WK = 0/8 {
			label var wk`WK' "All"
			foreach Z in `z' {
				gen wk`WK'`Y'`Z' = wk`WK' if `Y' == `Z'
				la var wk`WK'`Y'`Z' `"`l`Y'' ``Y'`Z'' "'
			}
		}
	}
	foreach Y of varlist rg ca rl {
		levelsof `Y', local(z)
		forv WK = 0/8 {
			label var wk`WK' "All"
			foreach Z in `z' {
				gen wk`WK'`Y'`Z' = wk`WK' if `Y' == `Z'
				local Q: label (`Y') `Z'
				la var wk`WK'`Y'`Z'  `" `Q' "'
			}
		}
	}

foreach v of varlist * {
		local label`v' : variable label `v'
	}
	
	order _all, alphabetic
	order `X' urt, first 
	
	collapse (mean) wk* [pw=SW], by(`X' urt) 
// 	collapse (mean) wk* [pw=WTEW], by(`X' urt) 

	foreach v of var * {
		label var `v' "`label`v''"
	}	

	drop if `X' == .
	forv WK = 0/8 {		
		export excel `X' urt wk`WK'* using "WKLines.xlsx", ///
			sheet(`"`X'_`WK'"') sheetreplace first(varl)
  }
	restore
}
