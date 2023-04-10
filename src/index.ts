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
import path from "path";

const app = express();

const port = process.env.PORT || 4001;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("src/public"));

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
