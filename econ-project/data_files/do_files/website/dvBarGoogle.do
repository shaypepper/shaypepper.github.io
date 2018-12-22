***************************************************** 
* Domestic Violence Bar Chart   
***************************************************** 
global chartName "dvBar"


*-- Get Data --*
cd /Users/shaypepper/Dropbox/
use dtas/combined.dta, clear

keep if EW
keep iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp urban SW REGION ID14 hh_caste hh_aff1

*-- Recode Religion --*
recode ID14 (-7/-1 = .)

*-- Make an affluence variable --*
egen affcutA = cut(hh_aff1), group(5)
egen affcutU = cut(hh_aff1) if urban, group(5)
egen affcutR = cut(hh_aff1) if !urban , group(5)
expand 2, gen(urt)
replace urt = urban + 1 if urt
gen aff = cond(urt == 0, affcutA, cond(urt == 1, affcutR, cond(urt == 2, affcutU, .)))

*-- Clean up the big categories' variable names to make queries easier --*
rename (REGION ID14 hh_caste) (reg rel cst)

scalar counter = 0

*-- Make spreadsheets for each category --*
foreach X of varlist reg rel cst aff {
	preserve
	keep iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp urt SW `X'
	foreach v of varlist * {
		local label`v' :variable label `v'
	}
	
	display as text `" *********** `X' *********** "' 
	
	collapse (mean) iDV*  [pw=SW], by(`X' urt)
	foreach v of var * {
		replace `v' = round(`v', 0.001)
		label var `v' "`label`v''"
	}	
	
	order `X' urt iDV*
	drop if `X' == . | urt == .
	
	if counter == 0 {
		local xlabel: variable label `X'
		replace `X' = `: label `xlabel' `X' 
	}
	
	
	global chartNum = counter
	display as text `" *********** $chartNum *********** "' 
	do "/Users/shaypepper/Dropbox/shay/do/gcr/dataToGoogleArray.do"
	scalar counter = counter + 1
	restore
}
