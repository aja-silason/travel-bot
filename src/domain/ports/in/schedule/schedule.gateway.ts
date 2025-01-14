import { Schedule } from "./entities/schedule";

export interface ScheduleGateway {
    save(schedule: Schedule): Promise<void>;
    list(): Promise<Schedule[]>;
    findById(id: string): Promise<Schedule | null>;
    update(schedule: Schedule): Promise<void>;
    delete(id: string): Promise<void>
}