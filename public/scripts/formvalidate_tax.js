document.querySelector("#submitbutton").addEventListener("click", function(){
	var x = document.querySelector("#rate").value;
	
	if(x && isFinite(x)){
		document.querySelector("#theTaxForm").submit();
	} else {
		document.querySelector("#theMsg").innerHTML = "Please provide valid number";
	}
});