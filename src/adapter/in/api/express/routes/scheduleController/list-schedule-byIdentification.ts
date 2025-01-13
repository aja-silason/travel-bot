import { Request, Response } from "express";
import { ListScheduleByIdUseCase } from "../../../../../../domain/use-case/schedule/list-byId.usecase"
import { HttpMethod, IRoute } from "../Iroute"

export type ListScheduleByIdControllerResponse = {
    id: string,
    name_passanger: string,
    bi: string,
    visa: string,
    time_travel: string,
    contact: string
}

export class ListScheduleByIdRoute implements IRoute {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly listScheduleByIdService: ListScheduleByIdUseCase){}

    public static create(listScheduleByIdService: ListScheduleByIdUseCase){
        return new ListScheduleByIdRoute(
            "/schedule/:id",
            HttpMethod.GET,
            listScheduleByIdService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;    
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            
            const {id} = request.params;

            try {

                const schedule = await this.listScheduleByIdService.execute(id);

                const responseBody = this.present(schedule);

                response.status(200).json(responseBody).send();
                
            } catch (error) {
                response.status(404).json({data: "Schedule not found"}).send();
            }
        }
    }


    private present(input: ListScheduleByIdControllerResponse){
        const schedule: ListScheduleByIdControllerResponse = {
            id: input.id,
            name_passanger: input.name_passanger,
            bi: input.bi,
            visa: input.visa,
            time_travel: input.time_travel,
            contact: input.contact
        }
        return schedule;
    }


}
