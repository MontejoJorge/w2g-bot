
const homeGet = (req, res = response) => {
    res.render("home", {
        user: req.user
    })
}

module.exports = {
    homeGet
}