**************************************************************
* TABLES
**************************************************************
capture log close
cd "/Users/shaypepper/Dropbox/shay/"
clear
file close _all

**************************************************************
* PERCEPTION ABT DOM. VIOLENCE (iDV* )
**************************************************************
use iDV* age REGION WK* hh_religion hh_caste urban affcut edu_levels EW SW ///
	using "/Users/shaypepper/Dropbox/dtas/combined.dta", clear

char define iDV1leaving[collabel] "Leaving"	
char define iDV2dowry[collabel] "Dowry"	
char define iDV3neglect[collabel] "Neglect"	
char define iDV4cooking[collabel] "Cooking"	
char define iDV5affair[collabel] "Affair"		
char define iDVcomp[collabel] "Any"		
label variable iDVcomp "Women who said yes to any of the other triggers, except affair."
	
recode age ///
	(15/19=0 "15-19") ///
	(20/24=1 "20-24") ///
	(25/29=2 "25-29") ///
	(30/34=3 "30-34") ///
	(35/39=4 "35-39") ///
	(40/44=5 "40-44") ///
	(45/49=6 "45-49") ///
	(else = .), gen(age2) label(age)
drop age 
rename age2 age

label copy URBAN urban
label copy ID13 hh_caste
label copy edu edu_levels

keep if EW == 1
order iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp

label variable age "AGE"
label variable REGION "REGION"
label variable hh_religion "RELIGION"
label variable hh_caste "CASTE"
label variable urban "URBANITY"
label variable edu_levels "EDUCATION"
label variable affcut "AFFLUENCE"


do "do/data/makeHTMLTable.do" ///
	"age REGION hh_religion hh_caste urban affcut edu_levels" ///
	iDV* "dvPerception" "Perception of Domestic Violence (women)"   SW 

**************************************************************
* WORK STATISTICS
**************************************************************

char define WKAGWAGE[collabel] "Agricultural Wage"
char define WKANIMAL[collabel] "Animal"
char define WKANY[collabel] "Any"
char define WKBUSINESS[collabel] "HH Business"
char define WKFARM[collabel] "Farm"
char define WKNONAG[collabel] "Non-Agricultural Wage"
char define WKSALARY[collabel] "Salary"

do "do/data/makeHTMLTable.do" ///
	"age REGION hh_religion hh_caste urban affcut edu_levels" ///
	WK* "wkParticipation" "Work Participation (women)"  SW
	
**************************************************************
* NFHS SUMMARY STATISTICS
**************************************************************

*---- WOMEN'S ATTITUDES ------*

use dva* dv_* mdva* mage age mv005 v005 d005 region religion caste urban affcut edu_level medu_level ///
	using "/Users/shaypepper/Dropbox/dtas/NFHSsummary.dta", clear

recode age ///
	(15/19=0 "15-19") ///
	(20/24=1 "20-24") ///
	(25/29=2 "25-29") ///
	(30/34=3 "30-34") ///
	(35/39=4 "35-39") ///
	(40/44=5 "40-44") ///
	(45/49=6 "45-49") ///
	(else = .), gen(age2) label(age)
drop age 
rename age2 age

order dva1 dva2 dva3 dva4 dva5 dvacomp

label variable age "AGE"
label variable region "REGION"
label variable religion "RELIGION"
label variable caste "CASTE"
label variable urban "URBANITY"
label variable edu_level "EDUCATION"
label variable affcut "AFFLUENCE"

char define dva1_leaving[collabel] "Leaving"
char define dva2_arguing[collabel] "Arguing"
char define dva3_neglect[collabel] "Neglect"
char define dva4_cooking[collabel] "Burning Food"
char define dva5_nosex[collabel] "Refusing sex"
char define dvacomp[collabel] "Any"


do "do/data/makeHTMLTable.do" ///
	"region age religion caste urban edu_level affcut" ///
	dva* "dvAttitudesWomen" "Domestic Violence Attitudes (women)"  v005

	
*---- Reports of Deomestic Violence ----*

char define dv_emotional[collabel] "Emotional"
char define dv_ls[collabel] "Less Severe"
char define dv_severe[collabel] "Severe"
char define dv_sex[collabel] "Sexual"
char define dv_ns[collabel] "Non-Sexual"
char define dv_any[collabel] "Any Abuse"

do "do/data/makeHTMLTable.do" ///
	"region age religion caste urban edu_level affcut" ///
	dv_* "dvReported" "Reported Domestic Violence"  d005

	
*---- Men's Attitudes ----*
recode mage ///
	(15/19=0 "15-19") ///
	(20/24=1 "20-24") ///
	(25/29=2 "25-29") ///
	(30/34=3 "30-34") ///
	(35/39=4 "35-39") ///
	(40/44=5 "40-44") ///
	(45/49=6 "45-49") ///
	(else = .), gen(mage2) label(mage)
drop mage 
rename mage2 mage

order mdva1 mdva2 mdva3 mdva4 mdva5 mdvacomp

char define mdva1_leaving[collabel] "Leaving"
char define mdva2_arguing[collabel] "Arguing"
char define mdva3_neglect[collabel] "Neglect"
char define mdva4_cooking[collabel] "Burning Food"
char define mdva5_nosex[collabel] "Refusing sex"
char define mdvacomp[collabel] "Any"


label variable mage "AGE"
label variable medu_level "EDUCATION"

do "do/data/makeHTMLTable.do" ///
	"region mage religion caste urban medu_level affcut" /// 
	mdva* "dvAttitudesMen" "Domestic Violence Attitudes (men)"  mv005














