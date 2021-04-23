const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    reg: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required:true
    }
})

const Student = mongoose.model("student", StudentSchema)

module.exports = {
  Student
}
