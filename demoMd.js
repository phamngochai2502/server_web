

import mongodb from 'mongodb';
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";
var ketqua ;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("tutorialMongoDB");
    var myobj = [
        { time: '20221129', temp: 60 , humidity : 78 , moisture : 150, tempSts : 15 , moistureSts : 10 },
        { time: '20221128', temp: 70 , humidity : 18 , moisture : 153, tempSts : 15 , moistureSts : 10 },
        { time: '20221127', temp: 50 , humidity : 28 , moisture : 120, tempSts : 15 , moistureSts : 10 },
        { time: '20221126', temp: 45 , humidity : 68 , moisture : 100, tempSts : 15 , moistureSts : 10 },
        { time: '20221125', temp: 34 , humidity : 89 , moisture : 89, tempSts : 15 , moistureSts : 10 },
        { time: '20221124', temp: 77 , humidity : 72 , moisture : 190, tempSts : 15 , moistureSts : 10 },
        { time: '20221123', temp: 28 , humidity : 38 , moisture : 90, tempSts : 15 , moistureSts : 10 },
        { time: '20221122', temp: 30 , humidity : 78 , moisture : 60, tempSts : 15 , moistureSts : 10 },
        { time: '20221121', temp: 15 , humidity : 18 , moisture : 46, tempSts : 15 , moistureSts : 10 },
        { time: '20221120', temp: 66 , humidity : 88 , moisture : 77, tempSts : 15 , moistureSts : 10 }

    ];
    //   dbo.collection("BatchProcessingTest").insertMany(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("Number of documents inserted: " + res.insertedCount);
    //     db.close();
    //   });
    // dbo.collection("customers").find({}).toArray(function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });

    dbo.collection("BatchProcessingTest")
        .find({})
        .project({ temp: 1, humidity: 1,moisture :1 })
        .sort({ $natural: -1 })
        .limit(10)
        .toArray(function (err, result) {
            if (err) throw err;  
            console.log(result[0].temp );
            db.close();
        });

   
});


