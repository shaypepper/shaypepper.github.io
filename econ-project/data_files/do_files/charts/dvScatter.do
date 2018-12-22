/* DV comparison data for Scatter Plot */
cd /Users/shaypepper/Dropbox/
use dtas/DVcompare.dta, clear

keep code isocode urt*  *DV*

save "dtas/DVscatter.dta", replace

foreach X in DV1 DV2 DV3 DV4 DV5 DVcomp {
	preserve
	
	keep code isocode urt i`X' n`X' nm`X' ///
		nDVlesssevere nDVsevere nDVns nDVsexual nDVoccured

	order code isocode urt i`X' n`X' nm`X' ///
		nDVlesssevere nDVsevere nDVns nDVsexual nDVoccured

	foreach x of varlist i`X' n`X' nm`X' ///
		nDVlesssevere nDVsevere nDVns nDVsexual nDVoccured {
			replace `x' = round(`x'*100, 0.01)
		}
	export excel using "shay/Maps/DVScatter.xls", ///
		sheet(`"`X'"') sheetreplace first(varl)
	restore
}
