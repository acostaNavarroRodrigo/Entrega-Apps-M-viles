const mongo = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

function addPersona(){
    mongo.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, client)=>{
        if(err){
            console.log(err);
            return;
        }

        const db = client.db('prueba');
        const collection = db.collection('personas');

        collection.insertOne({_id:0, nombre: 'Rodrigo', apellido: 'Acosta', ci: '12345678'},(err,result)=>{
            if(err){
                console.log(err);
                result;
            }
            result
        });
    
        collection.insertOne({_id:1,nombre: 'Pepe', apellido: 'Rodriguez', ci: '87654321'},(err,result)=>{
            if(err){
                console.log(err);
                result;
            }
            client.close();
        });

        
    })

    
}

function deleteCollection(){
    mongo.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, client)=>{
        if(err){
            console.log(err);
            return;
        }

        const db = client.db('prueba');
        db.collection('personas').drop(function(err,del){
            if(err){
                console.log(err);
            }
            if(del){
                console.log("collection deleted");
            }
            client.close();
        })
        
    })
}
//deleteCollection();
//addPersona();
const findAndPrint= async ()=>{
    var items;

    mongo.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
        }, (err, client)=>{
        if(err){
            console.log(err);
            return;
        }
    
        const db = client.db('prueba');
        const collection = db.collection('personas');
    
        const find = async () =>{
            try{
                const items = await collection.find().toArray();
                console.log(items);
                client.close();
            }catch (err){
                console.log(err)
            }
        }
        find();
    
        
    })
}

//findAndPrint();

module.exports.find = findAndPrint;
module.exports.add = addPersona;
module.exports.delete = deleteCollection;
