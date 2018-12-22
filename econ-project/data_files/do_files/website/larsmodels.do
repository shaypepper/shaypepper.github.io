/* lars with Marital History and Gender Relations */
use /Users/shaypepper/Dropbox/dtas/combined.dta, clear
capture log close

/* If you don't have lars installed:*/
// ssc install lars

local MH "MH10 MH11 MH12 MH13 MH14 MH14A MH1A MH2A MH2C MH2D MH3 MH4 MH5A MH5B MH6 MH7 MH8 MH9 MH15A MH15B MH16 MH17A MH17B MH18A MH19A MH20"

local GR "GR*" /* auto */

local MP "MP*" /* dowry */

local FH "FH*" /* fert */

local FP "FP*" /* preg */


foreach var of varlist MP5A-MP5R{
	recode `var' (-3/-1 = .) (1/2=1), gen(b`var')
	} 

log using lars.log, replace
lars work_wage age age_sq lit anycollege college_grad RelCas* aff* iDV* vDV* URBAN INCSOURCE* GR* MP* FP* if EW == 1
log close

******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, BY TYPE OF WORK
******************************************************************************************
	eststo clear
	
	local regressvars3 "age age_sq anycollege married aff* i.GROUPS8 i.hhincomesource"
	foreach x of varlist work_*{
	forv i = 0/1{
	eststo: probit `x'  vDV* `regressvars3' if Female == 1 & age > 18 & age < 61 & URBAN == `i', cluster(IDPSU)
	foreach var of varlist EW Female {
	quietly estat classification if `var' == 1 & URBAN == `i'
	quietly estadd scalar CC`var' = r(P_corr) 
	quietly estadd scalar Sens`var' = r(P_p1) 
	quietly estadd scalar Spec`var' = r(P_n0)
		}
		}
		}
esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/dvtypeofwork.csv", replace scalars("CCEW Corr. Classified Elig. Women" "SensEW Sensitivity Elig. Women" "SpecEW Specificity Elig. Women" "CCFemale Corr. Classified All Women" "SensFemale Sensitivity All Women" "SpecFemale Specificity All Women") sfmt(%-12.1f) label  compress  b(%-12.3f) title(Women's Labor Force Participation based on Type of Work) nobaselevels interaction(" X ") nonumbers
