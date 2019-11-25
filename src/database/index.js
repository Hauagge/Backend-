const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Haus:123123123@cluster0-ucsnb.mongodb.net/LawSollutT?retryWrites=true&w=majority',{ 

    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;

module.exports = mongoose;