let mongo=require("mongodb");
let {MongoClient}=require("mongodb");
// let mongoUrl="mongodb://127.0.0.1:27017";//url for mongodb
let mongoUrl="mongodb+srv://nehak:0P2klKEoZilWZ6R1@cluster0.dhoev48.mongodb.net/Playstation?retryWrites=true&w=majority"
let client=new MongoClient(mongoUrl)//help to connect

//to connect to mongodb
async function dbConnect(){
    await client.connect()
}

let db =client.db("Playstation");

async function getData(colName,query){
    let output=[];
    try{
        const cursor=db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
//output=await db.collection(colName).find(query).toArray()
    }catch(err){
        output.push({"Error":"Error in getData"})
    }
    return output
}

async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insertOne(data)
    }
    catch(err){
        output = {"response":"Error in postData"}
    }
    return output
}
async function updateOrder(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).updateOne(condition,data)
    } catch(err){
        output = {"response":"Error in update data"}
    }
    return output
}

async function deleteOrder(colName,condition){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition)
    } catch(err){
        output = {"response":"Error in delete data"}
    }
    return output
}

module.exports = {
    dbConnect,
    getData,
    postData,
    updateOrder,
    deleteOrder
}
