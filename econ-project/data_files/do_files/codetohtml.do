
cd "/Users/shaypepper/Dropbox/shay/do/"
local datados: dir "/Users/shaypepper/Dropbox/shay/do/data/"  files "*.do"
local websitedos: dir "/Users/shaypepper/Dropbox/shay/do/website/"  files "*.do"

local z 0

tempname ex

file open `ex' using "/Users/shaypepper/Dropbox/shay/sourcecode.php", write replace


foreach y in "data" "website" {
foreach x in ``y'dos' {
	
	tempname r`z'
	file open `r`z'' using "`y'/`x'", read
	
	local X = regexr("`x'",".do","")
	display `"`X'"'
	
	file write `ex' _n `"<a class="btn btn-block" role="button" data-toggle="collapse" href="#`X'-do" aria-expanded="false" aria-controls="`X'-do">"'
	file write `ex' _n	`"`X'"'
	file write `ex' _n	`"</a><div class="collapse" id="`X'-do"><pre><code><?php include "do/`y'/`x'"; ?>"' 
		
	#delimit ;	
/*	file read `r`z'' line;
	while r(eof)==0 {; 
			file write `ex' _n`"`macval(line)'"'; 
			file read `r`z'' line; 
	};
	file write `ex' _n `"`macval(line)'"'; */

	file write `ex'
		_n _col(4) `"</code></pre></div>"';

	file close `r`z''; 
	
};
};

file close `ex';



