const express = require('express')
const urlRoute = require('./routes/url')
const { connectToMongoDB } = require('./connection')
const app = express();
const PORT = 5002;
// const URL = require('./models/url')


connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log('mongodb connected'))
.catch((err)=> console.log('err', err))

app.use(express.json())

app.use('/url', urlRoute)

// app.get('/:shortId', async(req,res) => {
//     const shortId = req.params.shortId;

//    const entry =  await URL.findOneAndUpdate({
//         shortId
//     },{
//         $push: {
//             visitHisotry: {
//                 timeStamp: Date.now(),
//             }
//         }
//     })

//     res.redirect(entry.redirectUrl)

// })

app.listen(PORT, ()=> console.log(`Server started at port: ${PORT} `))