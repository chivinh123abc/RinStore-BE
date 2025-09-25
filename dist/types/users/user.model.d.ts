export interface user {
    user_id: number;
    user_name: string;
    user_email: string;
}
interface userNoId_noStrict {
    user_name?: string;
    user_email?: string;
}
export declare const userModel: {
    create: (user_name: string, user_email: string) => Promise<user>;
    findUserId: (user_id: number) => Promise<user | null>;
    update: (user_id: number, updatedData: userNoId_noStrict) => Promise<user | null>;
};
export {};
