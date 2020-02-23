export class NewUser {

    constructor(
        public username?: string,
        public password?: string,
        public enabled?: boolean,
        public email?: string,
        public roles?: string[]) {
    }
}