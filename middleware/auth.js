const jwt = require('jsonwebtoken');

exports.userAuth = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key'];
        if (!token) {
            return res.status(400).send('please input token!!')
        };
        let key = process.env.USER_SECRET_KEY;

        let decodedToken = jwt.verify(token, key)
        if (!decodedToken) {
            return res.status(400).send('invailid token!!')
        };

        req.loggedInUser = decodedToken.userId
        next()

    } catch (e) {
        return res.status(500).send(e.message)
    };
};

exports.sellerAuth = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key'];
        if (!token) {
            return res.status(400).send('please input token!!')
        };
        let key = process.env.SELLER_SECRET_KEY;

        let decodedToken = jwt.verify(token, key)
        if (!decodedToken) {
            return res.status(400).send('invailid token!!')
        };

        req.loggedInUser = decodedToken.userId
        next()

    } catch (e) {
        return res.status(500).send(e.message)
    };
};