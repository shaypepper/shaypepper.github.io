********************************************************************************
** REGRESSIONS: LIKELIHOOD OF WOMEN TO WORK
********************************************************************************
cd "/Users/shaypepper/Dropbox/shay/Regressions/"
use /Users/shaypepper/Dropbox/dtas/combined.dta, clear

// if you don't have eststo
// ssc install estout

keep if EW == 1
	
local xi "age age_sq ib(freq).edu_levels hh_aff*"
local xh "ib(freq).hh_religion ib(freq).hh_caste "
local xm "childrenathome"	


eststo clear
foreach urt in "if urban == 1" "if urban == 0" "" {
	eststo: quietly: svy, subpop(EW): probit work_outside `xi' `xh' `xm' `urt'
}
	
esttab using "RegressWork.html", replace  ///
not cells(b(fmt(3)) _star) label  ///
title(Women's Labor Force Participation) nonumbers mtitles ("Urban" "Rural" "All") 



	





/*
quietly {
	local xi "age age_sq ib(freq).edu_levels"
	local xh "ib(freq).hh_religion ib(freq).hh_caste urban hh_aff* ib(freq).hh_mainincome"
	local xv "vlgDVpca* vlgGRpc*"
	local xm "choice gaunaage childrenathome widow purdah"	
	
	local dv1    "WKANY       WKFARM  WKANIMAL   WKAG"
	local lbl1 `""Any Work"  "Farm"  "Animal"   "Wage - Ag""'
	
	local dv2    "WKANY      WKNON          WKSAL    WKBU"
	local lbl2 `""Any Work" "Wage - Nonag" "Salary" "HH Bus.""'

	forv Z = 1/2 {
		eststo clear
		foreach x of varlist `dv`Z'' {
			eststo: quietly: svy, subpop(EW): probit `x' `xi' `xh' `xv' `xm'
		}
	
		esttab using "Regress`Z'A.html", replace  ///
		not cells(b(fmt(3)) _star) label  ///
		title(Women's Labor Force Participation) nonumbers mtitles (`lbl`Z'')
	} 

}
*/

/*
********************************************************************************
** REGRESSIONS: LIKELIHOOD OF WOMEN TO WORK OUTSIDE THE HOME
********************************************************************************
capture log close

	local xi "age age_sq ib(freq).edu_levels"
	local xd "ib(freq).hh_religion ib(freq).hh_caste  urban"
	local xh "hh_aff1"
	local xv "vlgDVpca1"
	local xm "childrenathome purdah"

	local dv1     "work_outside   WKAG        WKNONAG        WKSAL"
	local lbl1 `" "Work Outside" "Wage - Ag" "Wage - Nonag" "Salary" "'
	local urban0 "Rural"
	local urban1 "Urban"


	forv U = 0/1 {
		eststo clear
		foreach x of varlist `dv1' {
				eststo: probit `x' `xi' `xd' `xh' `xv' `xm' if EW == 1 & urban == `U' [pw=SW], nolog
		}
		** Urban = `U', ever-married women. 
		esttab using "Regress2C`U'.html", replace ///
		star(+ 0.1 * 0.05 ** 0.01 *** 0.001) pr2 ///
		b(%-12.3f) sfmt(%-12.3f) alignment(D{.}{.}{-1}) not label ///
		title(Women's Labor Force Participation, `urban`U'') nonumbers mtitles (`lbl1')
	}


			eststo clear
			foreach x of varlist `dv1' {
				eststo: probit `x' `xi' `xd' `xh' `xv' `xm' if EW == 1 [pw=SW], nolog
			}
		
		esttab using "Regress2C2.html", replace ///
		star(+ 0.1 * 0.05 ** 0.01 *** 0.001) pr2 ///
		b(%-12.3f) sfmt(%-12.3f)  not label ///
		title(Women's Labor Force Participation, both rural and urban) nonumbers mtitles (`lbl1')

*/

