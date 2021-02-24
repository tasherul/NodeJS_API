//const bcrypt = require('bcrypt');
const Question = require('../models/Question');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const QuestionModel = require('../models/Question');
const UserModel = require('../models/user');
const { count } = require('../models/Question');
const uuid = require('uuid-random');


exports.Get_All_Questions = (req, res, next) => {
    //var query = { IsActive: true };
    //var __token_data = jwt.verify(req.body.token, process.env.JWT_TOKEN_KEY);
    QuestionModel.aggregate([
        {
            $lookup: {
                from: "users",
                as: "users",
                let: { id: "$CreatedBy" },
                pipeline: [
                    { $match: { $expr: { $eq: ['$id', '$$id'] } } }
                ]
            }
        },
        {
            $project: {
                ID:1,
                Uuid:1,
                question:1,
                CreatedBy:1,
                IsActive:1,
                users:1
            }
        }
    ]).exec((err, result) => {
        if (err) {
            res.status(400).json({
                return: false,
                message: err
            })
        }
        if (result) {
            res.status(200).json({
                return: result.map(doc=>{
                   return{
                       id:doc.ID,
                       uuid:doc.Uuid,
                       question:doc.question,
                       createdby:doc.users[0].FirstName+' '+doc.users[0].LastName,
                       active:doc.IsActive==true?'Active':'Inactive'
                   }
                }),
                message: "Successfully find(" + result.length + ") Data."
            });
        }
    });

    // QuestionModel.find(query).select("ID Uuid question CreatedBy").exec().then(data => {

    //     // UserModel.findById({id:data[0].CreatedBy}).exec().then(userName=>{
    //     // })
    //     res.status(200).json({
    //         return: data,
    //         message: "Successfully find(" + data.length + ") Data."
    //     });
    // }).catch(err => {

    //     console.log(err);
    //     res.status(500).json({
    //         return: false,
    //         message: "Error: " + err
    //     });

    // });
};

exports.Set_Questions = (req, res, next) => {

    QuestionModel.find().count((err, count) => {

        var NewID = count + 1;

        var __token_data = jwt.verify(req.body.token, process.env.JWT_TOKEN_KEY);
        const QuestionData = new QuestionModel({
            _id: new mongoose.Types.ObjectId(),
            ID: NewID,
            question: req.body.question,
            IsActive:req.body.isactive,
            CreatedBy: __token_data.id,
            Uuid: uuid()
        });

        QuestionData.save().then(result => {
            console.log(result);
            res.status(200).json({
                return: true,
                message: "Succesfully Question Create",
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                return: false,
                message: "Error: " + err + " data: " + NewID,
            });
        });

    });


};

exports.Update_Questions = (req, res, next) => {
    var __token_data = jwt.verify(req.body.token, process.env.JWT_TOKEN_KEY);
    const _updateData = {
        question: req.body.question,
        IsActive:req.body.isactive,
        UpdatedAt: Date.now(),
        UpdatedBy: __token_data.id
    };
    QuestionModel.update({ Uuid: req.body.Uuid }, { $set: _updateData })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                return: true,
                message: "Successfully Question Update"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                return: false,
                message: "Error: " + err
            });
        });
};

exports.Delete_Questions = (req, res, next) => {
    //var __token_data = jwt.verify(req.body.token, process.env.JWT_TOKEN_KEY);
    const _deleteData = {
        IsActive: false
    };
    QuestionModel.findOneAndDelete({ Uuid: req.body.Uuid })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                return: true,
                message: "Successfully Question Deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                return: false,
                message: "Error: " + err
            });
        });
};

exports.Get_Questions_Details = (req, res, next) => {

    var query = { Uuid: req.body.Uuid };
    QuestionModel.find(query).select("ID Uuid question CreatedBy IsActive").exec().then(data => {
        res.status(200).json({
            return: data,
            message: "Successfully find(" + data.length + ") Data."
        });
    }).catch(err => {

        console.log(err);
        res.status(500).json({
            return: false,
            message: "Error: " + err
        });

    });

};