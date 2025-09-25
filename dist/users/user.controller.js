var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service.js';
const createNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = yield userService.createNew(req.body);
        res.status(StatusCodes.CREATED).json(createdUser);
    }
    catch (error) {
        throw (error);
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = Number(req.params.user_id); // chuyển string → number
        if (isNaN(user_id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user ID' });
        }
        const userInfo = yield userService.getUser({ "user_id": user_id });
        res.status(StatusCodes.ACCEPTED).json(userInfo);
    }
    catch (error) {
        throw (error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = Number(req.params.user_id);
        const updateData = req.body;
        if (isNaN(user_id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user ID' });
        }
        const updatedInfo = yield userService.update(user_id, updateData);
        res.status(StatusCodes.ACCEPTED).json(updatedInfo);
    }
    catch (error) {
        throw (error);
    }
});
export const userController = {
    createNew,
    getUser,
    update
};
//# sourceMappingURL=user.controller.js.map