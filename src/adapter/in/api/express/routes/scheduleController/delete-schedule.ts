import { Request, Response } from "express";
import { DeleteScheduleUsecase } from "../../../../../../domain/use-case/schedule/delete-schedule.usecase";
import { HttpMethod, IRoute } from "../Iroute";

export class DeleteScheduleRoute implements IRoute{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly deleteScheduleService: DeleteScheduleUsecase){}

    public static create(deleteScheduleService: DeleteScheduleUsecase){
        return new DeleteScheduleRoute(
            "/schedule/:id",
            HttpMethod.DELETE,
            deleteScheduleService
        )
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

                const aSchedule = await this.deleteScheduleService.execute(id);
                
                if(aSchedule == undefined){
                    console.log("Not found");
                    res.status(404).json({data: "Schedule not found"}).send();
                    return;
                }

                res.status(205).send();

            } catch (error) {
                res.status(404).json({message: "Schedule not found"}).send();
            }

        }
    }




}