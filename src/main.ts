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
import { UpdateScheduleUsecase } from "./domain/use-case/schedule/update-schedule.usecase";
import { UpdateScheduleRoute } from "./adapter/in/api/express/routes/scheduleController/update-schedule";
import { DeleteScheduleUsecase } from "./domain/use-case/schedule/delete-schedule.usecase";
import { DeleteScheduleRoute } from "./adapter/in/api/express/routes/scheduleController/delete-schedule";
import { CreateVisaUsecase } from "./domain/use-case/visa/create";
import { VisaRepositoryPrisma } from "./adapter/out/postgres/visa/visa.repository";
import { CreateVisaController } from "./adapter/in/api/express/routes/visaController/create";
import { ListVisaUsecase } from "./domain/use-case/visa/list";
import { ListVisaController } from "./adapter/in/api/express/routes/visaController/list";

function main(){

    dotenv.config()

    const aScheduleRepository = ScheduleRespositoryPrisma.create(prisma);
    const aVisaRepository = VisaRepositoryPrisma.create(prisma);

    const createSchedule = CreateScheduleUsecase.create(aScheduleRepository);
    const listSchedule = ListScheduleUseCase.create(aScheduleRepository);
    const listScheduleById = ListScheduleByIdUseCase.create(aScheduleRepository);
    const updateSchedule = UpdateScheduleUsecase.create(aScheduleRepository);
    const deleteSchedule = DeleteScheduleUsecase.create(aScheduleRepository);

    const createVisa = CreateVisaUsecase.create(aVisaRepository);
    const listVisa = ListVisaUsecase.create(aVisaRepository);


    const createScheduleRoute = CreateScheduleRoute.create(createSchedule);
    const listScheduleRoute = ListScheduleRoute.create(listSchedule);
    const listScheduleByIdRoute = ListScheduleByIdRoute.create(listScheduleById);
    const updateScheduleRoute = UpdateScheduleRoute.create(updateSchedule);
    const deleteScheduleRoute = DeleteScheduleRoute.create(deleteSchedule);

    const createVisaRoute = CreateVisaController.create(createVisa);
    const listVisaRoute = ListVisaController.create(listVisa);


    const port =  process.env.PORTDEV || 3003;


    const api = ApiExpress.create([createScheduleRoute, listScheduleRoute, listScheduleByIdRoute, updateScheduleRoute, deleteScheduleRoute, createVisaRoute, listVisaRoute]);
    api.start(port);

}

main()