export type ScheduleProps = {
    id: string;
    name_passanger: string;
    bi: string;
    visa: string;
    time_travel: string;
    contact: string;
}

export class Schedule {

    private constructor(private props: ScheduleProps) { }

    public static create(name_passanger: string, bi: string, visa: string,time_travel: string, contact: string) {
        return new Schedule({
            id: crypto.randomUUID().toString(),
            name_passanger: name_passanger,
            bi: bi,
            visa: visa,
            time_travel: time_travel,
            contact: contact
        })
    }

    public static with(props: ScheduleProps){
        return new Schedule(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name_passanger(){
        return this.props.name_passanger;
    }

    public get bi(){
        return this.props.bi;
    }

    public get visa(){
        return this.props.visa;
    }

    public get time_travel(){
        return this.props.time_travel;
    }

    public get contact(){
        return this.props.contact;
    }

} 