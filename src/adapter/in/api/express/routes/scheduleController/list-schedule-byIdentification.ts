import { HttpMethod, IRoute } from "../Iroute"
import { ListScheduleByIdUseCase } from "../../../../../../domain/use-case/schedule/list-byId.usecase"
import { Request, Response } from "express";

export type ListScheduleBiIDDTO = {
    id: string,
    name_passanger: string,
    bi: string,
    visa: string,
    time_travel: string,
    contact: string   
}

export class ListScheduleByIDRoute implements IRoute{

    private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly ListScheduleByIdService: ListScheduleByIdUseCase){}

    public static create(ListScheduleByIdService: ListScheduleByIdUseCase){
        return new ListScheduleByIDRoute(
            "/schedule:id",
            HttpMethod.GET,
            ListScheduleByIdService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        
        return this.method;
    }

    public getHandler() {
        return async (req: Request, res: Response) => {

            const {id} = req.params;

            try {

                res.send({data: "Opahhhh", id});
                
            } catch (error) {
                res.status(422).json({data: "Something went wrong, we are fixing for you"}).send();
            }

        }
    }

}
