

import mongodb from 'mongodb';
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tutorialMongoDB");
    
    dbo.collection("farmStatus").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
   
});