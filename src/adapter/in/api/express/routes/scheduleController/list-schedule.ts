import { Request, Response } from "express"
import { HttpMethod, IRoute } from "../Iroute"
import { ListScheduleOutputDTO, ListScheduleUseCase } from "../../../../../../domain/use-case/schedule/list-schedule.usecase"

export type ListScheduleResponseDTO = {
    schedules: {
        id: string,
        name_passanger: string,
        bi: string,
        visa: string,
        time_travel: string,
        contact: string
    }[]
}

export class ListScheduleRoute implements IRoute{

    private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly listScheduleService: ListScheduleUseCase){}

    public static create(listScheduleService: ListScheduleUseCase){
        return new ListScheduleRoute(
            "/schedule",
            HttpMethod.GET,
            listScheduleService
        )
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler(){
        return async (req: Request, res: Response) => {

            try {
                const output = await this.listScheduleService.execute();
                const responseBody = this.present(output);
        
                res.status(200).json(responseBody).send();
            }
            catch {
                res.status(422).json({data: "Something went wrong, we are fixing for you"}).send();
            }
           
        }
    }

    private present(input: ListScheduleOutputDTO): ListScheduleResponseDTO{
        
        const response: ListScheduleResponseDTO = {
            schedules: input.schedule.map((schedule) => ({
                id: schedule.id,
                name_passanger: schedule.name_passanger,
                bi: schedule.bi,
                visa: schedule.visa,
                time_travel: schedule.time_travel,
                contact: schedule.contact
            })),
        };

        return response;
    }

    

}
