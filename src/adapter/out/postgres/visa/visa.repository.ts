import { PrismaClient } from "@prisma/client";
import { VisaGateway } from "../../../../domain/ports/in/visa/visa.gateway";
import { Visa } from "../../../../domain/ports/in/visa/entities/visa";

type updateDataDTO = {
    visa: string;
}

export class VisaRepositoryPrisma implements VisaGateway {

    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient){
        return new VisaRepositoryPrisma(prismaClient);
    }

    public async save(visa: Visa): Promise<void> {
        try {

            const data = {
                id: visa.id,
                visa: visa.visa
            }

            await this.prismaClient.visa.create({data});
            
        } catch (error) {
            console.log("Something went wrong, we are fixing for you!");
        }
    }

    public async list(): Promise<Visa[]> {

        const visa = await this.prismaClient.visa.findMany();

        const visaList = visa.map((visas) => {
            const visa = Visa.with({
                id: visas.id,
                visa: visas.visa
            });

            return visa;
        })

        return visaList;
        
    }

    public async findById(id: string): Promise<Visa | null> {

        const aVisa = await this.prismaClient.visa.findUnique({
            where: {id}
        });

        if(!aVisa){
            return null;
        }

        return Visa.with({
            id: aVisa.id,
            visa: aVisa.visa
        });
        
    }

    public async update(visa: Visa): Promise<void> {

        const id = visa.id;
        
        try {
            
            const dataToUpdate: any = {};

            const payload: updateDataDTO = {
                visa: visa.visa
            }

            const isValidate: Array<keyof updateDataDTO> = ["visa"];
            for(const key of isValidate){
                if(payload[key] !== undefined){
                    dataToUpdate[key] = visa[key];
                }
            }

            await this.prismaClient.visa.update({
                where: {id},
                data: dataToUpdate
            });

        } catch (error) {
            console.log("Something went wrong, we are finxing for you");
        }

    }

    public async delete(id: string): Promise<void> {

        try {

            await this.prismaClient.visa.delete({
                where: {id}
            })
            
        } catch (error) {
            console.log("Something went wrong, we are fixing for you!");
        }
        
    }

}