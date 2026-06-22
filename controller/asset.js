const Asset = require('../models/assets');

const {validationResult} = require('express-validator');

exports.addAsset = (req,res,next) =>{

    const link = req?.body?.link;
    const category = req?.body?.category;
    const title = req?.body?.title;
    const subCategory = req?.body?.subCategory;
    const frameWork = req?.body?.frameWork;
    const shortURL = req?.body?.shortURL;
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
        subCategory: subCategory,
        shortURL: shortURL
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
    
    Asset.find().sort({createdAt:-1}).then(result=>{
        res.status(200).json({
            assets: result
        })
    })
    .catch(err => console.log(err))
}


exports.delete = (req,res,next) =>{
    const id = req.params.id;
    console.log('id',id)
    Asset.deleteOne({_id: id}).then(result=>{
        console.log(result)
        console.log('deleted successfully')
        return res.status(200).json({"message":'Article deleted successfully'})
    }).catch(err => {
        console.log('inside catch');
        const error = new Error('No results found for this post');

          next(error)
    
        }
    )
}

exports.updatePost = (req,res,next) =>{
    const id = req.params.id;
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

    Asset.updateOne(
        {_id: id},
        {$set:{title:title,link:link,category: category,subCategory: subCategory,framework: frameWork}}

    )
    .then((result)=>{
        console.log(result)
        return res.status(201).json({message:"Post updated successfully!!"})
    })
    .catch(err =>{
        next(err)
    })
}
