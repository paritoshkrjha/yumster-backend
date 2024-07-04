import {Schema, model} from 'mongoose'

const postSchema = new Schema({  
    title : {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    description : {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000,
    },
    ingredients : [{
        type: String,
        required: true,
    }],
    steps : [{
        type: String,
        required: true,
    }],
    imageUrl : {
        type: String,
        default: './images/default-recipe.jpg',
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes : [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {timestamps:true})

const Post = model('Post', postSchema)

export default Post