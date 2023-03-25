import express from "express";
import { config } from "dotenv";
config();
import bodyParser from "body-parser";
import router from "./routes";
import { handleError } from "./middleware/handleError";
import morgan from "morgan";
import cors from "cors";
import { mongodb } from "./configs/mongodb";
import helmet from "helmet";
import compression from "compression";

const app = express();

const port = process.env.PORT || 4001;

app.use(morgan("dev"));
app.use(morgan("combined"));

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Connect to Mongo */
mongodb.connect();

router(app);

handleError(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
