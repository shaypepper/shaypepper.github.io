/* Work Map for Combined Data */
cd "/Users/shaypepper/Documents/2018-fall-ccny/econometrics/data/IHDS-II/"
use dtas/combined.dta, clear

keep STATEID WK* work_* age *DV* urban edu_levels ///
	SW hh_caste hh_religion hh_aff1 nunder5 purdah

gen all = 1
egen hh_affall = cut(hh_aff1) , group(5)
egen hh_affurban = cut(hh_aff1) if urban, group(5)
egen hh_affrural = cut(hh_aff1) if !urban, group(5)

keep if age > 14 & age < 50
recode age (15/19=0) (20/24=1) (25/29=2) (30/34=3) ///
		(35/39=4) (40/44=5) (45/49=6), gen(agegroup)
		
egen WKWAGE = anymatch(WKAG WKNONAG), v(1) 
egen WKOUTSIDE = anymatch(WKAG WKNONAG WKSALARY), v(1) 

save "dtas/workmap.dta", replace

foreach Y of varlist all hh_caste hh_religion ///
					hh_affall hh_affurban hh_affrural ///
					purdah iDV* nunder5 agegroup {
	levelsof `Y', local(z)
	foreach Z in `z' {
		preserve
		keep if `Z' == `Y'
			
		expand 2, gen(stateB)
		replace stateB = STATEID if stateB == 1
		expand 2, gen(urtB)
		replace urtB = urban + 1 if urtB == 1
		expand 2, gen(genderB)
		replace genderB = female + 1 if genderB == 1
		expand 2, gen(ewB)
		drop if ewB == 1 & genderB != 2
		replace ewB = EW + 1 if ewB == 1
		expand 2, gen(dvB)
		drop if dvB == 1 & ewB == 0
		replace dvB = iDVcomp + 1 if dvB == 1
		
		collapse  (max) STATEID (mean) WK*  [pw=SW], by(*B) 
		format WK*  %9.5f 
		
		merge m:1 STATEID using "dtas/IHDSStates.dta", nogen // pull up isocodes
		
		label value STATEID STATEID
		decode STATEID, gen(state)
		drop STATEID
		
		lab def isocode ///
		 1   "IN-AP"	2   "IN-AR"  3   "IN-AS" 	4   "IN-BR" /// 
		 6   "IN-CT"  7   "IN-GA"  8   "IN-GJ"	9   "IN-HR" /// 
		 10  "IN-HP" 	11  "IN-JK"  12  "IN-JH" 	13  "IN-KA" /// 
		 14  "IN-KL" 	15  "IN-MP"  17  "IN-MH" 	18  "IN-MN" /// 
		 19  "IN-ML" 	20  "IN-MZ"  21  "IN-NL" 	22  "IN-DL" /// 
		 23  "IN-OR" 	24  "IN-PB"  25  "IN-RJ" 	26  "IN-SK" /// 
		 27  "IN-TN"	29  "IN-TR"  30  "IN-UP" 	32  "IN-UT" /// 
		 33  "IN-WB" 	34  "IN-DN"  35  "IN-CH"  36  "IN-DD" ///
		 37  "IN-PY" 
		 label value code isocode
		 decode code, gen(isocode)
		
		export excel using "work_map", sheet(`"`Y'_`Z'"') sheetreplace nolabel first(varl)
		restore
	}
}
