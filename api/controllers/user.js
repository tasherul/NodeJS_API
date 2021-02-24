const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.login_user = (req,res,next) => {
    User.find({ UserName: req.body.UserName })
    .exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                return: false,
                message: 'UserName/ Password Invalid !'
            });
        }
        bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    return: false,
                    message: 'Error: ' + err
                });
            }
            if (result) {
                const token = jwt.sign({
                    FirstName: user[0].FirstName,
                    LastName: user[0].LastName,
                    UserName: user[0].UserName,
                    id: user[0].id
                },
                    process.env.JWT_TOKEN_KEY,
                    {
                        expiresIn: "10h"
                    }
                );
                return res.status(200).json({
                    return: token,
                    message: 'Successfully Login.'
                });
            }
            return res.status(401).json({
                return: false,
                message: 'UserName/ Password Invalid !'
            });
        })
    }).catch(err => {
        res.status(500).json({
            return: false,
            message: 'Error' + err
        });
    });
};
exports.token_to_data =(req,res,next)=>{
    var __token_data = jwt.verify(req.body.token, process.env.JWT_TOKEN_KEY);
    res.status(200).json({
        name:__token_data.FirstName+' '+ __token_data.LastName,
        id:__token_data.id
    });
};
exports.Signup_user = (req,res,next)=>{

    User.find({ UserName: req.body.UserName })
    .exec()
    .then(user => {
        //-------- find username 
        if (user.length >= 1) { return res.status(409).json({ return: false, message: 'User Name Exists. Try Another' }) }
        else {

            //---------------- insert user ------------------------------
            bcrypt.hash(req.body.Password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new User({
                        id: new mongoose.Types.ObjectId(),
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        UserName: req.body.UserName,
                        Password: hash
                    });

                    user.save().then(result => {

                        const token = jwt.sign({
                            FirstName: user.FirstName,
                            LastName: user.LastName,
                            UserName: user.UserName,
                            id: user.id
                        },
                            process.env.JWT_TOKEN_KEY,
                            {
                                expiresIn: "10h"
                            }
                        );
                        
                        res.status(200).json({
                            return: token,
                            massage: 'User Create Succesfully.'
                        });
                    })
                        .catch(err => {
                            console.log(err);
                        })

                }
            });
        }//end else 


    })
    .catch(err => {
        res.status(500).json({
            return: false,
            message: 'Error: ' + err
        });
    })

};
