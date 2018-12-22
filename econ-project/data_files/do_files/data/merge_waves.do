clear
// do  "/Users/shaypepper/Documents/2018-fall-ccny/econometrics/final_project/do_files/data/ihds1_cleaning.do"
// do  "/Users/shaypepper/Documents/2018-fall-ccny/econometrics/final_project/do_files/data/ihds2_cleaning.do"

cd "/Users/shaypepper/Documents/2018-fall-ccny/econometrics/data/"

use "IHDS-II/dtas/combined.dta", clear

merge 1:1 STATEID DISTID PSUID HHID HHSPLITID PERSONID using "IHDS-II/dtas/linkind.dta"
keep if _merge == 3 & PWAVES == 11

foreach x of var * {
	rename `x' `x'_2 
} 

global id_list "STATEID DISTID PSUID HHID HHSPLITID PERSONID"

foreach x in $id_list {
	rename `x'_2 `x' 
} 

rename PERSONID PERSON2011
rename PERSONID2005 PERSONID

rename HHID HHID2011
rename HHID2005 HHID

rename HHSPLITID HHSPLITID2011
rename HHSPLITID2005 HHSPLITID

drop if PERSONID == .

merge 1:m STATEID DISTID PSUID HHID HHSPLITID PERSONID using "IHDS-I/dtas/combined.dta"

// keep if _merge == 3

save "IHDS-II/dtas/bothpanels.dta", replace
