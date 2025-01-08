import { Schedule } from "../../ports/in/schedule/entities/schedule";
import { ScheduleGateway } from "../../ports/in/schedule/schedule.gateway";
import { Usecase } from "../use-case";

export type ListScheduleInputDTO = void;

export type ListScheduleOutputDTO = {
    schedule: {
        id: string,
        name_passanger: string,
        bi: string,
        visa: string,
        time_travel: string,
        contact: string
    }[]
}

export class ListScheduleUseCase implements Usecase<ListScheduleInputDTO, ListScheduleOutputDTO> {

    private constructor(private readonly scheduleGateway: ScheduleGateway){}

    public static create(scheduleGateway: ScheduleGateway){
        return new ListScheduleUseCase(scheduleGateway);
    }

    public async execute(): Promise<ListScheduleOutputDTO> {
        const aSchedule = await this.scheduleGateway.list();
        const output = this.presentOutut(aSchedule);
        return output;
    }

    private presentOutut(schedules: Schedule[]): ListScheduleOutputDTO{
        return {
            schedule: schedules.map((schedule) => {
                return {
                    id: schedule.id,
                    name_passanger: schedule.name_passanger,
                    bi: schedule.bi,
                    visa: schedule.visa,
                    time_travel: schedule.time_travel,
                    contact: schedule.contact
                }
            })
        }
    }

}
