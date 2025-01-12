import { ScheduleGateway } from "../../ports/in/schedule/schedule.gateway";
import { Usecase } from "../use-case";


export class DeleteScheduleUsecase implements Usecase<string, void>{

    public constructor(private readonly scheduleGateway: ScheduleGateway){}

    public static create(scheduleGateway: ScheduleGateway){
        return new DeleteScheduleUsecase(scheduleGateway);
    }

    public async execute(input: string): Promise<void> {

        const id = input;

        try {

            await this.scheduleGateway.delete(id);
            return;

        } catch (error) {
            console.log("Something went wrong");
        }

    }

}
