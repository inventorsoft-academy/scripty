export class Project {
    id: number;
    name: string;
    archive: boolean;
    description: string;
    visibility: boolean;
    user: {
        email: string,
        firstName: string,
        lastName: string
    };
}
