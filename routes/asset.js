const express = require('express');
const router = express.Router();

const assetController = require('../controller/asset');
const {body} = require('express-validator')


router.post('/add-asset',[

    body('title').trim().isLength({min:5}),
    body('link').trim().not().isEmpty()
],assetController.addAsset);

router.get('/asset',assetController.getAsset)
module.exports  = router; 