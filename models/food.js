const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    }
})

const Food = mongoose.model("food", FoodSchema)

module.exports = {
  Food
}
