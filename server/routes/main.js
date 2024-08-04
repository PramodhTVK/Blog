const express = require('express');
const router = express.Router();
const Post = require("../models/Post")

router.get('',async (req,res) => {
    const perPage = 10;
    const currPage = req.query.page || 1;

    const locals = {
        title: "Blog",
        description: "A Node.js blog application"
    }

    try{
        const data = await Post.find().sort({createdAt: "desc"}).skip(perPage * currPage - perPage).limit(perPage);
        const count = await Post.countDocuments();
        const nextPage = parseInt(currPage) + 1;
        const hasNextPage = nextPage <= Math.ceil(count/perPage);
        res.render("index",{locals,data,currentPage: currPage, nextPage: hasNextPage ? nextPage : null});
    }
    catch(err){
        console.log(err);
    }
    
})

router.get('/article/:id', async (req,res) => {
    try{
        const slugID = req.params.id;
        const data = await Post.findById(slugID);
        res.render("post",{data});
    }
    catch(err){
        console.log(err);
    }
})

router.get('/search',async (req,res) => {
    const searchTerm = req.query.searchTerm;
    const noSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
        $or: [
            { title: new RegExp(searchTerm, 'i') },
            { body: new RegExp(searchTerm, 'i') }
        ]
    });

    res.render("search",{data});
})

const insertDummyPost = () => {
    const dummyPosts = [
        {
            title: "NodeJs Blog",
            body: "This is a blog post about Node.js"
        },
        {
            title: "React Blog",
            body: "This is a blog post about React"
        },
        {
            title: "MongoDB Blog",
            body: "This is a blog post about MongoDB"
        },
        {
            title: "Express Blog",
            body: "This is a blog post about Express"
        },
        {
            title: "JavaScript Blog",
            body: "This is a blog post about JavaScript"
        },
        {
            title: "A blog on Generative AI. A comprehensive case study on current state of LLMs",
            body: "This is a blog post about Generative AI"
        },
        {
            title: "A blog on the future of AI",
            body: "This is a blog post about the future of AI"
        },
        {
            title: "A blog on the future of AI",
            body: "This is a blog post about the future of AI"
        },
        {
            title: "ChatGPT and its use cases",
            body: "ChatGPT is a powerful tool for generating human-like text. This blog post explores its use cases.It has taken the world by storm ever since its first introduction in 2020. It has been used in a variety of applications, from generating human-like text to creating chatbots. In this blog post, we will explore some of the use cases of ChatGPT and how it has revolutionized the field of natural language processing."
        },
        {
            title: "NodeJs limiting the network traffic",
            body: "Learn how to limit the network traffic in Node.js. This blog post will show you how to use the rate-limiter-flexible package to limit the number of requests to your server. You will also learn how to use the express-rate-limit middleware to limit the number of requests per IP address. By the end of this blog post, you will have a better understanding of how to protect your Node.js server from abuse and ensure that it remains responsive to legitimate users."
        }
    ]
    Post.insertMany(dummyPosts);
}

insertDummyPost();


module.exports = router;