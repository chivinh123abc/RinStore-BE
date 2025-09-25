var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from './user.model.js';
const createNew = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel.create(reqBody.user_name, reqBody.user_email);
    return newUser;
});
const getUser = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield userModel.findUserId(reqBody.user_id);
    return userData;
});
const update = (user_id, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = Object.assign(Object.assign({}, (reqBody.user_name !== undefined && { user_name: reqBody.user_name })), (reqBody.user_email !== undefined && { user_email: reqBody.user_email }));
    const userUpdated = yield userModel.update(user_id, updateData);
    return userUpdated;
});
export const userService = {
    createNew,
    getUser,
    update
};
//# sourceMappingURL=user.service.js.map