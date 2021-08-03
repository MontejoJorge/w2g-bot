const isAuth = ( req, res, next ) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({
        msg: "You need to login before show your dashboard"
    });
}

module.exports = {
    isAuth
}