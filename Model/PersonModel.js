const mongoose =require('mongoose')
const Person= mongoose.Schema({
    name :{type:String},

    age : {type:Number},
    
    favoriteFoods : {type:Array}
})
module.exports=mongoose.model('person',Person)