import { ApiExpress } from "./adapter/in/api/express/api.express";
import { CreateScheduleRoute } from "./adapter/in/api/express/routes/scheduleController/create-schedule";
import {prisma} from "./adapter/out/package/prisma";
import { ScheduleRespositoryPrisma } from "./adapter/out/postgres/schedule/schedule.repository";
import { CreateScheduleUsecase } from "./domain/use-case/schedule/create-schedule.usecase";

import dotenv from "dotenv";
import { ListScheduleUseCase } from "./domain/use-case/schedule/list-schedule.usecase";
import { ListScheduleRoute } from "./adapter/in/api/express/routes/scheduleController/list-schedule";
import { ListScheduleByIdUseCase } from "./domain/use-case/schedule/list-byId.usecase";
import { ListScheduleByIdRoute } from "./adapter/in/api/express/routes/scheduleController/list-schedule-byIdentification";

function main(){

    dotenv.config()

    const aRepository = ScheduleRespositoryPrisma.create(prisma);
    const createSchedule = CreateScheduleUsecase.create(aRepository);
    const listSchedule = ListScheduleUseCase.create(aRepository);

    const listScheduleById = ListScheduleByIdUseCase.create(aRepository);

    const createScheduleRoute = CreateScheduleRoute.create(createSchedule);
    const listScheduleRoute = ListScheduleRoute.create(listSchedule);

    const listScheduleByIdRoute = ListScheduleByIdRoute.create(listScheduleById)

    const port =  process.env.PORTDEV || 3003;

    const api = ApiExpress.create([createScheduleRoute, listScheduleRoute, listScheduleByIdRoute]);
    api.start(port);

}

main()