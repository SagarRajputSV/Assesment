function LoginValidation() 
{ 
	//obtaining values from the page as entered by the clients	
	var EmailEle=document.forms["LoginForm"]["Email"].value.trim();	
	var PasswordEle=document.forms["LoginForm"]["password"].value.trim();


    //Regular Expression for validation 
    var EmailEleCheck=/^[A-Za-z0-9._]{3,30}@[A-Za-z]{3,10}[.]{1}[A-Za-z]{2,6}$/;    
    var PasswordEleCheck=/^(?=.*[0-9])(?=.*[!@#$%^&*()_+-=<>])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*()-_+=<>?/]{8,16}$/;
   
    if(EmailEle=="")
    {
        alert("Please Enter E-mail ID");
        return (false);
    }

    else if(EmailEleCheck.test(EmailEle)==false)
    {
    	alert("Invalid E-Mail ID");
    	return (false);
    }

    if(PasswordEle=="")
    {
        alert("Please Enter You're Password");
        return (false);
    }

    else if(PasswordEleCheck.test(PasswordEle)==false)
    {
    	alert("Password Invalid It must contain a combination of letters,special characters and numbers and lenght must be between 8 and 16");
    	return (false);
    }

}

