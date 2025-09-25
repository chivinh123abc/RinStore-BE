import express from "express";
import cors from 'cors';
import { APIs } from './routes/index.js';
import { env } from './configs/environment.js';
const START_SERVER = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/', APIs);
    //Xu li loi
    app.get("/", (req, res) => {
        res.json({ message: 'Hello from Express + TypeScript 🚀' });
    });
    if (env.BUILD_MODE === 'dev') {
        app.listen(3000, () => {
            console.log(`Server running at http://localhost:3000`);
        });
    }
};
export const Server = {
    START_SERVER
};
//# sourceMappingURL=server.js.map