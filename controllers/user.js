const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const res = require('express/lib/response');

exports.user_Signup = async (req, res) => {
    let data = req.body;
    let { name, email, mobile, password } = data;
    let userData = { name, email, mobile, password }
    try {
        let user = await User.create(userData);
        return res.status(201).send(user)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    try {
        var user = await User.findOne({ email: email, password: password })
        if (!user) {
            return res.status(404).send({
                status: 'FAILED!!',
                message: 'incorrect credentials!!'
            })
        }
        let key = process.env.USER_SECRET_KEY;

        const token = jwt.sign({
            id: user._id
        }, key)
        return res.status(201).send({ token: token })


    } catch (e) {
        return res.status(500).send(e.message)
    }
};


const sendResetPassMail = async (fname, email, token) => {
    fname = User.fname;
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 79,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'for reset password',
            html: 'Hi ' + fname + ', please copy the link <a href="http://127.0.0.1:3000/resetPassword?token=' + token + '">and reset your password</a>'
        }

        console.log(mailOptions)

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
}


exports.forget_Password = async (req, res) => {
    let { email } = req.body;
    try {
        const userData = await User.findOne({ email: email })
        if (userData) {
            const randomString = randomstring.generate();
            const data = await User.updateOne({ email: email }, { $set: { token: randomString } })
            await sendResetPassMail(userData.fname, userData.email, randomString)
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
    let data = req.body;
    let Id = req.params.userId;
    try {
        const user = await User.findByIdAndUpdate(Id, { $set: data }, { new: true });
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Details = async (req, res) => {
    let Id = req.params.userId;
    try {
        const user = await User.findByIdAndRemove(Id);
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};
