const express = require('express');
const sql = require('mssql');
const port = 3000;
const app = express();
const path = require('path');

const connectionstring = 
{
    user: 'training',
    password: 'training',
    server: '10.0.103.99\\SQL2008R2', 
    database: 'SQL_Training1'
}

app.use((req,res,next)=>{
    console.log(req.url);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs'); 

app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.type('html');
    res.sendFile(path.join(__dirname,'public','WelcomePage.html'));  
});

app.get('/RegistrationPage.html',(req,res)=>{
    res.type('html');
    res.sendFile(path.join(__dirname,'public','RegistrationPage.html'))
});

app.get('/LoginPage.html',(req,res)=>{
    res.type('html');
    res.sendFile(path.join(__dirname,'public','LoginPage.html'))
});

app.post('/register',(req,res)=>{
        var Fname = req.body.FName;
        var Lname = req.body.LName;
        var Email = req.body.Email;
        var pnumber= req.body.pnumber;
        var password = req.body.password;

        
    sql.connect(connectionstring,(err)=>{
        if(err)
        {
            console.log(err.message);
        }

        var request = new sql.Request();
        
        var que = "EXEC ValidateAndAddRegisters @FirstName='"+Fname+"',@LastName=\
        '"+Lname+"',@EmailId='"+Email+"',@PhoneNumber='"+pnumber+"',@Password=\
        '"+password+"'";
         
        request.query(que,(err,result)=>{
                if(err)
                {
                    console.log(err.message);
                }

                res.send(JSON.stringify(result.recordset));
            });            
    });   
});

app.post('/login',(req,res)=>{
    var Email= req.body.Email;
    var password = req.body.password;
    
    sql.connect(connectionstring,(err)=>{
        if(err)
        {
            console.log(err.message);
        }

        var request= new sql.Request();

        let que = "EXEC ValidateUserLogin @EmailId='"+Email+"',@Password='"+password+"'";

        request.query(que,(err,result)=>{
            res.send(result.recordset);
        });
    });
});

app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);
});