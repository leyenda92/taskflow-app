import jwt from 'jsonwebtoken';
export var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        var decoded = jwt.verify(token, 'secret');
        req.user = { id: decoded.id };
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
//# sourceMappingURL=auth.js.map