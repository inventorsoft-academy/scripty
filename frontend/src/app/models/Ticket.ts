export class Ticket {
    archive: boolean;
    description: string;
    title: string;
    user: {
        email: string,
        firstName: string,
        lastName: string
    };
    createDate: string;
    id: number;
}
