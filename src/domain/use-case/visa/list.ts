import { Visa } from "../../ports/in/visa/entities/visa";
import { VisaGateway } from "../../ports/in/visa/visa.gateway";
import { Usecase } from "../use-case";

export type ListVisaInputDTO = void;

export type ListVisaOutputDTO = {
    visa: {
        id: string,
        visa: string
    }[]
}

export class ListVisaUsecase implements Usecase<ListVisaInputDTO, ListVisaOutputDTO>{

    public constructor(private readonly visaGateway: VisaGateway){}

    public static create(visaGateway: VisaGateway){
        return new ListVisaUsecase(visaGateway);
    }

    public async execute(input: void): Promise<ListVisaOutputDTO> {
        const aVisa = await this.visaGateway.list();
        const output = this.presentOutput(aVisa);
        return output;
    }

    private presentOutput(visa: Visa[]): ListVisaOutputDTO{
        return {
            visa: visa.map((visas) => {
                return {
                    id: visas.id,
                    visa: visas.visa
                }
            })
        }
    }

}