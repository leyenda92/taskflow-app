var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var errorHandler = function (err, req, res, next) {
    console.error('Error:', err);
    var status = err.status || 500;
    var message = err.message || 'Internal Server Error';
    res.status(status).json(__assign({ error: message }, (process.env.NODE_ENV === 'development' && { stack: err.stack })));
};
export var notFoundHandler = function (req, res) {
    res.status(404).json({ error: 'Route not found' });
};
//# sourceMappingURL=errorHandler.js.map