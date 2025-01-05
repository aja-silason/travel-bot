import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { mainRoute } from "./routes/route";

const app = express();
const port = 3000;

app.use(bodyParser.json()); 

app.get(mainRoute.route, (req: Request, res: Response) => {
    res.status(200).send(`https://{enviroment}/{port}${mainRoute.route}`);
})

app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});
