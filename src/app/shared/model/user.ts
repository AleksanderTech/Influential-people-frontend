export class User {

    constructor(
        public username?: string,
        public password?: string,
        public enabled?: boolean,
        public email?: string,
        public roles?: string[],
        public avatarImageUrl?: string) {
    }
}

export enum UserRole{
    ROLE_USER,
    ROLE_ADMIN
}