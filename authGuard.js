const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
    // Check is the token is present in header
    if (req.headers.authorization) {
        // Check if the token is valid
        let valid = jwt.verify(req.headers.authorization, "}QF_w,(<u7BBt>V}");
        if (valid) {
            req.userid = valid.id
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    } else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }

}

module.exports = { authGuard };