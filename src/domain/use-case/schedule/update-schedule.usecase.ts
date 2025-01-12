import { Schedule } from "../../ports/in/schedule/entities/schedule";
import { ScheduleGateway } from "../../ports/in/schedule/schedule.gateway";
import { Usecase } from "../use-case";

export type UpdateScheduleUsecaseIputDTO = {
    name_passanger: string,
    bi: string,
    visa: string,
    time_travel: string,
    contact: string
}

export type UpdateScheduleUsecaseOutputDTO = void;

export class UpdateScheduleUsecase implements Usecase<UpdateScheduleUsecaseIputDTO, UpdateScheduleUsecaseOutputDTO>{

    public constructor(private readonly scheduleGateway: ScheduleGateway){}

    public static create(scheduleGateway: ScheduleGateway){
        return new UpdateScheduleUsecase(scheduleGateway);
    }

    public async execute(input: UpdateScheduleUsecaseIputDTO): Promise<void> {
        const {name_passanger, bi, visa, time_travel, contact} = input;
        const aSchedule = Schedule.create(name_passanger, bi, visa, time_travel, contact);

        await this.scheduleGateway.update(aSchedule);
        
        return;

    }


}
