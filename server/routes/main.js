const express = require('express');
const router = express.Router();
const Post = require("../models/Post")
const User = require("../models/User")
const path = require('path');
const {v4: uuidv4} = require('uuid');
const { setUserID } = require("../../service/auth")

router.get('',async (req,res) => {
    const perPage = 10;
    const currPage = req.query.page || 1;
    const cookies = req.headers.cookie;
    const username = cookies?.split(';').find(cookie => cookie.trim().startsWith('username='))?.split('=')[1] || 'Guest';
    const sessionID = cookies?.split(';').find(cookie => cookie.trim().startsWith('sessionID='))?.split('=')[1];
    console.log('Username:', username);
    const isLoggedIn = sessionID ? true : false;

    const locals = {
        title: "Blog",
        description: "A Node.js blog application"
    }

    try{
        const data = await Post.find().sort({createdAt: "desc"}).skip(perPage * currPage - perPage).limit(perPage);
        const count = await Post.countDocuments();
        const nextPage = parseInt(currPage) + 1;
        const hasNextPage = nextPage <= Math.ceil(count/perPage);
        res.render("index",{locals,data,currentPage: currPage, nextPage: hasNextPage ? nextPage : null,isLoggedIn,username});
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
            { title: new RegExp(noSpecialChar, 'i') },
            { body: new RegExp(noSpecialChar, 'i') }
        ]
    });

    res.render("search",{data});
})

router.get('/login',(req,res) => {
    const loginPath = path.join(__dirname, '..', '..', 'public','html', 'login.html');
    res.sendFile(loginPath);
})

router.post('/login',async (req,res) => {
    const { username, password } = req.body;
    const userFound = await User.findOne({username: username, password: password});

    if(userFound){
        const sessionID = uuidv4();
        const isLoggedIn = !!sessionID;
        setUserID(sessionID, userFound._id);
        res.cookie("sessionID", sessionID);
        res.cookie("username", userFound.username);
        res.redirect("/");
    }
    else{
        res.status(400).json({message: "Invalid credentials"});
    }
})

router.get('/register',(req,res) => {
    const registerPath = path.join(__dirname, '..', '..', 'public','html', 'register.html');
    res.sendFile(registerPath);
})

router.post('/register',async (req,res) => {
    const { username, email, password } = req.body;
    const userFound = await User.findOne({email: email});

    if(userFound){
        res.status(400).json({message: "User already exists"});
    }
    else{
        User.create({username,email,password});
        res.redirect("/login");
    }
})

router.get('/create', (req,res) => {
    res.render("create");
})

router.post('/add-post', async (req, res) => {
    console.log(req.body);
    const { titleCreate, contentCreate } = req.body;
    console.log(titleCreate, contentCreate);
    const post = await Post.create({
        title: titleCreate,
        body: contentCreate
    });
    req.flash('success',"Post created successfully");
    res.redirect("/");
});


module.exports = router;