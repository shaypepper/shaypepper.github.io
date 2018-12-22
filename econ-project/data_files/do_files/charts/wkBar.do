cd /Users/shaypepper/Dropbox/
use dtas/combined.dta, clear

keep if age > 14 & age < 50 & EW
keep WK* urban SW REGION ID14 hh_caste hh_aff1 age  vlgDV*
recode ID14 (-7/-1 = .)
egen WKWAGE = anymatch(WKAG WKNONAG), v(1) 
egen WKOUTSIDE = anymatch(WKAG WKNONAG WKSALARY), v(1) 
tempvar wk1
gen `wk1' = 0
replace `wk1' = 1 if (WKNON & WKAG) | (WKSA & WKAG) | (WKNON & WKSA)
su `wk1'
gen WKOS = 0
replace WKOS = 1 if WKAG
replace WKOS = 2 if WKNON 
replace WKOS = 3 if WKSAL
replace WKOS = 4 if `wk1'
tab WKOS, gen(outsidework)

label variable outsidework1 "No Outside Work"
label variable outsidework2 "Agricultural Wage Work"
label variable outsidework3 "Other Wage Work"
label variable outsidework4 "Salary Work"
label variable outsidework5 "Two or more type of work"

egen hh_affcut = cut(hh_aff1) if urban, group(10)
egen hh_affcut2 = cut(hh_aff1) if !urban, group(10) 
replace hh_affcut = hh_affcut2 if !urban
egen hh_affcut1 = cut(hh_aff1), group(10)


recode age (15/19=0 "Ages 15-19") ///
					 (20/24=1 "Ages 20-24") ///
					 (25/29=2 "Ages 25-29") ///
					 (30/34=3 "Ages 30-34") ///
					 (35/39=4 "Ages 35-39") ///
					 (40/44=5 "Ages 40-44") ///
					 (45/49=6 "Ages 44-49"), generate(AGE)
		
expand 2, gen(urt)
replace urt = urban + 1 if urt == 1
drop urban
gen vlgDV = vlgDVcompall5 if urt == 0
replace vlgDV = vlgDVcompurban5 if urt == 2
replace vlgDV = vlgDVcomprural5 if urt == 1

replace hh_affcut = hh_affcut1 if urt == 0

rename (REGION ID14 hh_caste hh_affcut vlgDV) ///
			 (rgn rel cst aff vdv)

foreach X in rgn rel cst aff vdv AGE {
	preserve
	
	keep outsidework* urt SW `X' 

	foreach v of varlist * {
		local label`v' : variable label `v'
	}
	
	collapse (mean) out* [pw=SW], by(`X' urt)
	foreach v of var * {
		label var `v' "`label`v''"	
	}	
	drop if `X' == .
	export excel using "shay/Maps/WKBar", sheet(`"`X'"') sheetreplace first(varl)
	restore
}
