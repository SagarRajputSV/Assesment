function RegValidation() 
{
	//obtaining values from the page as entered by the clients
	var FNameEle=document.forms["RegForm"]["FName"].value.trim();
	var LNameEle=document.forms["RegForm"]["LName"].value.trim();
	var EmailEle=document.forms["RegForm"]["Email"].value.trim();
	var PNumberEle=document.forms["RegForm"]["PNumber"].value.trim();
	var PasswordEle=document.forms["RegForm"]["password"].value.trim();
	var GenderEle=document.forms["RegForm"]["Gender"];
	var Gcount=0;

    //Regular Expression for validation 
    var FNameEleCheck=/^[A-Za-z. ]{3,30}$/;
    var LNameEleCheck=/^[A-Za-z. ]{3,30}$/;
    var EmailEleCheck=/^[A-Za-z0-9._]{3,30}@[A-Za-z]{3,10}[.]{1}[A-Za-z]{2,6}$/;
    var PNumberEleCheck=/^[0-9]{6,13}/;
    var PasswordEleCheck=/^(?=.*[0-9])(?=.*[!@#$%^&*()_+-=<>])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*()-_+=<>?/]{8,16}$/;
    
   
    if(FNameEle=="")
    {
        alert("Please Enter First Name");
        return (false);
    }

    else if(FNameEleCheck.test(FNameEle)==false)
    {
    	alert("First Name Invalid");
    	return (false);
    }

    if(LNameEle=="")
    {
        alert("Please Enter Last Name");
        return (false);
    }

    else if(LNameEleCheck.test(LNameEle)==false)
    {
    	alert("Last Name Invalid");
    	return (false);
    }

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

    if(PNumberEle=="")
    {
        alert("Please Enter Phone Number");
        return (false);
    }

    else if(PNumberEleCheck.test(PNumberEle)==false)
    {
    	alert("Invalid Phone Number");
    	return(false);
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

    for(var i=0;i<GenderEle.length;i++)
    {
    	if(GenderEle[i].checked==true)
    	{
    		Gcount++;
    		break;
    	}
    }

    if(Gcount<1)
    {
    	alert("Please Select Gender");
    	return (false);
    }
}

