export class Project {
    id: number;
    name: string;
    description: string;
    visibility: boolean;
    user: {
        email: string,
        firstName: string,
        lastName: string
    };
}
