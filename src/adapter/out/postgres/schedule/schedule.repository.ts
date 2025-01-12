'use strict'

import { PrismaClient } from "@prisma/client";
import { ScheduleGateway } from "../../../../domain/ports/in/schedule/schedule.gateway";
import { Schedule } from "../../../../domain/ports/in/schedule/entities/schedule";

type updateDataDTO = {
    name_passanger: string,
    bi: string,
    visa: string,
    time_travel: string,
    contact: string
}

export class ScheduleRespositoryPrisma implements ScheduleGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient){
        return new ScheduleRespositoryPrisma(prismaClient);
    }

    public async save(schedule: Schedule): Promise<void> {
        try {
            
            const data = {
                id: schedule.id,
                name_passanger: schedule.name_passanger,
                bi: schedule.bi,
                visa: schedule.visa,
                time_travel: schedule.time_travel,
                contact: schedule.contact,
            }
    
            await this.prismaClient.schedule.create({data});

        } catch (error) {
            console.log("Something went wrong, we are fixing for you");
        }

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

    public async update(data: Schedule): Promise<void> {

        const id = data.id;

       try {

        const dataToUpdate: any = {}

        const payload: updateDataDTO = {
            name_passanger: data.name_passanger,
            bi: data.bi,
            visa: data.visa,
            time_travel: data.time_travel,
            contact: data.contact,
        }

        const isToUpdate: Array<keyof updateDataDTO> = ["name_passanger", "bi", "visa", "time_travel", "contact"];

        for(const key of isToUpdate){
            if(payload[key] !== undefined){
                dataToUpdate[key] = data[key];
            }
        }
        
        const schedule = await this.prismaClient.schedule.update({
            where: {id},
            data: dataToUpdate
        });

       } catch (error) {
        console.log("Something went wrong, we are fixing for you");
       }
        
    }
    
    public async delete(id: string): Promise<void> {
        
    }



}