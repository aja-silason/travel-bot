import { Request, Response } from "express";
import { UpdateScheduleUsecase } from "../../../../../../domain/use-case/schedule/update-schedule.usecase";
import { HttpMethod, IRoute } from "../Iroute";

type UpdateScheduleDTO = {
    id: string,
    name_passanger: string,
    bi: string,
    visa: string,
    time_travel: string,
    contact: string
}

export class UpdateScheduleRoute implements IRoute{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly updateScheduleService: UpdateScheduleUsecase){}

    public static create(updateScheduleService: UpdateScheduleUsecase){
        return new UpdateScheduleRoute(
            "/schedule/:id",
            HttpMethod.PUT,
            updateScheduleService
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
            const {name_passanger, bi, visa, time_travel, contact} = req.body;


            try {

                const payload: UpdateScheduleDTO ={
                    id: id,
                    name_passanger,
                    bi,
                    visa,
                    time_travel,
                    contact
                }

                
                const isValidate: Array<keyof UpdateScheduleDTO> = ["name_passanger", "bi", "visa", "time_travel", "contact"];
                for(const key of isValidate){
                    if(payload[key] == undefined || payload[key] == null || payload[key] == ""){
                        res.status(404).json({message: `${key} ${id} must be filled`}).send();
                        return;
                    }
                }
                
                await this.updateScheduleService.execute(payload);

                res.status(201).send();
                
            } catch (error) {
                res.status(404).json({data: "Something went wrong, we are fixing for you"}).send();
            }


        }
    }

}