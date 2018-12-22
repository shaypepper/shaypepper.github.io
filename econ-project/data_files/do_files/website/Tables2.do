
log using "tables.log", replace

foreach var of varlist GR21b GR22b GR23b GR24b GR25b {
tabstat `var', statistics(mean sd count) by(URBAN) coulmns(statistics)

}

foreach var of varlist GR21b GR22b GR23b GR24b GR25b {
tabstat `var', statistics(mean sd count) by(GROUPS8) coulmns(statistics)

}


gen genderurban = Male + URBAN
replace genderurban = genderurban + 3 if Male == 0
label define gu 1 "Rural Male" 2 "Urban Male" 3 "Rural Female" 4 "Urban Female"
label value genderurban gu

gen ewurban = EW + URBAN
label define ewu 1 "Rural EW" 2 "Urban EW"
label value ewurban ewu


forv i=1/4 {
gen gu`i' = 1 if genderurban == `i'
gen earnings`i' = earnings if genderurban == `i'
gen lit`i' = lit if genderurban == `i'
gen edu`i' = edu if genderurban == `i'
}

forv i=1/2 {
gen ewu`i' = 1 if ewurban == `i'
gen ewearnings`i' = earnings if ewurban == `i'
gen ewlit`i' = lit if ewurban == `i'
gen ewedu`i' = edu if ewurban == `i'
}

tabstat ewu1 ewu2 gu1 gu2 gu3 gu4, stat(n) by(partfulltime)
tabstat ewu1 ewu2 gu1 gu2 gu3 gu4, stat(n) by(edu) la(30)
tabstat ewearnings1 ewearnings2 earnings1 earnings2 earnings3 earnings4, statistics(mean sd n) by(partfulltime)
tabstat ewlit1 ewlit2 lit1 lit2 lit3 lit4, statistics( mean sd n)

log close
