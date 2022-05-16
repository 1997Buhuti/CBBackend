const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const saltRounds=6;
const adminUserSchema = new Schema({
    email: String,
    password: String,
    teacherId:String
});

adminUserSchema.pre('save',function(next){
    let user=this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) throw err;
            else {
                bcrypt.hash(user.password, salt,function(err,hash){
                    if(err) return next(err);
                    user.password = hash;
                    next();
                })
            }
        })
    }
    else{
        next();
    }
});

adminUserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
};

module.exports = mongoose.model('adminUser', adminUserSchema);
