import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { STATUS_CODES } from "http";

const app = express();
const port = 3000;

const mainRoute = {
    route: "/api/v1/"
}

app.use(bodyParser.json()); 

app.get("/", (req: Request, res: Response) => {
    res.status(200).send(`https://{enviroment}/{port}${mainRoute.route}`);
})

app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});
