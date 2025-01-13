import { Request, Response } from "express";
import { CreateVisaUsecase } from "../../../../../../domain/use-case/visa/create";
import { HttpMethod, IRoute } from "../Iroute";

export type CreateVisaResponseDTO = {
    id: string
}

export type CreateVisaInputDTO = {
    visa: string
}

export class CreateVisaController implements IRoute{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly createVisaService: CreateVisaUsecase){}

    public static create(createVisaService: CreateVisaUsecase){
        return new CreateVisaController(
            "/visa",
            HttpMethod.POST,
            createVisaService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const {visa} = req.body;

            try {

                const payload: CreateVisaInputDTO = {
                    visa
                }

                const isValidate: Array<keyof CreateVisaInputDTO> = ["visa"];
                
                for(const key of isValidate){
                    if(payload[key] == "" || payload[key] == undefined || payload[key] == null){
                        res.status(404).json({data: "Something went wrong, we are fixing for you"}).send();
                        return;
                    }
                }

                const output: CreateVisaResponseDTO = await this.createVisaService.execute(payload);

                const responseBody = this.present(output);

                res.status(201).json(responseBody).send();


            } catch (error) {
                res.status(404).json({data: "Something went wrong, we are fixing for you"}).send();
            }
        }
    }

    private present(input: CreateVisaResponseDTO){
        const response = {
            id: input.id
        }

        return response;
    }

}
