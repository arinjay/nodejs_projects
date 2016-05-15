var express = require('express');   // we are requiring a library for installing express

var morgan = require('morgan');    //shows logs in terminal
var mongoose = require ('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');

var app = express();               // app is refering to express objects.
                                   // we can also use express.listen

mongoose.connect('mongodb://root:qwerty@ds023052.mlab.com:23052/ecom',function(err){
      if(err) console.log(err);
      console.log('connected to database');

})


 //middleware
app.use(morgan('dev'));
app.use(bodyParser.json());  // now our express application could parse json data format
app.use(bodyParser.urlencoded({extended : true}));

/*app.get('/', function(req,res){    // app.get= server get me this '/'file     the function provide the funtionality
  res.json("just for checking ");  // example app.get('/home')....  localhost3000/home will give us output
});

app.get('/xy',function(req,res){
  res.json('fuck');
})
*/

app.post('/create-user',function(req,res){
   var user = new User();

   user.profile.name = req.body.name;
   user.password =req.body.password;
   user.email = req.body.email;

   user.save(function(err){
     if(err) next(err);

     res.json('succesfully created a new user');
   })

});


app.listen(3000, function(err){          // 3000 is port number
  if(err) throw err;
  console.log("Server is running on port 3000");

});
