import { Request, Response } from "express"
import { ListVisaOutputDTO, ListVisaUsecase } from "../../../../../../domain/use-case/visa/list"
import { HttpMethod, IRoute } from "../Iroute"

export type ListVisaResponseDTO = {
    id: string,
    visa: string
}[]

export class ListVisaController implements IRoute {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly listVisaService: ListVisaUsecase){}

    public static create(listVisaService: ListVisaUsecase){
        return new ListVisaController(
            "/visa",
            HttpMethod.GET,
            listVisaService
        )
    }

    public getPath(): string {
        return this.path;    
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler(){
        return async (req: Request, res: Response) => {
            try {
                
                const output = await this.listVisaService.execute();
                const responseBody = this.present(output);

                res.status(200).json(responseBody).send();

            } catch (error) {
                res.status(422).json({data: "Something went wrong, we are fixing for you"}).send();
            }
        }
    }

    private present(input: ListVisaOutputDTO): ListVisaResponseDTO{
        const response = input.visa.map((visa) => ({
            id: visa.id,
            visa: visa.visa,
        }))

        return response;
        
    }


}