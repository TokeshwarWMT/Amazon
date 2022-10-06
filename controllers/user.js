require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uploadFile = require('./awsController');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const res = require('express/lib/response');

exports.user_Signup = async (req, res) => {
    try {
        let data = req.body;
        let files = req.files;
        let { profileImage, name, email, mobile, password } = data;

        // const profilePicture = await uploadFile(files[0])
        const salt = await bcrypt.genSalt(10);
        const encryptedPass = await bcrypt.hash(password, salt)
        let userData = { name: name, email: email, mobile: mobile, password: encryptedPass }
        let user = await User.create(userData);
        return res.status(201).send(user)
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
};


exports.login = async (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;

    try {
        var user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).send({ message: 'incorrect email!!' })
        };

        const password = user.password;
        let passMatch = await bcrypt.compare(pass, password)
        let key = process.env.USER_SECRET_KEY;

        if (passMatch) {
            const token = jwt.sign({
                id: user._id
            }, key)
            res.status(201).send({ token: token })
        } else {
            return res.status(400).send('incorrect password!!')
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


const sendResetPassMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 25,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'for reset password',
            html: 'Hi ' + name + ', please copy the link <a href="http://127.0.0.1:3000/reset_Password?token=' + token + '">and reset your password</a>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email has been send', info.response)

            }
        })

    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.forget_Password = async (req, res) => {
    let { email } = req.body;
    try {
        const userData = await User.findOne({ email: email })
        if (userData) {
            const randomString = randomstring.generate();
            const data = await User.updateOne({ email: email }, { $set: { token: randomString } })
            await sendResetPassMail(userData.name, userData.email, randomString)
            return res.status(201).send('please check you mail!!')
        } else {
            return res.status(404).send({
                status: 'FAILED!!',
                message: 'email does not exist!!'
            })
        }
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.reset_Password = async (req, res) => {
    let { token } = req.query;
    try {
        const tokenData = await User.findOne({ token: token })
        if (tokenData) {

            const password = req.body;
            const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: password }, { new: true })
            return res.status(200).send({ message: 'user password has been reset!!', data: userData })
        } else {
            return res.status(200).send('this link has been expired!!')
        }
    } catch (error) {
        return res.status(500).send(e.message)
    }
};


exports.update_Details = async (req, res) => {
    // let userIId = req.params.userIId;
    let data = req.body;
    let userId = req.params.userId;
    if (userId !== req.loggedInUser.id) {
        return res.status(401).send('unauthorized access!!')
    };
    try {
        const user = await User.findByIdAndUpdate(userId, { $set: data }, { new: true });
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
};


exports.delete_Details = async (req, res) => {
    let userId = req.params.userId;
    if (userId !== req.loggedInUser.id) {
        return res.status(401).send('unauthorized access!!')
    }
    try {
        const user = await User.findByIdAndRemove(userId);
        if (!user) {
            return res.status(200).send('user data already deleted!!')
        }
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};
