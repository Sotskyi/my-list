const mongoose = require('mongoose');
const schema= new mongoose.Schema({
    value:{
        type:String,
        trim:true,


    },
    
    createdAt:{


        type:Date,
        default:Date.now
    },

    listName:{
        type:String
        
    },
    listItems:{ type:Object}

})
module.exports = mongoose.model('lists', schema);