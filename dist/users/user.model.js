var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from '../configs/database.js';
const create = (user_name, user_email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
      INSERT INTO users (user_name, user_email)
      VALUES ($1, $2)
      RETURNING user_id, user_name, user_email
    `, [user_name, user_email]);
    return result.rows[0];
});
const findUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
      SELECT user_id, user_name, user_email
      FROM users
      WHERE user_id = $1
    `, [user_id]);
    return result.rows[0] || null;
});
const update = (user_id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = [];
    const values = [];
    let index = 1;
    if (updatedData.user_name !== undefined) {
        fields.push(`user_name = $${index++}`);
        values.push(updatedData.user_name);
    }
    if (updatedData.user_email !== undefined) {
        fields.push(`user_email = $${index++}`);
        values.push(updatedData.user_email);
    }
    if (fields.length === 0) {
        return null;
    }
    values.push(user_id);
    const query = `
  UPDATE users
  SET ${fields.join(', ')}
  WHERE user_id = $${index}
  RETURNING user_id, user_name, user_email
  `;
    const result = yield pool.query(query, values);
    return result.rows[0] || null;
});
export const userModel = {
    create,
    findUserId,
    update
};
//# sourceMappingURL=user.model.js.map