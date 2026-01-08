var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
process.env.NODE_ENV = 'test';
import request from 'supertest';
import app from '../../src/index';
import { prisma } from '../../src/config/database';
describe('Projects API', function () {
    var authToken;
    var userId;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.project.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, request(app)
                            .post('/api/auth/register')
                            .send({
                            name: 'Test User',
                            email: 'test@test.com',
                            password: 'password123',
                        })];
                case 3:
                    response = _a.sent();
                    authToken = response.body.token;
                    userId = response.body.user.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.$disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('POST /api/projects', function () {
        test('should create project successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app)
                            .post('/api/projects')
                            .set('Authorization', "Bearer ".concat(authToken))
                            .send({ name: 'Test Project' })
                            .expect(200)];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toHaveProperty('id');
                        expect(response.body.name).toBe('Test Project');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return 400 for invalid project name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app)
                            .post('/api/projects')
                            .set('Authorization', "Bearer ".concat(authToken))
                            .send({ name: 'a' })
                            .expect(400)];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toHaveProperty('error');
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return 401 without token', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app)
                            .post('/api/projects')
                            .send({ name: 'Test Project' })
                            .expect(401)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('GET /api/projects', function () {
        test('should return user projects', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app)
                            .post('/api/projects')
                            .set('Authorization', "Bearer ".concat(authToken))
                            .send({ name: 'Project 1' })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, request(app)
                                .get('/api/projects')
                                .set('Authorization', "Bearer ".concat(authToken))
                                .expect(200)];
                    case 2:
                        response = _a.sent();
                        expect(response.body).toHaveLength(1);
                        expect(response.body[0].name).toBe('Project 1');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('DELETE /api/projects/:id', function () {
        test('should delete project successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createRes, projectId, projects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app)
                            .post('/api/projects')
                            .set('Authorization', "Bearer ".concat(authToken))
                            .send({ name: 'To Delete' })];
                    case 1:
                        createRes = _a.sent();
                        projectId = createRes.body.id;
                        return [4 /*yield*/, request(app)
                                .delete("/api/projects/".concat(projectId))
                                .set('Authorization', "Bearer ".concat(authToken))
                                .expect(200)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.project.findMany()];
                    case 3:
                        projects = _a.sent();
                        expect(projects).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
        test('should return 404 for non-existent project', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(app)
                            .delete('/api/projects/fake-id')
                            .set('Authorization', "Bearer ".concat(authToken))
                            .expect(404)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=auth.test.js.map