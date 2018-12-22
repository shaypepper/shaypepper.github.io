********************************************************************************
* Clean up NFHS data to compare w/ IHDS data
********************************************************************************

capture log close
cd "/Users/shaypepper/Dropbox/dtas/"
clear

********************************************************************************
* Import India Census Data
********************************************************************************

import delimited "/Users/shaypepper/Dropbox/shay/do/Census Population Data.csv", ///
	varnames(1) encoding(ISO-8859-1)

reshape wide persons males females, i(state) j(tru) string

rename (persons* males* females*) (*pop *men *women)
rename (Total* Urban* Rural*) (* urban* rural*)

/* Code state names for easier merging */
gen code = .
replace code = 1 if state == "Andaman and Nicobar Islands"
replace code = 2 if state == "Andhra Pradesh"
replace code = 3 if state == "Arunachal Pradesh"
replace code = 4 if state == "Assam"
replace code = 5 if state == "Bihar"
replace code = 6 if state == "Chandigarh"
replace code = 7 if state == "Chhattisgarh"
replace code = 8 if state == "Dadra & Nagar Haveli"
replace code = 9 if state == "Daman & Diu"
replace code = 10 if state == "Goa"
replace code = 11 if state == "Gujarat"
replace code = 12 if state == "Haryana"
replace code = 13 if state == "Himachal Pradesh"
replace code = 14 if state == "Jammu & Kashmir"
replace code = 15 if state == "Jharkhand"
replace code = 16 if state == "Karnataka"
replace code = 17 if state == "Kerala"
replace code = 18 if state == "Lakshadweep"
replace code = 19 if state == "Madhya Pradesh"
replace code = 20 if state == "Maharastra"
replace code = 21 if state == "Manipur"
replace code = 22 if state == "Meghalaya"
replace code = 23 if state == "Mizoram"
replace code = 24 if state == "NCT of Delhi"
replace code = 25 if state == "Nagaland"
replace code = 26 if state == "Orissa"
replace code = 27 if state == "Puducherry"
replace code = 28 if state == "Punjab"
replace code = 29 if state == "Rajasthan"
replace code = 30 if state == "Sikkim"
replace code = 31 if state == "Tamil Nadu"
replace code = 32 if state == "Tripura"
replace code = 33 if state == "Uttar Pradesh"
replace code = 34 if state == "Uttarakhand"
replace code = 35 if state == "West Bengal"

save "NFHS_census_IHDS.dta", replace


/* Create variable to match Census data with NFHS state codes */
recode code ///
					 ( 14 =  1 ) /// [jm] jammu and kashmir
           ( 13 = 2 ) /// [hp] himachal pradesh
           ( 28 =  3 ) /// [pj] punjab
           ( 34  =  5 ) /// [uc] uttaranchal
           ( 12 =  6 ) /// [hr] haryana
           ( 24 =  7 ) /// [dl] delhi
           ( 29 =  8 ) /// [rj] rajasthan
           ( 33 =  9 ) /// [up] uttar pradesh
           ( 5  = 10 ) /// [bh] bihar
           ( 30 = 11 ) /// [sk] sikkim
           ( 3  = 12 ) /// [ar] arunachal pradesh
           ( 25 = 13 ) /// [na] nagaland
           ( 21 = 14 ) /// [mn] manipur
           ( 23 = 15 ) /// [mz] mizoram
           ( 32 = 16 ) /// [tr] tripura
           ( 22 = 17 ) /// [mg] meghalaya
           ( 4  = 18 ) /// [as] assam
           ( 35 = 19 ) /// [wb] west bengal
           ( 15 = 20 ) /// [jh] jharkhand
           ( 26 = 21 ) /// [or] orissa
           ( 7  = 22 ) /// [ch] chhatisgarh
           ( 19 = 23 ) /// [mp] madhya pradesh
           ( 11 = 24 ) /// [gj] gujarat
           ( 20 = 27 ) /// [mh] maharashtra
           ( 2  = 28 ) /// [ap] andhra pradesh
           ( 16 = 29 ) /// [ka] karnataka
           ( 10 = 30 ) /// [go] goa
           ( 17 = 32 ) /// [ke] kerala
           ( 31 = 33 ) /// [tn] tamil nadu
					 (else = . ),	gen(v101)

keep code v101
drop if v101 == .
save NFHSStates.dta, replace

/* Create variable to match Census data with IHDS state codes */
use "NFHS_census_IHDS.dta", clear
recode code ///
				( 14 =  1 ) /// Jammu & Kashmir 01
        ( 13 =  2 ) /// Himachal Pradesh 02
        ( 28 =  3 ) /// Punjab 03
        ( 6  =  4 ) /// Chandigarh 04
        ( 34 =  5 ) /// Uttaranchal 05
        ( 12 =  6 ) /// Haryana 06
        ( 24 =  7 ) /// Delhi 07
        ( 29 =  8 ) /// Rajasthan 08
        ( 33 =  9 ) /// Uttar Pradesh 09
        ( 5  = 10 ) /// Bihar 10
        ( 30 = 11 ) /// Sikkim 11
        ( 3  = 12 ) /// Arunachal Pradesh 12
        ( 25 = 13 ) /// Nagaland 13
        ( 21 = 14 ) /// Manipur 14
        ( 23 = 15 ) /// Mizoram 15
        ( 32 = 16 ) /// Tripura 16
        ( 22 = 17 ) /// Meghalaya 17
        ( 4  = 18 ) /// Assam 18
        ( 35 = 19 ) /// West Bengal 19
        ( 15 = 20 ) /// Jharkhand 20
        ( 26 = 21 ) /// Orissa 21
        ( 7  = 22 ) /// Chhatishgarh 22
        ( 19 = 23 ) /// Madhya Pradesh 23
        ( 11 = 24 ) /// Gujarat 24
        ( 9  = 25 ) /// Daman & Diu 25
        ( 8  = 26 ) /// Dadra+Nagar Haveli 26
        ( 20 = 27 ) /// Maharashtra 27
        ( 2  = 28 ) /// Andhra Pradesh 28
        ( 16 = 29 ) /// Karnataka 29
        ( 10 = 30 ) /// Goa 30
        ( 18 = 31 ) /// Lakshadweep 31
        ( 17 = 32 ) /// Kerala 32
        ( 31 = 33 ) /// Tamil Nadu 33
        ( 27 = 34 ) /// Pondicherry 34
				(else = .), gen(STATEID)
keep STATEID code 
drop if STATEID == .
save "IHDSStates.dta", replace


/* Run IHDS Recode */
do "/Users/shaypepper/Dropbox/shay/do/data/IHDSRecode.do"

/* Begin NFHS Recode */ 
use v101 v005 mv005 v744* mv744* d106 d107 d108 s025 ///
	using "/Users/shaypepper/Desktop/IA_2005-06_DHS_04102016_1631_77784/iacr52dt/IACR52FL.dta", clear
save "couple_NFHS.dta", replace

recode s025 (1/5 = 1) (6 = 0), gen(urban)
label define urban 0 "Rural" 1 "Urban" 
label value urban urban

save "couple_NFHS2.dta", replace
merge m:1 v101 using "NFHSstates.dta", nogen
merge m:1 code using "NFHS_census_IHDS.dta", nogen
drop state

foreach V of varlist d106 d107 d108 {
	recode `V' (8 = 0) (9 = .) 			
	}
	
gen dany = d106+d107+d108
recode dany (1/3 = 1)	

gen dnonsex = d106+d107
recode dnonsex (1/2 = 1)	

gen v744x = .
replace v744x = 0 if v744a==0 & v744b==0 & v744c==0 & v744d==0 & v744e==0
replace v744x = 1 if v744a==1 | v744b==1 | v744c==1 | v744d==1 | v744e==1

gen mv744x = .
replace mv744x = 0 if mv744a==0 & mv744b==0 & mv744c==0 & mv744d==0 & mv744e==0
replace mv744x = 1 if mv744a==1 | mv744b==1 | mv744c==1 | mv744d==1 | mv744e==1

foreach V of varlist v744* d106 d107 d108 dany dnonsex {
	recode `V' (8 = 0) (9 = .) 											/* Only "yes" means "yes" */
	gen `V'_u = .
	replace `V'_u = `V' if urban == 1				 				/* Variable of only urban answers */
	gen `V'_r = .
	replace `V'_r = `V' if urban == 0								/* Variable of only rural answers */

	bysort v101: egen count_`V' = count(`V')	
	gen wf_`V' = floor(women/count_`V')
	
	bysort v101: egen count_`V'_u = count(`V'_u)
	gen wf_`V'_u = floor(urbanwomen/count_`V'_u)
	
	bysort v101: egen count_`V'_r = count(`V'_r)
	gen wf_`V'_r = floor(ruralwomen/count_`V'_r)
	
	gen wf_`V'_ur = .
	replace wf_`V'_ur = wf_`V'_r if urban == 0
	replace wf_`V'_ur = wf_`V'_u if urban == 1
	
	gen stateF`V' = . 
	gen stateF1`V' = .
	gen stateuF`V' = .
	gen staterF`V' = .
	
	forv X = 1/39 { /* For each state, calculate the mean and append state variable to include that number */
		su `V' [fw = wf_`V'_ur] if code == `X'
		replace stateF`V' = r(mean) if code == `X'
		
		su `V' [aw = v005] if code == `X'
		replace stateF1`V' = r(mean) if code == `X'
		
		su `V' [aw = v005] if code == `X' & urban == 1
		replace stateuF`V' = r(mean) if code == `X' & urban == 1
		
		su `V' [aw = v005] if code == `X' & urban == 0
		replace staterF`V' = r(mean) if code == `X' & urban == 0		
		}
	}
	


	
foreach V of varlist mv744* {
	recode `V' (8 = 0) (9 = .) 											/* Only "yes" means "yes" */
	gen `V'_u = .
	replace `V'_u = `V' if urban == 1				 				/* Variable of only urban answers */
	gen `V'_r = .
	replace `V'_r = `V' if urban == 0								/* Variable of only rural answers */

	bysort v101: egen count_`V' = count(`V')	
	gen wm_`V' = floor(men/count_`V')
		
	bysort v101: egen count_`V'_u = count(`V'_u)
	gen wm_`V'_u = floor(urbanmen/count_`V'_u)
	
	bysort v101: egen count_`V'_r = count(`V'_r)
	gen wm_`V'_r = floor(ruralmen/count_`V'_r)
	
	gen wm_`V'_ur = .
	replace wm_`V'_ur = wm_`V'_r if urban == 0
	replace wm_`V'_ur = wm_`V'_u if urban == 1
	
	gen stateM`V' = . 
	gen stateM1`V' = . 
	gen stateuM`V' = .
	gen staterM`V' = .
	
	forv X = 1/39 { /* For each state, calculate the mean and append state variable to include that number */
		su `V' [fw = wm_`V'_ur] if code == `X'
		replace stateM`V' = r(mean) if code == `X'
		
		su `V' [aw = mv005] if code == `X'
		replace stateM1`V' = r(mean) if code == `X'
		
		su `V' [aw = mv005] if code == `X' & urban == 1
		replace stateuM`V' = r(mean) if code == `X' & urban == 1
		
		su `V' [aw = mv005] if code == `X' & urban == 0
		replace staterM`V' = r(mean) if code == `X' & urban == 0
		}
	}
	
	drop state
	collapse (mean) state* count*, by(code)
	
	
save "NFHSdv.dta", replace


/* Merge IHDS data with NFHS data */
merge 1:1 code using "NFHS_census_IHDS.dta", nogen
merge 1:1 code using "IHDSdv.dta", nogen

save "DVcompare.dta",replace

/* Include state labels with combined file */
do "/Users/shaypepper/Dropbox/shay/do/data/StateLabels.do"
label value code state 


/* Reshape data to make state X urbanity */
expand 2, gen(totalmark)
expand 2 if totalmark == 0, gen(urbanmark)

gen urt = urbanmark
replace urt = 3 if totalmark == 1
recode urt (0 = 2)
label define urt 1 "Urban" 2 "Rural" 3 "Total"
label value urt urt 

gen urtstate = code*100 + urt



foreach Z in v744a v744b v744c v744d v744e v744x ///
							d106 d107 d108 dany dnonsex {
							
							gen `Z'_old = stateF`Z'
							replace `Z'_old = stateuF`Z' if urt == 1
							replace `Z'_old = staterF`Z' if urt == 2
							
							gen `Z' = stateF1`Z'
							replace `Z' = stateuF`Z' if urt == 1
							replace `Z' = staterF`Z' if urt == 2
							
							gen n_`Z' = count_`Z'
							replace n_`Z' = count_`Z'_r if urt == 2 
							replace n_`Z' = count_`Z'_u if urt == 1
							}
							
foreach Z in  iDV1 iDV2 iDV3 iDV4 iDV5 iDVcomp  {
							
							gen `Z' = state`Z'
							replace `Z' = stateu`Z' if urt == 1
							replace `Z' = stater`Z' if urt == 2
							
							gen n_`Z' = tcount_`Z'
							replace n_`Z' = rcount_`Z' if urt == 2 
							replace n_`Z' = ucount_`Z' if urt == 1
							}							
							
foreach Z in 	mv744a mv744b mv744c mv744d mv744e mv744x {
							
							gen `Z'_old = stateM`Z'
							replace `Z'_old = stateuM`Z' if urt == 1
							replace `Z'_old = staterM`Z' if urt == 2
							
							gen `Z' = stateM1`Z'
							replace `Z' = stateuM`Z' if urt == 1
							replace `Z' = staterM`Z' if urt == 2
							
							gen n_`Z' = count_`Z'
							replace n_`Z' = count_`Z'_r if urt == 2 
							replace n_`Z' = count_`Z'_u if urt == 1
							}

rename *mv* *v*_m
rename  (*v744a* *v744b* *v744c* *v744d* *v744e* *v744x*) ///
				(*nDV1*  *nDV3*  *nDV5*  *nDV2*  *nDV4* *nDVcomp*)
rename n*_m nm*
rename (*dnonsex* *dany* *d106* *d107* *d108*) (*nDVns* *nDVoccured* *nDVlesssevere* *nDVsevere* *nDVsexual*)  

gen censuspop = pop
replace censuspop = ruralpop if urt == 2
replace censuspop = urbanpop if urt == 1

gen censusmen = men
replace censusmen = ruralmen if urt == 2-
replace censusmen = urbanmen if urt == 1

gen censuswomen = women
replace censuswomen = ruralwomen if urt == 2
replace censuswomen = urbanwomen if urt == 1

drop state* *count*

gen str isocode = "."
replace isocode = "IN-AP" if code == 1
replace isocode = "IN-AR" if code == 2
replace isocode = "IN-AS" if code == 3
replace isocode = "IN-BR" if code == 4
replace isocode = "IN-CT" if code == 6
replace isocode = "IN-GA" if code == 7
replace isocode = "IN-GJ" if code == 8
replace isocode = "IN-HR" if code == 9
replace isocode = "IN-HP" if code == 10
replace isocode = "IN-JK" if code == 11
replace isocode = "IN-JH" if code == 12
replace isocode = "IN-KA" if code == 13
replace isocode = "IN-KL" if code == 14
replace isocode = "IN-MP" if code == 15
replace isocode = "IN-MH" if code == 17
replace isocode = "IN-MN" if code == 18
replace isocode = "IN-ML" if code == 19
replace isocode = "IN-MZ" if code == 20
replace isocode = "IN-NL" if code == 21
replace isocode = "IN-DL" if code == 22
replace isocode = "IN-OR" if code == 23
replace isocode = "IN-PB" if code == 24
replace isocode = "IN-RJ" if code == 25
replace isocode = "IN-SK" if code == 26
replace isocode = "IN-TN" if code == 27
replace isocode = "IN-TR" if code == 29
replace isocode = "IN-UP" if code == 30
replace isocode = "IN-UT" if code == 32
replace isocode = "IN-WB" if code == 33
replace isocode = "IN-DN" if code == 34
replace isocode = "IN-CH" if code == 35
replace isocode = "IN-DD" if code == 36
replace isocode = "IN-PY" if code == 37

save "DVcompare.dta", replace 


