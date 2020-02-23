export class ChangeUser {

    constructor(
        public password: string,
        public enabled: boolean,
        public email: string,
        public roles: string[]) {
    }
}