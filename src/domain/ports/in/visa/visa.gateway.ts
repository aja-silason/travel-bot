import { Visa } from "./entities/visa";

export interface VisaGateway {

    save(visa: Visa): Promise<void>;
    
    list(): Promise<Visa[]>;
    
    update(visa: Visa): Promise<void>;
    
    delete(id: string): Promise<void>;
    
    findById(id: string): Promise<Visa |null>;

}