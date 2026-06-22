const express = require('express');
const router = express.Router();

const assetController = require('../controller/asset');
const {body} = require('express-validator')


router.post('/add-asset',[

    body('title').trim().isLength({min:5}),
    body('link').trim().not().isEmpty()
],assetController.addAsset);

router.get('/asset',assetController.getAsset)

router.put('/update-post/:id',
    [
        body('title').trim().isLength({min:5}),
        body('link').trim().not().isEmpty()
    ],
    assetController.updatePost);

router.delete('/delete/:id',assetController.delete); 
module.exports  = router; 
