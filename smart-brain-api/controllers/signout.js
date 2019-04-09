const redisClient = require('./signin').redisClient;

const handleSignout = (req, res) => {
    const { authorization } = req.headers;
    redisClient.del(authorization, (err, response) => {
        if (err || !response) {
            return res.status(500).json('Can not delete the session');
        }
        return res.status(200).json({success: true});
    })
}

module.exports = {
    handleSignout
}