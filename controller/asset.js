const Asset = require('../models/assets');

const {validationResult} = require('express-validator');

exports.addAsset = (req,res,next) =>{

    const link = req?.body?.link;
    const category = req?.body?.category;
    const title = req?.body?.title;
    const subCategory = req?.body?.subCategory;
    const frameWork = req?.body?.frameWork;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const error = new Error('Invalid data');
        error.statusCode = 500;
        console.log(errors)
        return res.status(500).json({message:'Invalid data',errors: errors})  

        // throw error;
    }
    console.log('title',title)
    const newAsset = new Asset({
        title: title,
        link: link,
        frameWork: frameWork,
        category: category,
        subCategory: subCategory
    });

    newAsset.save().then(result =>{
        console.log('Asset saved')
        return res.status(201).json({
            message:'Asset added successfully'
        })
    })
    .catch(err=> console.log(err))

}

exports.getAsset = (req,res,next) =>{
    const {category,subCategory,frameWork} = req.query;
    
    console.log(category,subCategory)
    
    Asset.find().then(result=>{
        res.status(200).json({
            assets: result
        })
    })
    .catch(err => console.log(err))
}