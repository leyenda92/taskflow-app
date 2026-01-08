import Joi from 'joi';
var registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
var loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
export var validateRegister = function (req, res, next) {
    var _a, _b;
    var error = registerSchema.validate(req.body).error;
    if (error) {
        return res.status(400).json({ error: ((_b = (_a = error.details) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Validation error' });
    }
    next();
};
export var validateLogin = function (req, res, next) {
    var _a, _b;
    var error = loginSchema.validate(req.body).error;
    if (error) {
        return res.status(400).json({ error: ((_b = (_a = error.details) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Validation error' });
    }
    next();
};
//# sourceMappingURL=authValidators.js.map