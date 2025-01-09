import { HttpMethod, IRoute } from "../Iroute"
import { ListScheduleByIdUseCase } from "../../../../../../domain/use-case/schedule/list-byId.usecase"
import { Request, Response } from "express";
import { ListScheduleOutputDTO, ListScheduleUseCase } from "../../../../../../domain/use-case/schedule/list-schedule.usecase";
import { ListScheduleResponseDTO } from "./list-schedule";

// export type ListScheduleByIdDTO = {
//     schedule: {
//         id: string,
//         name_passanger: string,
//         bi: string,
//         visa: string,
//         time_travel: string,
//         contact: string
//     } 
// }[]

//     type ListScheduleByIdOutputDTO = {
//         id: string,
//         name_passanger: string,
//         bi: string,
//         visa: string,
//         time_travel: string,
//         contact: string
//     }

// export class ListScheduleByIDRoute implements IRoute{

//     private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly ListScheduleByIdService: ListScheduleByIdUseCase){}

//     public static create(ListScheduleByIdService: ListScheduleByIdUseCase){
//         return new ListScheduleByIDRoute(
//             "/schedule:id",
//             HttpMethod.GET,
//             ListScheduleByIdService
//         );
//     }

//     public getPath(): string {
//         return this.path;
//     }

//     public getMethod(): HttpMethod {
        
//         return this.method;
//     }

//     public getHandler() {
//         return async (req: Request, res: Response) => {

//             const {id} = req.params;

//             try {

//                 const output = await this.ListScheduleByIdService.execute({id});

//                 const responseBody = this.present(output);

//                 const a = responseBody.map(schedule => ({
//                     id: schedule.id,
//                     name_passanger: schedule.name_passanger,
//                     bi: schedule.bi,
//                     visa: schedule.visa,
//                     time_travel: schedule.time_travel,
//                     contact: schedule.contact,
//                 }))

//                 res.status(200).json(responseBody).send();
//                 // console.log("Output ffff" );
//                 // res.status(200).json(output).send();
                
//             } catch (error) {
//                 res.status(404).json({data: "Something went wrong, we are fixing for you"}).send();
//             }

//         }
//     }

//     private present(input: ListScheduleOutputDTO): ListScheduleResponseDTO {
//         return {
//             schedules: input.schedule.map(schedule => ({
//                 id: schedule.id,
//                 name_passanger: schedule.name_passanger,
//                 bi: schedule.bi,
//                 visa: schedule.visa,
//                 time_travel: schedule.time_travel,
//                 contact: schedule.contact,
//             }))
//         };
//     }


//     // private present(input: ListScheduleByIdOutputDTO): ListScheduleByIdDTO{

//         // return {

//         //         id: input.id,
//         //         name_passanger: input.name_passanger,
//         //         bi: input.bi,
//         //         visa: input.visa,
//         //         time_travel: input.time_travel,
//         //         contact: input.contact

//         // };

//         // const response: ListScheduleResponseDTO = {
//         //     schedules: input.schedule.map((schedule) => ({
//         //         id: schedule.id,
//         //         name_passanger: schedule.name_passanger,
//         //         bi: schedule.bi,
//         //         visa: schedule.visa,
//         //         time_travel: schedule.time_travel,
//         //         contact: schedule.contact
//         //     })),
//         // };

//         // return response;

//     // }

// }


export class GetScheduleRoute implements IRoute {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getScheduleService: ListScheduleByIdUseCase
    ) {}

    public static create(getScheduleService: ListScheduleByIdUseCase){
        return new GetScheduleRoute(
            "/schedule/:id",  // Definindo a rota dinâmica com o :id
            HttpMethod.GET,
            getScheduleService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler(){
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            try {
                const output = await this.getScheduleService.execute({ id });
                const responseBody = this.present(output);
                res.status(200).json(responseBody).send();
            } catch (error) {
                res.status(404).json({ message: 'Schedule not found' }).send();
            }
        };
    }

    private present(input: ListScheduleOutputDTO): ListScheduleResponseDTO {
        return {
            schedules: input.schedule.map(schedule => ({
                id: schedule.id,
                name_passanger: schedule.name_passanger,
                bi: schedule.bi,
                visa: schedule.visa,
                time_travel: schedule.time_travel,
                contact: schedule.contact,
            }))
        };
    }
}