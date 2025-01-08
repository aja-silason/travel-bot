import Api from "../api";
import express, {Express} from "express"
import { IRoute } from "./routes/Iroute";
// import cors from "cors";

export class ApiExpress implements Api {

    private app: Express;

    private constructor(routes: IRoute[]){
        this.app = express();
        this.app.use(express.json());
        // this.app.use(cors());
        this.addRoutes(routes);
    }

    public static create(routes: IRoute[]){
        return new ApiExpress(routes);
    }

    private addRoutes(routes: IRoute[]){
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            this.app[method](path, handler);
        })
    }

    public start(port: number | string): void {
        this.app.listen(port, ()=> {
            console.log(`Server is running on port ${port}`);
        });
        this.listRoutes();
    }

    private listRoutes(){
        const routes = this.app._router.stack.filter((route: any) => route.route).map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        })

        console.log(routes);
    }

}