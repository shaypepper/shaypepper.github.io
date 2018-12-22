********************************************************************************
** REGRESSIONS: LIKELIHOOD OF WOMEN TO WORK
********************************************************************************
cd "/Users/name/Dropbox/ShayProject/TeX Files/"

	local xi "age age_sq ib(freq).edu_levels"
	local xh "ib(freq).Religion ib(freq).Caste urban hh_aff* ib(freq).hh_mainincome"
	local xv "vlgDVpca* vlgGRpc*"
	local xm "choice gaunaage childrenathome widow purdah"	
	
	local dv1    "WKANY       WKFARM  WKANIMAL   WKAG"
	local lbl1 `""Any Work"  "Farm"  "Animal"   "Wage - Ag""'
	
	local dv2    "WKANY      WKNON          WKSAL    WKBU"
	local lbl2 `""Any Work" "Wage - Nonag" "Salary" "HH Bus.""'

	forv Z = 1/2 {
		eststo clear
		foreach x of varlist `dv`Z'' {
			eststo: quietly: svy, subpop(EW): logit `x' `xi' `xh' `xv' `xm'
						estat gof
						estadd scalar rgof = r(p)
		}
	
		esttab using "Regress`Z'A.tex", replace ///
		scalars("rgof Goodness of Fit") ///
		b(%-12.3f) sfmt(%-12.3f) alignment(D{.}{.}{-1}) booktabs not label eform ///
		title(Women's Labor Force Participation) nonumbers mtitles (`lbl`Z'')
	} 


********************************************************************************
** REGRESSIONS: LIKELIHOOD OF WOMEN TO WORK OUTSIDE THE HOME
********************************************************************************
capture log close
log using "OutsideWork.log"

	local xi "age age_sq ib(freq).edu_levels"
	local xd "ib(freq).Religion ib(freq).Caste  urban"
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
		esttab using "Regress2C`U'.tex", replace ///
		star(+ 0.1 * 0.05 ** 0.01 *** 0.001) pr2 ///
		b(%-12.3f) sfmt(%-12.3f) alignment(D{.}{.}{-1}) booktabs not label ///
		title(Women's Labor Force Participation, `urban`U'') nonumbers mtitles (`lbl1')
		}


			eststo clear
			foreach x of varlist `dv1' {
			eststo: probit `x' `xi' `xd' `xh' `xv' `xm' if EW == 1 [pw=SW], nolog
		}
		
		esttab using "Regress2C2.tex", replace ///
		star(+ 0.1 * 0.05 ** 0.01 *** 0.001) pr2 ///
		b(%-12.3f) sfmt(%-12.3f) alignment(D{.}{.}{-1}) booktabs not label ///
		title(Women's Labor Force Participation, both rural and urban) nonumbers mtitles (`lbl1')
	
capture log close
