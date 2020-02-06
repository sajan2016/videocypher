var express = require('express');
var router = express.Router();
var videos=require("../controllers/videos.server.controller")

router.post('/',videos.storeVideos);
router.get('/',videos.getAllVideos);
router.get('/category/:id',videos.getVideosByCategoryId);
router.get('/:id',videos.getVideosById);

module.exports = router;
