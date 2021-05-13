const express=require('express')
const PORT=process.env.PORT || 9000;
const router=express.Router()
const mysql=require('mysql')
const bcrypt=require('bcrypt')
const app=express()
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"login_registration_database"
})
connection.connect(function(err){
    if (err)
    console.log("Error Occured ",err)
    console.log("Connected to Database Successfully !");
})
router.post('/signin',function(req,res){
    const mail=req.body.mail;
    bcrypt.hash(req.body.password, 8, function(err, value) {
        if (err)  
        throw (err); 
        var sql =`select * from login_registration_database.userdatatable where mail="${mail}"`
        connection.query(sql,function(err,result){
        if (err)
        return res.status(512).json({error:"Invalid mail or Password"})
        else if (result.length === 0)
        return res.status(512).json({error:"Invalid Mail or Password !"})
        bcrypt.compare(req.body.password,result[0].password,function(err,resl){
            if(resl)
            res.status(512).json({message:"Logged In Successfully !"})      
            else
            res.status(400).json({error:"Invalid Mail or Password !"})
        })
    })
    });
})
router.post('/signup',function(req,res){
    const name=req.body.name;
    const mail=""+req.body.mail+"";
    const phoneNumber=req.body.phoneNumber;
    bcrypt.hash(req.body.password,8)
    .then((value) => {
        var sql="insert into login_registration_database.userDataTable(name,mail,password,phoneNumber) values (?,?,?,?)";
        connection.query(`select mail from login_registration_database.userdatatable where mail="${mail.normalize().toString()}"`,function(err,result){
            if (err)
            console.log(err)
            if (result.length !== 0)
            return res.status(512).json({error:"E-Mail already exists, Please try with other"})
            else{
                connection.query(sql,[name,mail,value,phoneNumber],function(error,resul){
                    if (error)
                    throw error
                    res.json({message:"User Saved Successfully !"});
                })
            } 
        })
    })
})
router.get('/details',function(req,res){
    var sql="select id,name,mail,phoneNumber from login_registration_database.userdatatable";
    connection.query(sql,function(err,result){
        if(err)
        throw err
        res.json(result)
    })
})
app.use(express.json())
app.use(router)
app.listen(PORT,function(){
    console.log("Server Running on Port",PORT)
})