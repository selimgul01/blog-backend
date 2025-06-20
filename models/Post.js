const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    subtitle:{ type: String, required: true },
    content:{ type: String, required: true },
    image:{ type: String, required: true },
    tags:{ type: String, required: true },
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
},{timestamps: true})


module.exports = mongoose.model("Post", postSchema)    
