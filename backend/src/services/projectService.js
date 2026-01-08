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
import { prisma } from '../config/database';
export var ProjectService = {
    getUserProjects: function (userId) {
        return prisma.project.findMany({ where: { userId: userId } });
    },
    getProjectById: function (id, userId) {
        return prisma.project.findFirstOrThrow({ where: { id: id, userId: userId } });
    },
    createProject: function (userId, data) {
        return prisma.project.create({ data: __assign(__assign({}, data), { userId: userId }) });
    },
    updateProject: function (id, userId, data) {
        return prisma.project.update({
            where: { id: id },
            data: data,
        });
    },
    deleteProject: function (id, userId) {
        return prisma.project.delete({ where: { id: id } });
    },
};
//# sourceMappingURL=projectService.js.map