const admin = require("./config/firebase-config");

class MiddleWare {
    async decodeToken(req, res, next) {

        if(!req.headers.authorization) {
            return res.json({ message: "Not authorized" });
        }

        const token = req.headers.authorization.split(" ")[1];

        try {
            const decodeValue = await admin.auth().verifyIdToken(token);

            if (decodeValue) {
                req.user = decodeValue;
                return next();
            } else {
                return res.json({ message: "Not authorized" });
            }
        } catch (error) {
            return res.json({ message: "Internal Error" });
        }
    }
}

module.exports = new MiddleWare();