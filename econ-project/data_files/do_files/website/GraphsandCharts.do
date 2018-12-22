********************************************************************************
*  Relationship between Labor Force Participation & Domestic Violence in India *
*  by Shay Culpepper with help fro Prabal De - City College of New York				 *
********************************************************************************
cd "/Users/name/Documents/MyProject/TeX Files/"
*******************************************************************************
*	Tables and models to build the relationship between affluence, work, 
*	gender relations, religion/caste, and domestic violence.
*	
*	1) Affluence
* 2) Education
*	3) Caste/Religion
*	4) Gender Relations																			 

/*		*		*		*		*		*		*		*		*		*		*		*		*		*		*		*		*		*		*		*
1) AFFLUENCE																 
	A) INCOME
		i) DOMESTIC VIOLENCE
			a) Individual, Triggers & PCA */
			* 	I) Graph
					graph bar iDV* if EW == 1, ///
				  over(INCOME5) over(URBAN) scheme(economist) xsize(8) ysize(4) ///
				  legend(order(1 "Leaving w/ out Permission" 2 "Too little dowry" ///
				  3 "House/children neglect" 4 "Bad Cooking" 5 "Affair")) ///
				  title(Domestic Violence and Income)
				  graph export "~/Documents/MyProject/TeX Files/graph1Aia.eps", replace
				  
			* 	II) Proportions Table
					latabstat iDV* if EW == 1, stat(mean) by(INCOME5)  ///
					tf("~/Documents/MyProject/TeX Files/table1Aia") f(%9.3f) replace ///
					caption(Violence Perception by Trigger and Income)
					
			* 	III) Correlations
					eststo clear
					estpost corr INCOME5 i_DVpca* if EW == 1
					est store corr1Aia
					esttab corr1Aia using "~/Documents/MyProject/TeX Files/corr1Aia.tex", ///
					replace b(%9.3f) nogaps not label nonumbers ///
					title(Domestic Violence Principle Component Analysis and Income Correlations)
					
	/* ii) Women's Work
			a) Individual, Triggers & PCA */
			local workv "work_none work_parttime work_fulltime work_home work_outside"
			* 	I) Graph
					graph bar `workv' if EW == 1, ///
				  over(INCOME5) over(URBAN) scheme(economist) xsize(8) ysize(4) ///
				  legend(order(1 "No Work" 2 "Part-time" ///
				  3 "Full-time" 4 "Work at Home" 5 "Work Outside")) ///
				  title(Women's Labor and Income)
				  graph export "~/Documents/MyProject/TeX Files/graph1Aiia.eps", replace
				  
			* 	II) Proportions Table
					latabstat `workv' if EW == 1, stat(mean) by(INCOME5)  ///
					tf("~/Documents/MyProject/TeX Files/table1Aiia") f(%9.3f) replace ///
					caption(Women's Labor and Income)
										
					
					
/*B) CONSUMPTION
		i) DOMESTIC VIOLENCE
			a) Individual, Triggers & PCA */
			* 	I) Graph
					graph bar iDV* if EW == 1, ///
				  over(cutCOPC) over(URBAN) scheme(economist) xsize(8) ysize(4) ///
				  legend(order(1 "Leaving w/ out Permission" 2 "Too little dowry" ///
				  3 "House/children neglect" 4 "Bad Cooking" 5 "Affair")) ///
				  title(Domestic Violence and Consumption)
				  graph export "~/Documents/MyProject/TeX Files/graph1Bia.eps", replace
			* 	II) Proportions Table
					latabstat iDV* if EW == 1, stat(mean) by(cutCOPC)  ///
					tf("~/Documents/MyProject/TeX Files/table1Bia") f(%9.3f) replace ///
					caption(Violence Perception by Trigger and Consumption)
			* 	III) Correlations
					eststo clear
					estpost corr COPC i_DVpca* if EW == 1
					est store corr1Bia
					esttab corr1Bia using "~/Documents/MyProject/TeX Files/corr1Bia.tex", ///
					replace b(%9.3f) nogaps not label nonumbers ///
					title(Domestic Violence Principle Component Analysis and Consumption Correlations)

/*C) ASSETS
		i) DOMESTIC VIOLENCE
			a) Individual, Triggers & PCA */
			* 	I) Graph
					recode hh_assets (0/10=1)(11/20=2)(21/30=3), gen(hhassets2)
					graph bar iDV* if EW == 1, ///
				  over(hhassets2) over(URBAN) scheme(economist) xsize(8) ysize(4) ///
				  legend(order(1 "Leaving w/ out Permission" 2 "Too little dowry" ///
				  3 "House/children neglect" 4 "Bad Cooking" 5 "Affair")) ///
				  title(Domestic Violence and Assets)
				  graph export "~/Documents/MyProject/TeX Files/graph1Cia.eps", replace
			* 	II) Proportions Table
					latabstat iDV* if EW == 1, stat(mean) by(hhassets2)  ///
					tf("~/Documents/MyProject/TeX Files/table1Cia") f(%9.3f) replace ///
					caption(Violence Perception by Trigger and Assets)
			* 	III) Correlations
					eststo clear
					estpost corr hh_assets i_DVpca* if EW == 1
					est store corr1Cia
					esttab corr1Cia using "~/Documents/MyProject/TeX Files/corr1Cia.tex", ///
					replace b(%9.3f) nogaps not label nonumbers ///
					title(Domestic Violence Principle Component Analysis and Assets Correlations)
*D) EDUCATION
*		i) DOMESTIC VIOLENCE
*			a) Individual, Triggers & PCA */
			* 	I) Graph
					graph bar iDV* if EW == 1, ///
				  over(highestfedu) over(URBAN) scheme(economist) xsize(8) ysize(4) ///
				  legend(order(1 "Leaving w/ out Permission" 2 "Too little dowry" ///
				  3 "House/children neglect" 4 "Bad Cooking" 5 "Affair")) ///
				  title(Domestic Violence and Education)
				  graph export "~/Documents/MyProject/TeX Files/graph1Dia.eps", replace
			* 	II) Proportions Table
					latabstat iDV* if EW == 1, stat(mean) by(highestfedu)  ///
					tf("~/Documents/MyProject/TeX Files/table1Dia") f(%9.3f) replace ///
					caption(Violence Perception by Trigger and Education)
			* 	III) Correlations
					eststo clear
					estpost corr highestfedu i_DVpca* if EW == 1
					est store corr1Dia
					esttab corr1Dia using "~/Documents/MyProject/TeX Files/corr1Dia.tex", ///
					replace b(%9.3f) nogaps not label nonumbers ///
					title(Domestic Violence Principle Component Analysis and Edu Correlations)
*E) Affluence PCA 
*		i) DOMESTIC VIOLENCE
*			a) Individual, Triggers & PCA
			* 	I) Graph
					graph bar iDV* if EW == 1, ///
				  over(affcut) over(URBAN) scheme(economist) xsize(8) ysize(4) ///
				  legend(order(1 "Leaving w/ out Permission" 2 "Too little dowry" ///
				  3 "House/children neglect" 4 "Bad Cooking" 5 "Affair")) ///
				  title(Domestic Violence and Affluence PCA)
				  graph export "~/Documents/MyProject/TeX Files/graph1Eia.eps", replace
			* 	II) Proportions Table
					latabstat iDV* if EW == 1, stat(mean) by(affcut)  ///
					tf("~/Documents/MyProject/TeX Files/table1Eia") f(%9.3f) replace ///
					caption(Violence Perception by Trigger and Affluence PCA)
			* 	III) Correlations
					eststo clear
					estpost corr hh_aff1 i_DVpca* if EW == 1
					est store corr1Eia
					esttab corr1Eia using "~/Documents/MyProject/TeX Files/corr1Eia.tex", ///
					replace b(%9.3f) nogaps not label nonumbers ///
					title(Domestic Violence Principle Component Analysis and Affluence PCA Correlations)
