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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import bcrypt from 'bcrypt';
import { loginSchema, signUpSchema } from '../schemas/auth-schema.js';
import jwt from 'jsonwebtoken';
import { insertNewUser, loginNewUserSession, searchUserByEmail, } from '../repositories/auth-repository.js';
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, email, password, error, messages, hashedPassword, searchedUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                    error = signUpSchema.validate(req.body, { abortEarly: false }).error;
                    if (error) {
                        messages = error.details.map(function (err) { return err.message; }).join('\n');
                        return [2 /*return*/, res
                                .status(422)
                                .send("Os seguintes erros foram encontrados:\n\n".concat(messages))];
                    }
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 1:
                    hashedPassword = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, searchUserByEmail(email)];
                case 3:
                    searchedUser = _b.sent();
                    if (searchedUser.rows.length > 0) {
                        return [2 /*return*/, res
                                .status(409)
                                .send('O e-mail informado j?? existe.\nPor gentileza, revise os dados')];
                    }
                    insertNewUser(name, email, hashedPassword);
                    res.sendStatus(201);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    res.status(500).send(error_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function signIn(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, email, password, error, messages, searchedUser, userPass, userId, isValid, config, token, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = req.body, email = _c.email, password = _c.password;
                    error = loginSchema.validate(req.body, { abortEarly: false }).error;
                    if (error) {
                        messages = error.details.map(function (err) { return err.message; }).join('\n');
                        return [2 /*return*/, res.status(422).send("Ocorreram os seguintes erros:\n\n".concat(messages))];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, searchUserByEmail(email)];
                case 2:
                    searchedUser = _d.sent();
                    userPass = (_a = searchedUser.rows[0]) === null || _a === void 0 ? void 0 : _a.password;
                    userId = (_b = searchedUser.rows[0]) === null || _b === void 0 ? void 0 : _b.id;
                    return [4 /*yield*/, bcrypt.compare(password, userPass)];
                case 3:
                    isValid = _d.sent();
                    if (searchedUser.rows.length === 0 || !isValid) {
                        return [2 /*return*/, res
                                .status(422)
                                .send('O e-mail ou a senha informados est??o incorretos.\nPor gentileza, verifique os dados e tente novamente')];
                    }
                    config = { expiresIn: 60 * 45 };
                    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, config);
                    loginNewUserSession(userId, token);
                    res.status(200).send(token);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _d.sent();
                    return [2 /*return*/, res.status(500).send(error_2.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export { signIn, signUp };
