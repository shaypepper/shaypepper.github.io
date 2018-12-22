********************************************************************************
* Code to take data and turn it into a bootstrap-styled html table
*
* Format for calling do file:
*   do 'makeHTMLTable.do' "indvars" "depvars" "newfilename" "Title" "sampleweightvar"
*
*   Groups of variables should be in quotes. New file name should not have 
* 	extenstions. Sample weight variable is optional.
********************************************************************************
local ivars `1'
local dvars `2'
local stub  `3'
local title `4'
if "`5'" != "" {
	display "condition met"
	local weight `"[aw = `5']"'
	local weight2 `5'
}

tempname myFile 
file open `myFile' using "site/tables/`stub'.html", write replace


#delimit ;
file write `myFile' 
	_n `"<button type="button" class="btn btn-block""' 
		 `"data-toggle="modal" data-target="#`stub'">"'
	_n _col(2) `"Table: `title'"'
	_n `"</button>"'
	_n `"<div class="modal fade" id="`stub'" tabindex="-1" "'
		 `"role="dialog" aria-labelledby="`stub'Label">"'
  _n _col(2) `"<div class="modal-dialog" role="document">"' 
  _n _col(4) `"<div class="modal-content">"'
  _n _col(6) `"<div class="modal-header">"'
  _n _col(8) `"<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>"'
  _n _col(8) `"<h4 class="modal-title" id="`stub'Label">`title'</h4>"'
  _n _col(6) `"</div>"'
  _n _col(6) `"<div class="modal-body">"' ;

#delimit cr

file write `myFile' _n `"<table class="table table-responsive table-condensed">"'
file write `myFile' _n `"<tr><td></td><td></td>"' _n

foreach dvar of varlist `dvars' {
		file write `myFile' `"<td><span data-toggle="tooltip" data-placement="top" "'
		file write `myFile' `"title="`: variable label `dvar''">"'
		file write `myFile' `"`: char `dvar'[collabel]'</span></td>"'
}
file write `myFile' _n `"</tr>"'
	
foreach VAR of varlist `ivars'  {
	preserve
	keep `dvars' `VAR' `weight2'
	drop if `VAR' == . 
		
	collapse (mean) `dvars' `weight', by(`VAR')
	label values `VAR' `VAR'
	
	local N = _N
	local x = 2
	
	foreach dvVAR of varlist `dvars' {
		gen `dvVAR'_round = round(`dvVAR', 0.001)
		egen `dvVAR'_x = concat(`dvVAR'_round)
		replace `dvVAR'_x = "<td>" + `dvVAR'_x + "</td>"
		drop `dvVAR'_round `dvVAR'
		local ++x
	}
	
	
	egen dataTable = concat(`dvars')

	file write `myFile' _n _col(2) `"<tr><td colspan="`x'">`: variable label `VAR' '</td></tr>"' 
	
	foreach i of numlist 1/`N' {
		local x = `VAR'[`i']
		file write `myFile' _n _col(2) "<tr><td></td><td>`:label `VAR' `x''</td>"
		
		file write `myFile' _n _col(4) (dataTable[`i'])
		file write `myFile' _n _col(2) "</tr>"
	}
	
	file write `myFile' _n _col(2)
	
	restore
}


file write `myFile' _n "</table>"
file write `myFile' _n _col(6) "</div>" _n _col(4) "</div>" _n _col(2) "</div>" _n _col(0) "</div>"
file close _all
