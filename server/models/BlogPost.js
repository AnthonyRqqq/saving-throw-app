const { Schema, model } = require("mongoose");

const blogPostSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  notes: {
    type: Array,
  },
});

const BlogPost = model("BlogPost", blogPostSchema);

module.exports = BlogPost;
