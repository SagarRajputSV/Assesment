const express = require('express');
const sql = require('mssql');
const port = 3000;
const app = express();
const path = require('path');

// app.use((req,res,next)=>{
//     console.log(req.url);
//     next();
// });

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs'); 

app.use(express.static(path.join(__dirname,"public")));

const connectionstring = 
{
    user: 'training',
    password: 'training',
    server: '10.0.103.99\\SQL2008R2', 
    database: 'SQL_Training1'
}
        
sql.connect(connectionstring,(err)=>{
    if(err)
    {
        console.log(err.message);
    }
});

app.get('/',(req,res)=>{
    res.render('WelcomePage');
});

app.get('/WelcomePage',(req,res)=>{
    res.render('WelcomePage');
});

app.get('/RegistrationPage',(req,res)=>{
    res.render('RegistrationPage');
});

app.get('/LoginPage',(req,res)=>{
     res.render('LoginPage',{message:""});
});

app.post('/register',(req,res)=>{

        var Fname = req.body.FName;
        var Lname = req.body.LName;
        var Email = req.body.Email;
        var pnumber= req.body.PNumber;
        var password = req.body.password;
        var gender = req.body.Gender;

        var request = new sql.Request();
        
        var que = "EXEC ValidateAndAddRegisters @FirstName='"+Fname+"',@LastName=\
        '"+Lname+"',@EmailId='"+Email+"',@PhoneNumber='"+pnumber+"',@Password=\
        '"+password+"',@Gender='"+gender+"'";
         
        request.query(que,(err,result)=>{
                if(err)
                {
                    console.log(err.message);
                }
                
               var message='';
               const DBmessage = JSON.stringify(result.recordset[0]).substring(5,49);
                
               if (DBmessage =='Succesfully Registered"}')
               {
                  
                   message=DBmessage.substring(0,22);
                   message = message + ' Please Login for the intial use';
                   res.render('LoginPage',{message:message});
               }
               
               else
               {
                message = DBmessage;
                res.render('LoginPage',{message:message}); 
               }                     

                
            });            
});   


app.post('/login',(req,res)=>{
    var Email= req.body.Email;
    var password = req.body.password;

     var request= new sql.Request();

        let que = "EXEC ValidateUserLogin @EmailId='"+Email+"',@Password='"+password+"'";

        request.query(que,(err,result)=>{
            if(err)
            {
                console.log(err.message);
            }

            res.render('LoginPortalPage');

            // res.send(result.recordset[0]);
        });
});


app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);
});