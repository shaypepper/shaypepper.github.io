use "/Users/shaypepper/Dropbox/dtas/DVcompare.dta", clear
quietly{

// rename (n*_m) (nm*)

eststo clear
bysort urtstate: eststo: estpost su nDVns
estout using mapchart.html, replace label collabels(none) cells(mean(f(3))) style(html)

		forv Y = 1/5 {
				foreach Z in i n nm {
					eststo clear
					bysort urtstate : eststo: estpost su `Z'DV`Y'
					estout using mapchart.html, append label collabels(none) cells(mean(f(3))) mlabels(none) style(html)
					}
			}
}


