*** Bootstrap
program drop bint

program bint
	version 14.1
	quietly: probit work_outside hh_aff1 urban urtaff if EW == 1
	inteff work_outside hh_aff1 urban urtaff if EW == 1
end
	
	
bootstrap, reps(1) size(20): bint, savedata(bintTest.text)
