import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import { corsOptions } from "./config/corsOptions.js";
import { requestLogger } from "./middlewares/logger.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(requestLogger);

app.use("/", chatRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on ${PORT}`);
});
