const mongoose =require('mongoose')
const Person=require('./models/PersonModel')

mongoose.connect('mongodb://localhost:27017/first_mongo',{ useNewUrlParser: true, useUnifiedTopology: true },(er)=>{
    if(er){
        console.log(er)
    }else {console.log("connected to db")}
})
/////Create a person having this prototype:
 let person=new Person({
    name:"mohamed",
    age:28,
     favoriteFoods:["viande"]
 })

 ////Create and Save a Record of a Model:

 person.save((er,data)=>{
     if(er){
         console.log(er)
     }else{
         console.log(data)
    }

 })

 //////Create Many Records with model.create()

Person.create([{name:"foulen",age:20,favoriteFoods:["pain"]},{name:"houssem",age:18,favoriteFoods:['poisson']}])


////////Use model.find() to Search Your Database
Person.find().then(resultat=>console.log(resultat)).catch(er=>console.log(er))

//////Use model.findOne() 

Person.findOne({name:"foulen"}).then(resultat=>console.log(resultat)).catch(er=>console.log(er))

///////Use model.findById()1 
Person.findById("5f45172fbcc1051a480b5f7b").then(resultat=>console.log(resultat)).catch(er=>console.log(er))

///////////Use model.findById()2 
Person.findOneAndUpdate(
    {
        favoriteFoods:'poisson'
    },
    {
    favoriteFoods:'hamburger'
    },
    {
        new: true,                       
        runValidators: true              
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })

  
  ///////Updates by Running Find, Edit, then Save
  let findEditThenSave= function(PersonId){
      let fotToAdd='humburger';
      PersonId.findById('5f45172ebcc1051a480b5f7a',function(err,data){
        
          if (err){
              return console.log(err);
          }
          else{
               
         data.favoriteFoods.push(fotToAdd)
         data.save();
         
              console.log(data)
          }
      })
  }
  findEditThenSave(Person)

  ///////New Updates on a Document Using model.findOneAndUpdate()
let findAndUpdate = function(personName) {


    Person.findOneAndUpdate(
      {name:personName},{$set: {age:20}},{returnNewDocument : true}, 
      function(err, doc){
                        if(err){
                            console.log("unmodified object!");
                        }
                        console.log(doc);
  })};

  findAndUpdate("houssem")




 ///////// Using model.findByIdAndRemove
 let removeById = function(PersonId,done) {
    PersonId.findByIdAndRemove('5f451968fc61a809b01b669c', (err, data) => err ? done(err) : done(null, data));
 }
removeById(Person,(er,data)=>{if(er){console.log(er)}else{console.log(data)}})


  let removeManyPeople = function(done) {
   
    Person.deleteMany({name: "houssem"}, function(err, data) {
      if (err) {
        done(err);
      } else {
        done(null, data);
      }
    });
  };

  ////////Delete Many Documents with model.remove()
  removeManyPeople((er,data)=>{if(er){console.log(er)}else{console.log(data)}})



 ////////////////////////////// Chain Search Query Helpers to Narrow Search Results
  let queryChain = function(done) {
   
    Person.find({favoriteFoods: ["pain"]})
            .sort({name: "asc"})
            .limit(2)
            .select({age: 0})
            .exec((err, data) => err ? done(err) : done(null, data));
  };
      
        queryChain((er,data)=>{if(er){console.log(er)}else{console.log(data)}})