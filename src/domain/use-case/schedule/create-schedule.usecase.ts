import { Schedule } from "../../ports/in/schedule/entities/schedule";
import { ScheduleGateway } from "../../ports/in/schedule/schedule.gateway";
import { Usecase } from "../use-case";

export type CreateScheduleInputDTO = {
    name_passanger: string;
    visa: string;
    bi: string,
    time_travel: string;
    contact: string;
}

export type CreateScheduleOutpuDTO = {
    id: string;
}

export class CreateScheduleUsecase implements Usecase<CreateScheduleInputDTO, CreateScheduleOutpuDTO>{

    private constructor(private readonly scheduleGateway: ScheduleGateway){}

    public static create(scheduleGateway: ScheduleGateway){
        return new CreateScheduleUsecase(scheduleGateway);
    }

    public async execute({name_passanger, bi, visa, time_travel, contact}: CreateScheduleInputDTO): Promise<CreateScheduleOutpuDTO> {
        const aSchedule = Schedule.create(name_passanger, bi, visa, time_travel, contact);
        
        await this.scheduleGateway.save(aSchedule);
        const output = this.presentOutput(aSchedule);

        return output;
    }

    private presentOutput(schedule: Schedule): CreateScheduleOutpuDTO{
        const output: CreateScheduleOutpuDTO = {
            id: schedule.id
        }

        return output;
    }


}
