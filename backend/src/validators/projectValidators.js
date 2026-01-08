import Joi from 'joi';
var projectSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).optional(),
});
export var validateCreateProject = function (req, res, next) {
    var _a, _b;
    var error = projectSchema.validate(req.body).error;
    if (error) {
        return res.status(400).json({ error: ((_b = (_a = error.details) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Validation error' });
    }
    next();
};
export var validateUpdateProject = function (req, res, next) {
    var _a, _b;
    var error = projectSchema.validate(req.body, { presence: 'optional' }).error;
    if (error) {
        return res.status(400).json({ error: ((_b = (_a = error.details) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || 'Validation error' });
    }
    next();
};
//# sourceMappingURL=projectValidators.js.map