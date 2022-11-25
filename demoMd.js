

import mongodb from 'mongodb';
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tutorialMongoDB");
    var myobj = [
        { name: 'John', address: 'Highway 71' },
        { name: 'Peter', address: 'Lowstreet 4' },
        { name: 'Amy', address: 'Apple st 652' },
        { name: 'Hannah', address: 'Mountain 21' },
        { name: 'Michael', address: 'Valley 345' },
        { name: 'Sandy', address: 'Ocean blvd 2' },
        { name: 'Betty', address: 'Green Grass 1' },
        { name: 'Richard', address: 'Sky st 331' },
        { name: 'Susan', address: 'One way 98' },
        { name: 'Vicky', address: 'Yellow Garden 2' },
        { name: 'Ben', address: 'Park Lane 38' },
        { name: 'William', address: 'Central st 954' },
        { name: 'Chuck', address: 'Main Road 989' },
        { name: 'Viola', address: 'Sideway 1633' }
    ];
    //   dbo.collection("customers").insertMany(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("Number of documents inserted: " + res.insertedCount);
    //     db.close();
    //   });
    // dbo.collection("customers").find({}).toArray(function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    dbo.collection("customers").find({}, { projection: { _id: 1, name: 1, address: 1 } }).toArray(function (err, result) {
        if (err) throw err;
        for (obj in result) {
            console.log(result[obj].name);
            // console.log(obj);
        }
        // console.log(result);
        db.close();
    });
});