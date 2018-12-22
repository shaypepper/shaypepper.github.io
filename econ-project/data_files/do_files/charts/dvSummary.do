cd /Users/name/Dropbox/shay/Paper/htmlforWP/
use /Users/name/Dropbox/dtas/combined.dta, clear

local vars "urban edu_levels hh_caste hh_religion"

egen WKWAGE = anymatch(WKAG WKNONAG), v(1) 
egen WKOUTSIDE = anymatch(WKAG WKNONAG WKSALARY), v(1) 

foreach Y in `vars' {
		foreach X in 1 2 3 4 5 comp {
			eststo iDV`X', r: estpost svy: ///
				tab `Y' iDV`X', subpop(EW) row nomarg percent
		}
	if `"`Y'"' == "urban" {
	estout iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp using summaryDV.xlsx, ///
		replace unstack label varl(200) cell(b(f(%9.1f)))
	}
	else { 
	estout iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp using summaryDV.xlsx, ///
		append unstack label varl(200) cell(b(f(%9.1f))) coll(none) ///
		mlabels(none)
	}
}


foreach Y in `vars' {
		foreach X of varlist WK* {
			eststo `X', r: estpost svy: ///
				tab `Y' `X', subpop(EW) row nomarg percent
		}
	if `"`Y'"' == "urban" {
	estout iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp using summaryWK.xlsx, ///
		replace  unstack label varl(200) cell(b(f(%9.1f)))
	}
	else { 
	estout iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp using summaryWK.xlsx, ///
		append ) unstack label varl(200) cell(b(f(%9.1f))) coll(none) ///
		mlabels(none)	
	}
}
