const express = require('express');
const router = express.Router();

router.get('',(req,res) => {
    const locals = {
        title: "Blog",
        description: "A Node.js blog application"
    }

    res.render("index",locals)
})


module.exports = router;