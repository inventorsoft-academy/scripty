export class User {
    email: string;
    firstName: string;
    lastName: string;
    password: {
        password: string;
        confPassword: string;
    };
    token: string;
}
