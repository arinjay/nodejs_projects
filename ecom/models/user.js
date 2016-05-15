var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs'); // is pass is abc    bcrypt will convert it into abc47564756767637
                                       // convert password in encrypted form

var Schema = mongoose.Schema;

/*  The user schema(blueprint) attributes /characterstics / fields  */
var UserSchema = new mongoose.Schema({
  email :{ type:String, unique: true , lowercase: true},
  password : String,
  profile:{
      name: {type:String, default:''},  // if someone donot enter name the default name will be
      picture: {type:String, default:''}
  },

  address:String,
  history: [{
    date : Date,
    paid : {type: Number,default:0},
  }]
});


/*  Hash the password before we even save it to database  */
          //pre is build in mongoose method
UserSchema.pre('save',function(next){  // previous save it to database
  var user = this;
  if(!user.isModifief('password')) return next();
  bcrypt.genSalt(10, function(err, salt){  //salt i result
   if(err) return next(err);
   bcrypt.hash(user.password, salt ,null, function(err,hash){
     if(err) return next(err);
     //hash = 75y5ty yt7ytytur   if  no error then
     user.password = hash;
     next();
   });
  });       // gensalt is going to generate 10 random data
});




/*  compare password in the database with the one that actually entered by user  */

       // for creating custom method use .methods
UserSchema.methods.comparePassword= function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports= mongoose.model('User',UserSchema);  //exports whole code to mongoose
