export type VisaProps = {
    id: string,
    visa: string,
}

export class Visa {

    public constructor(private props: VisaProps){}

    public static create(visa: string){
        return new Visa({
            id: crypto.randomUUID().toString(),
            visa: visa
        })
    }

    public static with(props: VisaProps){
        return new Visa(props);
    }

    public get id(){
        return this.props.id;
    }

    public get visa(){
        return this.props.visa;
    }

}
