import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { mainRoute } from "./routes/route";

import dotenv  from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); 

const data = {
    name: "Belmira da Silva",
    age: 19,
    address: "Bita Progresso",
}

app.get(mainRoute.route, (req: Request, res: Response) => {
    
    const theNewData = `https://{enviroment}/{port}${mainRoute.route}`;
    const datas = data;
    
    const payload = {
        route: theNewData,
        data: datas
    }
    
    res.status(200).send(payload);
})

app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});
