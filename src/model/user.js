const mongoose = require('../database')



const UserSchema = new mongoose.Schema({
   
    user: {
        type: String,
        unique: true,
        required: true,

    },
    senha: {
        type: String,
        required: true,
        select: false,
    }
    
    
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

   



const User = mongoose.model('User', UserSchema );
 module.exports = User;