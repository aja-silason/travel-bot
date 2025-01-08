import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../Iroute";
import { CreateScheduleInputDTO, CreateScheduleUsecase } from "../../../../../../domain/use-case/schedule/create-schedule.usecase";

export type CreateScheduleResponseDTO = {
    id: string;
}

export class CreateScheduleRoute implements IRoute {

    private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly createScheduleService: CreateScheduleUsecase){}

    public static create(createScheduleService: CreateScheduleUsecase){
        return new CreateScheduleRoute(
            "/schedule",
            HttpMethod.POST,
            createScheduleService
        )
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const {name_passanger, bi, visa, time_travel, contact} = req.body;

            try {
                
                const input: CreateScheduleInputDTO = {
                    name_passanger,
                    bi,
                    visa,
                    time_travel,
                    contact
                }
    
                const output: CreateScheduleResponseDTO = await this.createScheduleService.execute(input);
    
                const responseBody = this.present(output);
    
                res.status(201).json(responseBody).send();

            } catch (error) {

                console.log("Algo correu mal, estamoa resolver por você!");

                res.status(422).json({data: "Something went wrong, we are fixing for you"}).send()
                
            }
            
        }
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateScheduleResponseDTO): CreateScheduleResponseDTO{
        const response = {
            id: input.id
        }
        return response;
    }


}