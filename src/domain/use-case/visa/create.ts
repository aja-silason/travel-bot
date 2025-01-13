import { Visa } from "../../ports/in/visa/entities/visa";
import { VisaGateway } from "../../ports/in/visa/visa.gateway";
import { Usecase } from "../use-case";

export type VisaCreateInputDTO = {
    visa: string;
}

export type VisaCreateOutputDTO = {
    id: string;
}

export class CreateVisaUsecase implements Usecase<VisaCreateInputDTO, VisaCreateOutputDTO>{

    public constructor(private readonly visaGateway: VisaGateway){}

    public static create(visaGateway: VisaGateway){
        return new CreateVisaUsecase(visaGateway);
    }

    public async execute({visa}: VisaCreateInputDTO): Promise<VisaCreateOutputDTO> {
        const aVisa = Visa.create(visa);

        const output = this.presentOutput(aVisa);

        return output;
    }

    public presentOutput(visa: Visa): VisaCreateOutputDTO{
        const output: VisaCreateOutputDTO = {
            id: visa.id
        }

        return output;
    }

}
