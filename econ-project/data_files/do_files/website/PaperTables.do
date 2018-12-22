
log using "papertables.log", replace
foreach var in hh_mainincome* GROUPS8 INCOME5 URBAN edu anywork {
latabstat iDV*, statistics(mean) by(`var') format(%12.2f)
latabstat work_*, statistics(mean) by(`var') format(%12.2f)
}
log close


******************************************************************************************
** GRAPH OF DV Variables and Women's work
******************************************************************************************

graph bar (mean) fanywork (mean) iDV1_leaving (mean) iDV2_dowry (mean) 							/*
	*/ iDV3_neglect (mean) iDV4_cooking [fweight = EW] if age > 18 & age < 60, 				/*
	*/ over(URBAN) over(INCOME5) title(Domestic Violence and Work by Income Bracket)  /*
	*/ xsize(8) ysize(6)

******************************************************************************************
** Correlations
******************************************************************************************
foreach var of varlist work_* {
eststo: estpost corr `var' vDV* if EW == 1
}


******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK BY AFFLUENCE
******************************************************************************************
	foreach Z in outside home none {
	eststo clear
	
	local rv1 "i_DVpca* age age_sq edu_anycollege"
	local rv2 "choice gaunaage widow purdah childrenathome"
	local rv3 "hh_aff* hh_relcas* hh_mainincome_*"
	
	forv x = 0/4{
	forv i = 0/1{
	eststo: quietly probit work_`Z' `rv1' `rv2' `rv3' /*
					*/ if EW == 1 & age > 18 & age < 61 & URBAN == `i' & affcut == `x'
	foreach var of varlist EW {
					quietly estat classification if `var' == 1 & URBAN == `i'
					quietly estadd scalar CC`var' = r(P_corr) 
					quietly estadd scalar Sens`var' = r(P_p1) 
					quietly estadd scalar Spec`var' = r(P_n0)
		}
		}
		}
esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workandaffluence`Z'.tex", replace scalars("CCEW Corr. Classified Elig. Women" "SensEW Sensitivity Elig. Women" "SpecEW Specificity Elig. Women") sfmt(%-12.1f) pr2 booktabs label mgroups( ///
"Poorest" "2nd Poorest" "Middle" "4th" "Affluent", pattern(1 0 1 0 1 0 1 0 1 0 1 0) ///
prefix(\multicolumn{@span}{c}{) suffix(})  span erepeat(\cmidrule(lr){@span})) ///
compress not star( * 0.10  + 0.01) b(%-12.3f) title(Women's Labor Force ///
Participation based on Affluence) nobaselevels ///
interaction(" X ") nonumbers mtitles ("Rural" "Urban" "Rural" "Urban" "Rural" ///
"Urban" "Rural" "Urban" "Rural" "Urban" "Rural" "Urban" )
}
******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK BY SPECIFIC DV VARIABLE
******************************************************************************************
foreach Z in outside home none {
	eststo clear
	local rv1 "age age_sq edu_anycollege"
	local rv2 "choice gaunaage widow purdah childrenathome"
	local rv3 "hh_aff* hh_relcas* hh_mainincome_*"
	**local rv3 "Demo*"
	
	forv x = 1/5{
	forv i = 0/1{
	eststo: quietly probit work_`Z' 												/* Type of Regression
							 */ `rv1' `rv2' `rv3' vDV`x'*  								/* Ind. Variables
							 */ if EW == 1 & age > 18 & age < 61 & URBAN == `i'
	quietly estat classification if EW == 1 & URBAN == `i'
	quietly estadd scalar CCEW = r(P_corr) 
	quietly estadd scalar SensEW = r(P_p1) 
	quietly estadd scalar SpecEW = r(P_n0)
		}
		}
		
esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/dvonebyone`Z'.tex", replace scalars("CCEW Corr. Classified" "SensEW Sensitivity" "SpecEW Specificity") sfmt(%-12.1f) pr2 booktabs label mgroups("Leaving, no Permit" "Too Little Dowry" "Neglecting House" "Bad Cooking" "Male Relations", pattern(1 0 1 0 1 0 1 0 1 0) prefix(\multicolumn{@span}{c}{) suffix(})  span erepeat(\cmidrule(lr){@span})) compress not b(%-12.3f)	
	 title(Women's Labor Force Participation based on Individual Domestic Violence Triggers) nobaselevels interaction(" X ") nonumbers mtitles	/* 	
	*/ ("Rural" "Urban" "Rural" "Urban" "Rural" "Urban" "Rural" "Urban" "Rural" "Urban" )
	}
	
	
******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, AFFLUENCE AND OTHER THINGS (with PCA's)
** DV village, GR - village 
******************************************************************************************
	eststo clear
	local regressvars "*v_DVpca* URBAN age age_sq edu_anycollege choice gaunaage widow childrenathome v_GRpca* hh_pct* "

	foreach x of varlist work_home work_outside work_none {
	eststo: quietly probit `x' `regressvars' if EW == 1 & age > 18 & age < 61, cluster(IDHH)
	quietly estat classification if EW == 1
	quietly estadd scalar CC = r(P_corr) 
	quietly estadd scalar Sens = r(P_p1) 
	quietly estadd scalar Spec = r(P_n0)
		}

esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workcatpca.tex", replace scalars("CC Corr. Classified" "Sens Sensitivity" "Spec Specificity" ) sfmt(%-12.3f) booktabs compress not label  ///
b(%-12.3f) pr2 title(Women's Labor Force ///
Participation) nobaselevels ///
 nonumbers mtitles ("Wk: Home" "Wk: Outside" "Wk: None")
 
 ******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, AFFLUENCE AND OTHER THINGS (with PCA's)
** DV individual, GR - village 
******************************************************************************************
	eststo clear
	local regressvars "*i_DVpca* URBAN age age_sq edu_anycollege choice gaunaage widow childrenathome v_GRpca* hh_pct*"

	foreach x of varlist work_home work_outside work_none {
	eststo: quietly probit `x' `regressvars' if EW == 1 & age > 18 & age < 61, cluster(IDHH)
	quietly estat classification if EW == 1
	quietly estadd scalar CC = r(P_corr) 
	quietly estadd scalar Sens = r(P_p1) 
	quietly estadd scalar Spec = r(P_n0)
		}

esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workcatpca2.tex", replace scalars("CC Corr. Classified" "Sens Sensitivity" "Spec Specificity" ) sfmt(%-12.3f) booktabs compress not label  ///
b(%-12.3f) pr2 title(Women's Labor Force ///
Participation) nobaselevels ///
 nonumbers mtitles ("Wk: Home" "Wk: Outside" "Wk: None")

******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, AFFLUENCE AND OTHER THINGS (with spec. Variables)
** GR village, DV village
******************************************************************************************

	eststo clear
	local regressvars "*v_DVpca* URBAN age age_sq edu_anycollege choice gaunaage widow childrenathome v_GRpca* hh_aff* i.hh_religioncaste  hh_mainincome_*"

	foreach x of varlist work_home work_outside work_none {
	eststo: quietly probit `x' `regressvars' if EW == 1 & age > 18 & age < 61, cluster(IDHH)
	quietly estat classification if EW == 1
	quietly estadd scalar CC = r(P_corr) 
	quietly estadd scalar Sens = r(P_p1) 
	quietly estadd scalar Spec = r(P_n0)
		}

esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workcat.tex", replace scalars("CC Corr. Classified" "Sens Sensitivity" "Spec Specificity" ) sfmt(%-12.3f) booktabs compress not label  ///
b(%-12.3f) pr2 title(Women's Labor Force ///
Participation) nobaselevels ///
 nonumbers mtitles ("Wk: Home" "Wk: Outside" "Wk: None")

******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, AFFLUENCE AND OTHER THINGS (with spec. Variables)
** GR ind, DV village
******************************************************************************************

	eststo clear
	local regressvars "*v_DVpca* URBAN age age_sq edu_anycollege choice gaunaage widow childrenathome i_GRpca* hh_aff* i.hh_religioncaste  hh_mainincome_*"

	foreach x of varlist work_home work_outside work_none {
	eststo: quietly probit `x' `regressvars' if EW == 1 & age > 18 & age < 61, cluster(IDHH)
	quietly estat classification if EW == 1
	quietly estadd scalar CC = r(P_corr) 
	quietly estadd scalar Sens = r(P_p1) 
	quietly estadd scalar Spec = r(P_n0)
		}

esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workcat2.tex", replace scalars("CC Corr. Classified" "Sens Sensitivity" "Spec Specificity" ) sfmt(%-12.3f) booktabs compress not label  ///
b(%-12.3f) pr2 title(Women's Labor Force ///
Participation) nobaselevels ///
 nonumbers mtitles ("Wk: Home" "Wk: Outside" "Wk: None")

******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, AFFLUENCE AND OTHER THINGS (with spec. Variables)
** GR village, DV ind
******************************************************************************************

	eststo clear
	local regressvars "*i_DVpca* URBAN age age_sq edu_anycollege choice gaunaage widow childrenathome i_GRpca* hh_aff* i.hh_religioncaste hh_mainincome_* "

	foreach x of varlist work_home work_outside work_none {
	eststo: quietly probit `x' `regressvars' if EW == 1 & age > 18 & age < 61, cluster(IDHH)
	quietly estat classification if EW == 1
	quietly estadd scalar CC = r(P_corr) 
	quietly estadd scalar Sens = r(P_p1) 
	quietly estadd scalar Spec = r(P_n0)
		}

esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workcat3.tex", replace scalars("CC Corr. Classified" "Sens Sensitivity" "Spec Specificity" ) sfmt(%-12.3f) booktabs compress not label  ///
b(%-12.3f) pr2 title(Women's Labor Force ///
Participation) nobaselevels ///
 nonumbers mtitles ("Wk: Home" "Wk: Outside" "Wk: None")
 
 ******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, AFFLUENCE AND OTHER THINGS (with spec. Variables) and URBANITY
** GR village, DV ind
******************************************************************************************

	eststo clear
	local regressvars "*i_DVpca* age age_sq edu_anycollege choice gaunaage purdah widow childrenathome v_GRpca* hh_aff* i.hh_religioncaste hh_mainincome_* "

	

	foreach x of varlist work_home work_outside work_none {
	forv i = 0/1 {
	eststo: quietly probit `x' `regressvars' if EW == 1 & age > 18 & age < 61 & URBAN == `i', cluster(IDHH)
	quietly estat classification if EW == 1
	quietly estadd scalar CC = r(P_corr) 
	quietly estadd scalar Sens = r(P_p1) 
	quietly estadd scalar Spec = r(P_n0)
	}
	}
esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workcat4.tex", replace scalars("CC Corr. Classified" "Sens Sensitivity" "Spec Specificity" ) b(%-12.3f) sfmt(%-12.3f) booktabs compress not label  mgroups( ///
"Wk: Home" "Wk: Outside" "Wk: None", pattern(1 0 1 0 1 0) ///
prefix(\multicolumn{@span}{c}{) suffix(})  span erepeat(\cmidrule(lr){@span})) ///
 pr2 title(Women's Labor Force ///
Participation) nobaselevels ///
 nonumbers mtitles ("Rural" "Urban")
 
  ******************************************************************************************
** LIKELIHOOD OF WOMEN TO WORK, AFFLUENCE AND OTHER THINGS (with spec. Variables) and URBANITY
** GR village, DV village
******************************************************************************************

	eststo clear
	local regressvars "*v_DVpca* age age_sq edu_anycollege choice gaunaage purdah widow childrenathome v_GRpca* hh_aff* i.hh_religioncaste hh_mainincome_* "

	foreach x of varlist work_home work_outside work_none {
	forv i = 0/1 {
	eststo: quietly probit `x' `regressvars' if EW == 1 & age > 18 & age < 61 & URBAN == `i', cluster(IDHH)
	quietly estat classification if EW == 1
	quietly estadd scalar CC = r(P_corr) 
	quietly estadd scalar Sens = r(P_p1) 
	quietly estadd scalar Spec = r(P_n0)
	}
	}
esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/workcat5.tex", replace scalars("CC Corr. Classified" "Sens Sensitivity" "Spec Specificity" ) b(%-12.3f) sfmt(%-12.3f) booktabs compress not label  mgroups( ///
"Wk: Home" "Wk: Outside" "Wk: None", pattern(1 0 1 0 1 0) ///
prefix(\multicolumn{@span}{c}{) suffix(})  span erepeat(\cmidrule(lr){@span})) ///
 pr2 title(Women's Labor Force ///
Participation) nobaselevels ///
 nonumbers mtitles ("Rural" "Urban" "Rural" "Urban" "Rural" "Urban")


******************************************************************************************
** LIKELIHOOD OF WOMEN TO REPORT, BY DV VARIABLE (Specific Triggers)
******************************************************************************************
	eststo clear
	local rv1 "work_home work_outside URBAN age age_sq edu_anycollege choice"
	local rv2 "gaunaage widow purdah childrenathome v_GRpca*"
	local rv3 "hh_aff* i.hh_religioncaste hh_mainincome_*"
    
  forv x = 1/5{
		eststo: quietly probit iDV`x' `rv1' `rv2' `rv3' if EW == 1 & age > 18 & age < 61
		quietly estat classification 
		quietly estadd scalar CC = r(P_corr) 
		quietly estadd scalar Sens= r(P_p1) 
		quietly estadd scalar Spec= r(P_n0)
	}
		
esttab using "/Users/name/Documents/Domestic Violence and Women's Labor/TeX Files/dvprobit.tex", replace scalars("CC Corr. Classified Elig. Women" "Sens Sensitivity Elig. Women" "Spec Specificity Elig. Women") sfmt(%-12.1f) booktabs label compress not pr2 star( * 0.01  + 0.001) beta(%-12.3f)	/*
	*/ title(Women's Labor Force Participation based on Type of Work) nobaselevels interaction(" X ") nonumbers mtitles	/* 	
	*/ ("Leaving" "Dowry" "Neglect" "Bad Cooking" "Affair")
	
******************************************************************************************
** LIKELIHOOD OF WOMEN TO REPORT, BY DV VARIABLE (Specific Triggers)
******************************************************************************************
	eststo clear
	local rv1 "work_home work_outside URBAN age age_sq edu_anycollege choice"
	local rv2 "gaunaage widow purdah childrenathome v_GRpca*"
	local rv3 "hh_aff* i.hh_religioncaste hh_mainincome_*"
    
  forv x = 1/5{
		eststo: quietly regress vDV`x' `rv1' `rv2' `rv3' /*
		  					 */ if EW == 1 & age > 18 & age < 61 /*
		  					 */ , cluster(IDPSU)
	}
		
esttab using "/Users/name/ShayProject/Regressions/dvregress2.doc", replace sfmt(%-12.1f) booktabs label compress not r2 star( * 0.01  + 0.001) beta(%-12.3f)	/*
	*/ title(Women's Labor Force Participation based on Type of Work) nobaselevels interaction(" X ") nonumbers mtitles	/* 	
	*/ ("Leaving" "Dowry" "Neglect" "Bad Cooking" "Affair")
	
	


******************************************************************************************
** LIKELIHOOD OF WOMEN TO REPORT, BY DV VARIABLE (DVA Variables)
******************************************************************************************
	eststo clear
	local regressvars3 "work_home work_outside URBAN age age_sq edu_anycollege choice gaunaage widow childrenathome *GRpca* hh_pct* "
    
    forv x = 1/4{
	eststo: quietly regress i_DVpca`x' `regressvars3' if EW == 1 & age > 18 & age < 61
	}
		
esttab using "/Users/name/Dropbox/ShayProject/Regressions/regression1.doc", replace sfmt(%-12.1f) booktabs label compress not star( * 0.010  + 0.001) beta(%-12.3f)	r2/*
	*/ title(Women's Labor Force Participation based on Type of Work) nobaselevels interaction(" X ") nonumbers mtitles	/* 	
	*/ ("PCA Comp 1" "PCA Comp 2" "PCA Comp 3" "PCA Comp 4" )
	

