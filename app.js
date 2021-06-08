const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
const mongoose = require('mongoose')

const Razorpay = require('razorpay')
const shortid = require('shortid') 

const User = require("./models/discuss").User
const Food = require("./models/food").Food
const Student = require("./models/student").Student


app.use(cors())


app.use(
    bodyParser.urlencoded({
        extended: false
    }));

app.use(bodyParser.json())

mongoose.connect("MONGO_ATLAS_API_KEY_URL",
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => {
        console.log("MongoDB successfully connected");
    })
    .catch((err) => {
        console.log(err);
    });


app.use(express.static('./'))


app.post('/addComment', (req, res) => {

    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        food: req.body.food.toUpperCase(),
        comment: req.body.comment
    })

    user.save((err, user) => {
        if (err) next(err)
        else res.send(user)
    })

})

app.get('/getAllComment', (req, res) => {

    User.find({}, (err, user) => {
        if (err) next(err)
        else res.send(user)
    })
})

app.post('/searchComment', (req, res) => {

    User.find({ food: req.body.food.toUpperCase() }, (err, user) => {
        if (err) next(err)
        else res.send(user)
    })

})

app.post('/storeFavFood', (req, res) => {

    var food = new Food({
        name: req.body.name.toUpperCase(),
        description: req.body.description,
        image: req.body.image
    })

    food.save((err, user) => {
        if (err) next(err)
        else res.send(user)
    })

})

app.get('/getFavFood', (req, res) => {


    Food.find({}, (err, user) => {
        if (err) next(err)
        else res.send(user)
    })

})

app.post('/registerStudent', (req, res) => {

    var student = new Student({
        reg: req.body.reg,
        name: req.body.name,
        block: req.body.block
    })

    student.save((err, user) => {
        if (err) next(err)
        else res.send(user)
    })

})

app.get('/registerStudent', (req, res) => {

    Student.find({},(err, user) => {
        if (err) next(err)
        else res.send(user)
    })

})

const razorpay =  new Razorpay({
    key_id: 'rzp_live_mxSLM380R7w6zX', //add your razorpay account details
    key_secret: 'TeyEvMZmluvlTCbhCRHHUOIL'
})


app.get('/razorpay',(req,res)=>{

    const payment_capture=1
    const amount =1 //change this amount

    const options ={
        amount:(amount*100),
        currency:'INR',
        receipt:shortid.generate(),
        payment_capture
    }

    razorpay.orders.create(options)
    .then(result=>{
        console.log(result)
        res.json({
            id: result.id,
            currency: result.currency,
            amount:(result.amount/100)
        })

    })
})



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));