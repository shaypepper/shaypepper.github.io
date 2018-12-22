
**** WOMEN labor force participation **

** Urban

* Overall Rate (according to the survey definition)
bysort notmarried: ta anywork if URBAN == 1 & Female == 1 & RO5 < 66

** Rural
bysort notmarried: ta anywork if URBAN == 0 & Female == 1 & RO5 < 66

** Urban + Religion
bysort URBAN GROUPS8: ta anywork if Female == 1 & RO5 < 66


** Urban, Religion, Education

** Create College Education



bysort college_grad: ta anywork if Female == 1 & RO5 < 66 & URBAN == 1

bysort college_grad: ta anywork if Female == 1 & RO5 < 66 & URBAN == 0

reg anywork college_grad if Female == 1 & RO5 < 66 & URBAN == 1
probit anywork college_grad if Female == 1 & RO5 < 66 & URBAN == 1

** Income

reg anywork college_grad notmarried if Female == 1 & RO5 < 66 & URBAN == 0 & INCOME10 < 5

*** Domestic Violence and LFP


corr anywork vDV1_leaving if Female == 1 & RO5 < 66 & URBAN == 0 
*corr anywork iDV1_leaving if Female == 1 & RO5 < 66 & URBAN == 0 

corr anywork vDV* if Female == 1 & RO5 < 66 & URBAN == 0 

corr anywork vDV1_leaving if Female == 1 & RO5 < 66 & URBAN == 1
 

corr anywork vDV* if Female == 1 & RO5 < 66 & URBAN == 1
 



foreach var of varlist vDV* {
probit anywork age age_sq notmarried college_grad  c.`var'*##i.GROUPS8 demo1 /*
		*/  if Female == 0 & age>18 & age < 61 & URBAN == 1, robust nolog cluster(IDHH)
probit anywork age age_sq notmarried college_grad  c.`var'*##i.GROUPS8 demo1 /*
		*/  if Female == 0 & age>18 & age < 61 & URBAN == 0, robust nolog cluster(IDHH)
}


probit anywork age age_sq notmarried college_grad  c.vDV1_leaving##i.GROUPS8 demo1 i.ID15 /*
		*/  if Female == 0 & age>18 & age < 61 & URBAN == 1, robust nolog cluster(IDHH)
		
probit anywork age age_sq notmarried college_grad  c.vDV1_leaving##i.GROUPS8 demo1 i.ID15/*
		*/  if Female == 0 & age>18 & age < 61 & URBAN == 0, robust nolog cluster(IDHH)
probit anywork age age_sq notmarried college_grad  c.vDV1_leaving##i.GROUPS8 demo1 i.ID15/*
		*/  if Female == 1 & age>18 & age < 61 & URBAN == 0, robust nolog cluster(IDHH)
		
probit anywork age age_sq notmarried college_grad  c.vDV4_cooking##i.GROUPS8 demo1 i.ID15/*
		*/  if Female == 0 & age>18 & age < 61 & URBAN == 0, robust nolog cluster(IDHH)
		ta anywork if e(sample)
probit anywork age age_sq notmarried college_grad  c.vDV4_cooking##i.GROUPS8 demo1 i.ID15/*
		*/  if Female == 1 & age>18 & age < 61 & URBAN == 0, robust nolog cluster(IDHH)
		ta anywork if e(sample)

probit anywork age age_sq notmarried college_grad  vDV4_cooking demo1 SPcollege_grad i.ID15/*
		*/  if Female == 0 & age>18 & age < 61 & URBAN == 0, robust nolog cluster(IDHH)
		ta anywork if e(sample)
probit anywork age age_sq notmarried college_grad  vDV4_cooking demo1 SPcollege_grad i.ID15/*
		*/  if Female == 1 & age>18 & age < 61 & URBAN == 0, robust nolog cluster(IDHH)
		ta anywork if e(sample)
		
probit vDV1_leaving anywork age age_sq notmarried college_grad demo* SPcollege_grad poorhealth i.ID15 if EW == 1
