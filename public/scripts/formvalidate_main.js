// Validates the form

document.querySelector("#submitbutton").addEventListener("click", function(){
	
	var a = document.querySelector("#firstName").value;
	var b = document.querySelector("#lastName").value;
	var c = document.querySelector("#email").value;
	var d = document.querySelector("#address").value;
	var e = document.querySelector("#city").value;
	var g = document.querySelector("#job").value;
	var h = document.querySelector("#ssn").value;
	var i = document.querySelector("#cNumber").value;	
	var j = document.querySelector("#salary").value;	

  var theMsg = "";

	// If passes all validation, submit the form.

	if(!validateNonBlank(a)){
		theMsg = "Please provide a first name.";
	} else if(!validateNonBlank(b)){
		theMsg = "Please provide a last name.";
	} else if(!validateEmail(c)){
	  theMsg = "Please provide a valid email address.";
	} else if(!validateNonBlank(d)){
	  theMsg = "Please provide an address.";
	} else if(!validateNonBlank(e)){
	  theMsg = "Please provide a city name.";
	} else if(!validateNonBlank(g)){
	  theMsg = "Please provide a job title.";
	}	else if(!validateSSN(h)){
	  theMsg = "Please provide a valid social security number with hyphens.";
	} else if(!validateNumber(i)){
	  theMsg = "Please provide a phone number with digits only (no hyphens).";
	} else if(!validateNumber(j)){
	  theMsg = "Please provide a salary with digits only (no commas or currency symbol).";
	} else {
		document.querySelector("#theForm").submit();
	}

	// Any failure in validation and an appropriate message is rendered to the page

	document.querySelector("#theMsg").innerHTML = theMsg;

});

// Validates whether input is nonblank

function validateNonBlank(val){
	return val; 
}

// Validates wheter input is a proper email format

function validateEmail(val) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(val);
}

// Validates whether input is in proper SSN format

function validateSSN(val) {
  var re = /^(?:\d{3}-\d{2}-\d{4}|\d{2}-\d{7})$/;
  return re.test(val);
}

// Validates whether input is numbers-only

function validateNumber(val){
  var re = /^\d+$/;
  return re.test(val);
}