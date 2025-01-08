'use strict'

import { PrismaClient } from "@prisma/client";
import { ScheduleGateway } from "../../../../domain/ports/in/schedule/schedule.gateway";
import { Schedule } from "../../../../domain/ports/in/schedule/entities/schedule";

export class ScheduleRespositoryPrisma implements ScheduleGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient){
        return new ScheduleRespositoryPrisma(prismaClient);
    }

    public async save(schedule: Schedule): Promise<void> {
        const data = {
            id: schedule.id,
            name_passanger: schedule.name_passanger,
            bi: schedule.bi,
            visa: schedule.visa,
            time_travel: schedule.time_travel,
            contact: schedule.contact,
        }

        await this.prismaClient.schedule.create({data});

    }

    public async list(): Promise<Schedule[]> {

        const schedule = await this.prismaClient.schedule.findMany();

        const scheduleList = schedule.map((schedules) => {
            const schedule = Schedule.with({
                id: schedules.id,
                name_passanger: schedules.name_passanger,
                bi: schedules.bi,
                visa: schedules.visa,
                time_travel: schedules.time_travel,
                contact: schedules.contact
            });
            return schedule;
        });

        return scheduleList;
    }

    public async findById(id: string): Promise<Schedule | null> {
        const schedule = await this.prismaClient.schedule.findUnique({
            where: {id}
        });

        if(!schedule){
            return null;
        }

        return Schedule.with({
            id: schedule.id,
            name_passanger: schedule.name_passanger,
            bi: schedule.bi,
            visa: schedule.visa,
            time_travel: schedule.time_travel,
            contact: schedule.contact
        });

    }

    public async update(schedule: Schedule): Promise<void> {
        
    }
    
    public async delete(id: string): Promise<void> {
        
    }



}