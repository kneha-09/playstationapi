let express = require("express");
let app = express();
let port = process.env.PORT || 3245;
let Mongo = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
let { dbConnect, getData, postData,updateOrder,deleteOrder } = require('./controller/dbController')

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hiii From express')
})

//page 1
app.get("/category", async (req, res) => {
    let query = {};
    let collection = "category";
    let output = await getData(collection, query);
    res.send(output)
})
app.get("/shoppingItem", async (req, res) => {
    let query = {};
    let collection = "shoppingItem";
    let output = await getData(collection, query);
    res.send(output)
})

//page 2
//get all one type item eg
app.get("/categoryItem", async (req, res) => {
    let query = {};
    if (req.query.categoryId && req.query.subCategoryId) {
        query = { categoryId: Number(req.query.categoryId), "subCategory.subCategoryId": Number(req.query.subCategoryId) }
    }
    else if (req.query.categoryId) {
        query = { categoryId: Number(req.query.categoryId) }

    }
    else {
        query = {}
    }
    let collection = "item";
    let output = await getData(collection, query);
    res.send(output)
})

app.get("/gameIdProduct", async (req, res) => {
    let query = {};
    if ( req.query.playableDeviceId && req.query.genreId) {
        query = {"playableDevice.playableDeviceId": Number(req.query.playableDeviceId) ,"Genre.genreId": Number(req.query.genreId) }
    }
    else if ( req.query.playableDeviceId) {
        query = {"playableDevice.playableDeviceId": Number(req.query.playableDeviceId) }
    }
    else if (req.query.genreId) {
        query = {  "Genre.genreId": Number(req.query.genreId) }
    }
    else if (req.query.gameId) {
        query = { gameId: Number(req.query.gameId) }

    }
    else {
        query = {}
    }
    let collection = "gameData";
    let output = await getData(collection, query);
    res.send(output)
})

// for game option
app.get("/products", async (req, res) => {
    let query = {};

    if (req.query.shoppingCategoryId && req.query.productId) {
        query = { shoppingCategoryId: Number(req.query.shoppingCategoryId), "products.productId": Number(req.query.productId) }
    }
    else if (req.query.shoppingCategoryId) {
        query = { shoppingCategoryId: Number(req.query.shoppingCategoryId) }
    }
    else {
        query = {}
    }
    let collection = "shoppingItem";
    let output = await getData(collection, query);
    res.send(output)
})


//page 3
app.get('/details/:id', async (req, res) => {
    let id = new Mongo.ObjectId(req.params.id)
    let query = { _id: id }
    let collection = "item";
    let output = await getData(collection, query);
    res.send(output)
})
// let id = Number(req.params.id);
// let query = {restaurant_id:id}
app.get('/menuitem/:id',async(req,res) => {
    let id = Number(req.params.id);
    let query = {categoryId:id};
    let collection = "item";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/shoppingProduct/:id', async (req, res) => {
    let id = Number(req.params.id);
    let query = { shoppingCategoryId: id };
    let collection = "shoppingItem";
    let output = await getData(collection, query);
    res.send(output)
})



// page 4
//product details {"id":[4,8,21]}
app.post('/productDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {id:{$in:req.body.id}};
        let collection = 'item';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
}) 

app.post('/placeOrder', async (req, res) => {
    let data = req.body;
    let collection = "orders";
    console.log(">>>", data)
    let response = await postData(collection, data)
    res.send(response)
})



// page 5//orders
app.get('/orders', async (req, res) => {
    let query = {};
    if (req.query.email) {
        query = { email: req.query.email }
    } else {
        query = {}
    }
    let collection = "orders";
    let output = await getData(collection, query);
    res.send(output)
})
//update
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})
app.listen(port, (err) => {
    dbConnect()
    if (err) throw err;
    console.log(`Server is running on port ${port}`)
})




// app.get('/filter/:playId',async(req,res)=>{
//     let playId=Number(req.params.playId);
//     // let playableDeviceId=Number(req.query.playableDeviceId);
//     let genreId=Number(req.query.genreId)

//     if(genreId){
//         query={
//         "playableDevice.playableDeviceId":playId,
//         "Genre.genreId":genreId
//         }  
//     }
//     else{
//         query={};
//     }
//     let collection="gameData";
//     let output= await getData(collection,query);
//     res.send(output)
// })
//details of selected item
// app.get('/details/:shoppingId', async(req,res) => {
//     let shoppingId = (req.params.shoppingId)
//     let productId=Number(req.query.productId);

//     if(productId){
//         query={
//             "shoppingCategoryId":shoppingId,
//             "products.productId":productId
//         }
//     }
//     else{
//             query={};
//         }
//     let collection = "shoppingItem";
//     let output = await getData(collection,query);
//     res.send(output)
// })



// app.get('/filter/:gameid', async (req, res) => {
//     let gameid = Number(req.params.gameid);
//     let playableDeviceId = Number(req.query.playableDeviceId);
//     let genreId = Number(req.query.genreId);

//     if (playableDeviceId) {
//         query = {
//             "gameId": gameid,
//             "playableDevice.playableDeviceId": playableDeviceId
//         }
//     }
//     else if
//         (genreId) {
//         query = {
//             "gameId": gameid,
//             "Genre.genreId": genreId
//         }
//     }
//     else {
//         query = {};
//     }
//     let collection = "gameData";
//     let output = await getData(collection, query);
//     res.send(output)
// })

// app.get("/games/:categoryId",async(req,res)=>{
//     let query={};
//     if(req.query.categoryId && req.query.genreId){
//         query={categoryId: Number(req.query.categoryId),"Genre.genreId": Number(req.query.genreId)}
//     }
//     else{
//         query = {}
//     }
//     let collection = "gameData";
//     let output = await getData(collection,query);
//     res.send(output)
// })

// app.get("/gameItem",async(req,res)=>{
//     let query={};
//     if(req.query.categoryId && req.query.playableDeviceId){
//         query={categoryId: Number(req.query.categoryId),"playableDevice.playableDeviceId": Number(req.query.playableDeviceId)}
//     }
//     else if(req.query.categoryId){
//         query={categoryId:Number(req.query.categoryId)}

//     }
//     else{
//         query = {}
//     }
//     let collection = "gameData";
//     let output = await getData(collection,query);
//     res.send(output)
// })