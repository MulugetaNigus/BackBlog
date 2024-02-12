const mongoose = require("mongoose")

const BlogModel = mongoose.Schema( 
    {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        homeblog: {
            type: String,
            required: true
        },
        innerblog: {
            type: String,
            required: true
        },
        postedby: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    {
       timestamps: true
    }
)

const PostLooks = mongoose.model( "BlogPost" , BlogModel);
module.exports = PostLooks;