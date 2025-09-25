interface userNoId {
    user_name: string;
    user_email: string;
}
interface userNoId_noStrict {
    user_name?: string;
    user_email?: string;
}
export declare const userService: {
    createNew: (reqBody: userNoId) => Promise<import("./user.model.js").user>;
    getUser: (reqBody: {
        user_id: number;
    }) => Promise<import("./user.model.js").user | null>;
    update: (user_id: number, reqBody: userNoId_noStrict) => Promise<import("./user.model.js").user | null>;
};
export {};
