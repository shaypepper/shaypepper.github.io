
*** Relevant DV Variables


log close

*Perception of Violence
   ** Across Religion
   log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/DVbyReligion.log", replace
      * individual perception
   		tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(ID14) columns(variables)
   		tabstat weakperceptionofdv strongperceptionofdv noperceptionofdv, statistics( mean sd count ) by(ID14) columns(variables)
      * village perception
   		tabstat GR21v GR22v GR23v GR24v GR25v GRINDEXV , statistics( mean sd count ) by(ID14) columns(variables)
   		tabstat vweakperceptionofdv vstrongperceptionofdv vnoperceptionofdv, statistics (mean sd count) by(ID14) columns(variables)
   log close
   
   ** Across labor force participation (For women ages 15-49)
   log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/DVbylfp.log", replace
      * individual perception
   		tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(ANYWORK) columns(variables)
  		 tabstat weakperceptionofdv strongperceptionofdv, statistics( mean sd count ) by(ANYWORK) columns(variables)
      * village perception
  		 tabstat GR21v GR22v GR23v GR24v GR25v GRINDEXV , statistics( mean sd count ) by(ANYWORK) columns(variables)
  		 tabstat vweakperceptionofdv vstrongperceptionofdv, statistics (mean sd count) by(ANYWORK) columns(variables)
   log close
   
   ** Across Education (literate; High School, for women ages 15-49)
     log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/DVbyedu.log", replace
		*LITERACY
		* individual perception
			tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(ED2) columns(variables)
			tabstat weakperceptionofdv strongperceptionofdv, statistics( mean sd count ) by(ED2) columns(variables)
		* village perception
			tabstat GR21v GR22v GR23v GR24v GR25v GRINDEXV , statistics( mean sd count ) by(ED2) columns(variables)
			tabstat vweakperceptionofdv vstrongperceptionofdv, statistics (mean sd count) by(ED2) columns(variables)

		*LEVEL OF EDUCATION
		* 0 "No school" 1 "1-4 years of school" 2 "5-9 years of school" 3 "10-11 years of school" 4 "12-14 years of school" 5 "Graduate"
		* individual perception
			tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(edu) columns(variables)
			tabstat weakperceptionofdv strongperceptionofdv, statistics( mean sd count ) by(edu) columns(variables)
		* village perception
			tabstat GR21v GR22v GR23v GR24v GR25v GRINDEXV , statistics( mean sd count ) by(edu) columns(variables)
			tabstat vweakperceptionofdv vstrongperceptionofdv, statistics (mean sd count) by(edu) columns(variables)
			
		* individual perception
			tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(spouseedu2) columns(variables)
			tabstat weakperceptionofdv strongperceptionofdv, statistics( mean sd count ) by(spouseedu2) columns(variables)
		* village perception
			tabstat GR21v GR22v GR23v GR24v GR25v GRINDEXV , statistics( mean sd count ) by(spouseedu2) columns(variables)
			tabstat vweakperceptionofdv vstrongperceptionofdv, statistics (mean sd count) by(spouseedu2) columns(variables)

   	   log close
   
   ** Across Rural and Urban
   	 log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/DVbyrural.log", replace
		* individual perception
			tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(HI9) columns(variables)
			tabstat weakperceptionofdv strongperceptionofdv noperceptionofdv, statistics( mean sd count ) by(HI9) columns(variables)
		* village perception
			tabstat GR21v GR22v GR23v GR24v GR25v GRINDEXV , statistics( mean sd count ) by(HI9) columns(variables)
			tabstat vweakperceptionofdv vstrongperceptionofdv vnoperceptionofdv, statistics (mean sd count) by(HI9) columns(variables)
		log close

   ** Across Income
      	 log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/DVbyincome.log", replace
		* individual perception
			tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(INCOME5) columns(variables)
			tabstat weakperceptionofdv strongperceptionofdv noperceptionofdv, statistics( mean sd count ) by(INCOME5) columns(variables)
		* village perception
			tabstat GR21v GR22v GR23v GR24v GR25v GRINDEXV , statistics( mean sd count ) by(INCOME5) columns(variables)
			tabstat vweakperceptionofdv vstrongperceptionofdv vnoperceptionofdv, statistics (mean sd count) by(INCOME5) columns(variables)
		log close
	
	** Across Dowry
		 log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/DVbydowry.log", replace
		 foreach var of varlist bMP5A-bMP5R {
		* individual perception
			tabstat GR21b GR22b GR23b GR24b GR25b GRINDEX , statistics( mean sd count ) by(`var') columns(variables)
		* village perception
			tabstat GR21v GR22v GR23v GR24v GR25v GRINDEX , statistics( mean sd count ) by(`var') columns(variables)
			}
		log close
		
		log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/lfpbydowry.log", replace
		tabstat bMP5A-bMP5R, statistics( mean sd count ) by(ANYWORK) columns(variables)
		log close



 ** Lab force participation of women 15-49
 log using "/Users/name/Dropbox/Dowry Project/Shay_work/Code/lfptables.log", replace
   ** Across Religion
		tabstat WKANY salaryorwages fearnings, statistics (mean sd count) by (ID14) columns(variables)
   ** Rural and Urban
   		tabstat WKANY salaryorwages fearnings, statistics (mean sd count) by (HI9) columns(variables)
   ** Across Education
		*Literacy
			tabstat WKANY salaryorwages fearnings, statistics (mean sd count) by (ED2) columns(variables)
		*Edu Level
			* 0 "No school" 1 "1-4 years of school" 2 "5-9 years of school" 3 "10-11 years of school" 4 "12-14 years of school" 5 "Graduate"
			tabstat WKANY salaryorwages fearnings, statistics (mean sd count) by (edu) columns(variables)
	log close
   
