cd "/Users/name/Dropbox/ShayProject/Regressions/"
/*
quietly {
foreach WK of varlist WK* {
	forv X = 0/9 {
		eststo clear
		foreach eq in `"=="' `"<"' `"<="' {
			eststo: estpost prtest `WK' ///
  				if EW == 1 & urban `eq' 1 & affcut10 == `X', by(iDVcomp)
		}
  	if `X' == 0 {
			estout using "prtest`WK'.xls", replace ///
				label varl(99) cells("P_1(f(3)) P_2(f(3)) N_1 N_2 b(f(3)) p(f(3))") ///
				mgroups("Urban" "Rural" "Total", pattern(1 1 1))
		}
  	else {				
			estout using "prtest`WK'.xls", append ///
				label varl(99) cells("P_1(f(3)) P_2(f(3)) N_1 N_2 b(f(3)) p(f(3))") ///
				mlabels(none)	collabel(none)
		}
	}
}
}
*/
/*
preserve
drop affcut*
egen affcut10=cut(hh_aff1) if EW == 1, group(10)
collapse (mean) WK* if (EW == 1) [pw=SW], by(iDVcomp affcut10 urban)
gen rural = urban*(-1) + 1
	foreach WK of varlist WK* {
		foreach eq in urban rural {
		twoway line `WK' affcut10 if iDVcomp == 1 & `eq' || ///
			line `WK' affcut10 if iDVcomp==0 & `eq' , ///
			scheme(shayeco)  ///
			legend(label(1 "Said beatings common" "for at least one trigger") ///
			label(2 "Did not say beatings were common")) ///
			xtitle("Affluence percentile", c(coffee)) ///
			ytitle(Percent of women working) ///
			title("Type of work: `WK', `eq'",c(dv5))
		graph export DV`WK'`eq'.png, replace
		}
	}
restore
*/	

/*
drop affcut*
egen affcut10=cut(hh_aff1) if EW == 1, group(10)

		foreach WK of varlist WK* {
		foreach eq in urban rural {
		preserve
		collapse (mean) iDV* if (EW == 1) [pw=SW], by(`WK' affcut10 urban)
		gen rural = urban*(-1) + 1
		twoway line iDVcomp affcut10 if `WK' == 1 & `eq' || ///
			line iDVcomp affcut10 if `WK'==0 & `eq' , ///
			scheme(shayeco)  ///
			legend(label(1 "`WK'") ///
			label(2 "Not working")) ///
			xtitle("Affluence percentile", c(coffee)) ///
			ytitle(Percent of women working) ///
			title("Perceived abuse, `eq'" , c(dv5))
		graph export `WK'DV`eq'.png, replace
		restore
		}
	}
*/

/*		
tempvar EWcount rural urban all DVcompurban DVcomprural DVcompall affcut3
tempfile dvaffurban dvaffrural dvaffall set3
egen `EWcount' = count(EW), by(IDPSU)
gen `rural' = urban*(-1) + 1
gen `urban' = urban
gen `all' = 1
drop WKWAGE
gen WKWAGE = WKAG + WKSAL 
recode WKWAGE (1/2 = 1)
foreach ur in urban rural all {
	preserve
		keep if EW & EWcount > 10 & ``ur''
		collapse (mean) vlgDVcomp=iDVcomp hh_aff1 [pw=SW], by(IDPSU)
		egen `DVcomp`ur'' = cut(vlgDVcomp), group(10)
		egen `affcut3'=cut(hh_aff1), group(3)
		save `dvaff`ur''
	restore
	preserve
		keep if EW & EWcount > 10 & ``ur''
		merge m:1 IDPSU using `dvaff`ur'', nogen
		collapse (mean) `ur'WKSALARY = WKSALARY ///
										`ur'WKNONAG  = WKNONAG  ///
										`ur'WKAGWAGE  = WKAGWAGE  ///
										`ur'WKWAGE = WKWAGE ///
		[pw=SW], by(`DVcomp`ur'' `affcut3')
		save `set3', replace
	restore
	preserve
		keep if EW & EWcount > 10 & ``ur''
		merge m:1 IDPSU using `dvaff`ur'' , nogen
		collapse (mean) WKSAL WKNON WKAG WKWAGE [pw=SW], by(`DVcomp`ur'')
		merge 1:m `DVcomp`ur'' using `set3' , nogen
		rename `ur'* *1
		rename WK* *
		rename SA* NO* AG* WA*, p
	foreach WK of varlist Salary Wage {
	twoway  line `WK'1 `DVcomp`ur'' if `affcut3'  == 0 , sort || ///
					line `WK'1 `DVcomp`ur'' if `affcut3'  == 1 , sort || ///
					line `WK'1 `DVcomp`ur'' if `affcut3'  == 2 , sort || ///
					line `WK' `DVcomp`ur'' , sort , ///
 			scheme(shayeco) ///
			legend(label(1 "Lowest Aff")  ///
						 label(2 "Middle")  ///
						 label(3 "Highest Aff")  ///
						 label(4 "All"))  ///
			xtitle("Village DV score", c(coffee)) ///
			ytitle(% Women working -`WK') ///
			title("Perceived abuse in `ur' areas" , c(dv5))
		graph export `WK'DV`ur'10.png, replace
		}
	restore
		}
*/


	
tempvar EWcount rural urban all DVcompurban DVcomprural DVcompall affcut3
tempfile dvaffurban dvaffrural dvaffall set3
egen `EWcount' = count(EW), by(IDPSU)
gen `rural' = urban*(-1) + 1
gen `urban' = urban
gen `all' = 1
drop WKWAGE
gen WKWAGE = WKAG + WKSAL 
recode WKWAGE (1/2 = 1)
foreach ur in urban rural all {
	preserve
		keep if EW & EWcount > 10 & ``ur''
		collapse (mean) vlgDVcomp=iDVcomp hh_aff1 , by(IDPSU)
		egen `DVcomp`ur'' = cut(vlgDVcomp), group(10)
		save `dvaff`ur''
	restore
	preserve
		keep if EW & EWcount > 10 & ``ur''
		merge m:1 IDPSU using `dvaff`ur'', nogen
		collapse (mean) `ur'WKSALARY = WKSALARY ///
										`ur'WKNONAG  = WKNONAG  ///
										`ur'WKAGWAGE  = WKAGWAGE  ///
										`ur'WKWAGE = WKWAGE ///
		[pw=SW], by(`DVcomp`ur'' iDVcomp)
		save `set3', replace
	restore
	preserve
		keep if EW & EWcount > 10 & ``ur''
		merge m:1 IDPSU using `dvaff`ur'' , nogen
		collapse (mean) WKSAL WKNON WKAG WKWAGE , by(`DVcomp`ur'')
		merge 1:m `DVcomp`ur'' using `set3' , nogen
		rename `ur'* *1
		rename WK* *
		rename SA* NO* AG* WA*, p
	foreach WK of varlist Salary Wage {
	twoway  line `WK'1 `DVcomp`ur'' if iDVcomp  == 1 , sort || ///
					line `WK'1 `DVcomp`ur'' if iDVcomp  == 0 , sort || ///
					line `WK' `DVcomp`ur'' , sort , ///
 			scheme(shayeco) ///
			legend(label(1 "Said common")  ///
						 label(2 "Did not say common")  ///
						 label(3 "All"))  ///
			xtitle("Village DV score", c(coffee)) ///
			ytitle(% Women working -`WK') ///
			title("Perceived abuse in `ur' areas" , c(dv5))
		graph export `WK'DV`ur'10.png, replace
		}
	restore
		}

