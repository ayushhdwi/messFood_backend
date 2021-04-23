const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    food: {
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
})

const User = mongoose.model("users", UserSchema)

module.exports = {
  User
}
