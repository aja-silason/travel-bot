import { Schedule } from "../../ports/in/schedule/entities/schedule";
import { ScheduleGateway } from "../../ports/in/schedule/schedule.gateway";
import { Usecase } from "../use-case";

export type ListScheduleBiIdInputDTO = {
    id: string
};

export type ListScheduleByIdOutputDTO ={

    data: {
        id: string,
        name_passanger: string,
        bi: string,
        visa: string,
        time_travel: string,
        contact: string
    }
}

export class ListScheduleByIdUseCase implements Usecase<ListScheduleBiIdInputDTO, ListScheduleByIdOutputDTO>{

    private constructor(private readonly scheduleGateway: ScheduleGateway){}

    public static create(scheduleGateway: ScheduleGateway){
        return new ListScheduleByIdUseCase(scheduleGateway);
    }

    public async execute({id}: ListScheduleBiIdInputDTO): Promise<ListScheduleByIdOutputDTO> {
        const schedule = await this.scheduleGateway.findById(id);

        if(!schedule){
            throw new Error("Schedule not found");
        }

        return this.present(schedule);
    }

    private present(schedules: Schedule): ListScheduleByIdOutputDTO {
        return {
            data: {
                id: schedules.id,
                name_passanger: schedules.name_passanger,
                bi: schedules.bi,
                visa: schedules.visa,
                time_travel: schedules.time_travel,
                contact: schedules.contact
            }
        }
    }

}


