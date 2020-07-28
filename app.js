//jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const json = require("body-parser/lib/types/json");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/signup.html");
   
});


app.post("/",(req,res) => {
    const Fname = req.body.firstName;
    const Lname = req.body.lastName;
    const imail = req.body.inputMail;

    const data =  {
        members: [
                    {
                        email_address: imail,
                        status: "subscribed",
                        merge_fields: {
                        FNAME: Fname,
                        LNAME: Lname
                        } 
                    }
                ]
    }   
    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/d7384975df";
    const options = {
        method: "POST",
        auth: "caleb1:33a75b31b6010b3c951552ef562b85b6-us17"
    }
    const request = https.request(url, options, (response) => {
        
            if (response.statusCode === 200){             
                    res.sendFile(__dirname + "/success.html");               
            }else{               
                    res.sendFile(__dirname + "/failure.html");             
            }
         response.on("data", (data) => {
            console.log(response.statusCode);            
         });  
    });
    request.write(jsonData);
    request.end();
    // console.log(Fname + " " + Lname + " " +imail);
});

app.post("/failure", (req,res) => {
    res.redirect("/");
});

 

app.listen(process.env.PORT || 3000, ()=> {
    console.log("I am a local server running @ port 3000 ");
});

//223687af9e77d0d649b37b7ae55840d5-us17

//list id
//


