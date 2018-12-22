********************************************************************************
* Recode of IHDS Data to make it comparable with NFHS data. 
********************************************************************************

use "hh.dta", clear 
keep GR* ID9 STATEID

quietly {
** Urban/Rural
	recode ID9 (1 = 0) (2/3 = 1), gen(urban)
	label define urban 0 "Rural" 1 "Urban" 
	label value urban urban

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
local c5 "affair"
local l5 "dv5: Male Relations"


/* Isolate dv perception variables, convert missing values & label */
  forv Z = 1/5 {
		recode GR2`Z' (-1 =.)(-2 =.)(-3 =.), gen(iDV`Z'`c`Z'') 
		label variable iDV`Z' `"xi`l`Z'' "'
	}
			
	gen iDVcomp = iDV1 + iDV2 + iDV3 + iDV4
	recode iDVcomp  (1/4 = 1)
			
drop GR* 

save "justdv.dta", replace

merge m:1 STATEID using "IHDSStates.dta", nogen
merge m:1 code using "NFHS_census_IHDS.dta", nogen
label value code state

/* Create weights by state and urbanity */
foreach V of varlist iDV* {
	gen `V'_u = .
	replace `V'_u = `V' if urban == 1				 	   		/* Only urban answers */
	gen `V'_r = .
	replace `V'_r = `V' if urban == 0						   	/* Only rural answers */
	
	bysort code: egen tcount_`V' = count(`V')	     
	gen wf_`V' = floor(women/tcount_`V')
	
	bysort code: egen ucount_`V' = count(`V'_u)
	gen wf_`V'_u = floor(urbanwomen/ucount_`V')
	
	bysort code: egen rcount_`V' = count(`V'_r)
	gen wf_`V'_r = floor(ruralwomen/rcount_`V')
	
	gen wf_`V'_ur = .
	replace wf_`V'_ur = wf_`V'_r if urban == 0
	replace wf_`V'_ur = wf_`V'_u if urban == 1
	
	gen state`V' = .
	
/* For each state, append state variable to include the mean*/	
	forv X = 1/39 { 
		su `V' [fw = wf_`V'_ur] if code == `X'
		replace state`V' = r(mean) if code == `X'
	}

	egen stateu`V' = mean(`V'_u) , by(code)
	egen stater`V' = mean(`V'_r) , by(code)
	
}
	
collapse (mean) stateiDV* stateuiDV* stateriDV* *count* , by(code)
  forv Z = 1/5 {
			label variable stateiDV`Z' `"Total `l`Z'' "'
			label variable stateuiDV`Z' `"Urban `l`Z'' "'
			label variable stateriDV`Z' `"Rural `l`Z'' "'
			}
}
save "IHDSdv.dta", replace
