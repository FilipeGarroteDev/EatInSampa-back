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
import { newRestaurantSchema } from '../schemas/restaurants-schema.js';
import { changeRestaurantData, getAllRestaurants, insertNewRestaurant, removeExistentRestaurant, searchCategoryById, searchRestaurantById, searchRestaurantByName, } from '../repositories/restaurants-repository.js';
import { removeExistentRating, searchSpecificRating } from '../repositories/ratings-repository.js';
function listRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allRestaurants, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getAllRestaurants()];
                case 1:
                    allRestaurants = _a.sent();
                    return [2 /*return*/, res.status(200).send(allRestaurants.rows)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.status(500).send(error_1.message)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function insertRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, categoryId, error, userId, messages, hasName, hasCategory, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, categoryId = _a.categoryId;
                    error = newRestaurantSchema.validate(req.body, {
                        abortEarly: false
                    }).error;
                    userId = res.locals.userId;
                    if (error) {
                        messages = error.details.map(function (err) { return err.message; }).join('\n');
                        return [2 /*return*/, res.status(422).send("Ocorreram os seguintes erros:\n\n".concat(messages))];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, searchRestaurantByName(name)];
                case 2:
                    hasName = _b.sent();
                    return [4 /*yield*/, searchCategoryById(categoryId)];
                case 3:
                    hasCategory = _b.sent();
                    if (hasName.rows.length > 0) {
                        return [2 /*return*/, res
                                .status(409)
                                .send('Já existe um restaurante com esse nome. Escolha outro ou avalie o já existente.')];
                    }
                    else if (hasCategory.rows.length === 0) {
                        return [2 /*return*/, res
                                .status(422)
                                .send('O id informado não corresponde a nenhuma categoria existente. Por gentileza, revise os dados')];
                    }
                    insertNewRestaurant(name, categoryId, userId);
                    return [2 /*return*/, res.sendStatus(201)];
                case 4:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.status(500).send(error_2.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function deleteRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, userId, hasRestaurant, hasRatings, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Number(req.params.id);
                    userId = res.locals.userId;
                    if (isNaN(id)) {
                        return [2 /*return*/, res
                                .status(422)
                                .send('O id informado não é válido. Revise-o e tente novamente.')];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, searchRestaurantById(id)];
                case 2:
                    hasRestaurant = _a.sent();
                    if (hasRestaurant.rows.length === 0) {
                        return [2 /*return*/, res
                                .status(400)
                                .send('Não existe restaurante com o id informado. Revise-o e tente novamente.')];
                    }
                    if (hasRestaurant.rows[0].creatorId !== userId) {
                        return [2 /*return*/, res
                                .status(400)
                                .send('Esse usuário não foi quem inseriu o restaurante e, portanto, não pode deletá-lo')];
                    }
                    return [4 /*yield*/, searchSpecificRating(userId, id)];
                case 3:
                    hasRatings = _a.sent();
                    if (hasRatings.rows.length > 0) {
                        removeExistentRating(hasRatings.rows[0].id);
                    }
                    removeExistentRestaurant(id);
                    return [2 /*return*/, res.sendStatus(200)];
                case 4:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.status(500).send(error_3.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function updateRestaurantsInfo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, userId, _a, name, categoryId, error, messages, hasRestaurant, hasName, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = Number(req.params.id);
                    userId = res.locals.userId;
                    if (isNaN(id)) {
                        return [2 /*return*/, res
                                .status(422)
                                .send('O id informado não é válido. Revise-o e tente novamente.')];
                    }
                    _a = req.body, name = _a.name, categoryId = _a.categoryId;
                    error = newRestaurantSchema.validate(req.body, {
                        abortEarly: false
                    }).error;
                    if (error) {
                        messages = error.details.map(function (err) { return err.message; }).join('\n');
                        return [2 /*return*/, res.status(422).send("Ocorreram os seguintes erros:\n\n".concat(messages))];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, searchRestaurantById(id)];
                case 2:
                    hasRestaurant = _b.sent();
                    return [4 /*yield*/, searchRestaurantByName(name)];
                case 3:
                    hasName = _b.sent();
                    if (hasRestaurant.rows.length === 0) {
                        return [2 /*return*/, res
                                .status(400)
                                .send('Não existe restaurante com o id informado. Revise-o e tente novamente.')];
                    }
                    else if (hasName.rows.length > 0) {
                        return [2 /*return*/, res
                                .status(409)
                                .send('Já existe um restaurante com esse nome. Escolha outro ou avalie o já existente.')];
                    }
                    else if (hasRestaurant.rows[0].creatorId !== userId) {
                        return [2 /*return*/, res
                                .status(400)
                                .send('Esse usuário não foi quem inseriu o restaurante e, portanto, não pode alterá-lo')];
                    }
                    changeRestaurantData(name, categoryId, id);
                    return [2 /*return*/, res.sendStatus(200)];
                case 4:
                    error_4 = _b.sent();
                    return [2 /*return*/, res.status(500).send(error_4.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export { listRestaurants, insertRestaurant, deleteRestaurant, updateRestaurantsInfo, };
