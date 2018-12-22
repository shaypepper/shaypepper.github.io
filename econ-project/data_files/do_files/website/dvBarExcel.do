cd /Users/shaypepper/Dropbox/
use dtas/combined.dta, clear

keep if EW
keep iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp urban SW REGION ID14 hh_caste hh_aff1
recode ID14 (-7/-1 = .)
egen affcutA = cut(hh_aff1), group(5)
egen affcutU = cut(hh_aff1) if urban, group(5)
egen affcutR = cut(hh_aff1) if !urban , group(5)
expand 2, gen(urt)
replace urt = urban + 1 if urt
gen aff = affcutA if urt == 0
replace aff = affcutR if urt == 1
replace aff = affcutU if urt == 2
rename (REGION ID14 hh_caste) ///
			 (reg rel cst)

foreach X of varlist reg rel cst aff {
	preserve
	keep iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp urt SW `X'

	foreach v of varlist * {
		local label`v' : variable label `v'
	}
	collapse (mean) iDV*  [pw=SW], by(`X' urt)
	foreach v of var * {
		label var `v' "`label`v''"
	}	
	export excel using "DVbar", sheet(`"`X'"') sheetreplace first(varl)
	restore
}
