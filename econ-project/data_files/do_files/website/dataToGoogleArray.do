***************************************************** 
* This file will turn your current data set into    * 
* a Google Charts compatable Array                  *
***************************************************** 

// Change these according to your needs. They can be set using globals before you call this do file. 
// global chartName "play"
// global chartNum 0
cd "/Users/shaypepper/Dropbox/shay/ShaySite/charts/"

// These are the local macros I'll be needing
unab vars: *
local vn: word count `vars'
local stringVars = ""
local N = _N

// Get proper file
file close _all

if $chartNum == 0 {
	file open x using "$chartName.js", write replace
	file write x "var ${chartName}Data = [];" 
} 
else {
	file open x using "$chartName.js", write append
}

// Start new array for data
file write x ///
	_n(2) _col(0) "${chartName}Data[$chartNum] = ["  ///
	_n(1) _col(2) "[" _n
	
	
// Column Headings
foreach var of varlist `vars' {
	display as text `"`:variable label `var''"'
	 file write x _col(4) "{ "  ///
		 `"id: "`var'", "'  ///
		 `"label: ""'   `"`:variable label `var'' ""'  ///
		 ", type: 'number' }" ///
		 (cond( `"`: word `vn' of `vars''"' == `"`var'"', "", ",")) _n
	
	display regexm(`"`: type `var''"', `"str"')
	if regexm(`"`: type `var''"', `"str"') {
		replace `var' = `"""' + `var' + `"""'
		local stringVars: list stringVars | var
	} 
}

file write x _col(2) "],"

// Data
tempvar lines
egen `lines' = concat(_all), p(`", "')
replace `lines' = `"[ "' + `lines' + `" ]"' + cond(_n==_N,"",",")

foreach i of numlist 1/`N' {
	file write x _n _col(2) (`lines'[`i'])
}

file write x _n _col(0) "]"

// Clean up all of the variables we used! 
file close _all
if `"`stringVars'"' != "" {
	foreach var of varlist `stringVars' {
		replace `var' = subinstr(`var', `"""', "",.)
	}
}
