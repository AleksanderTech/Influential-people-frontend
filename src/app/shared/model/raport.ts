export class Raport<T>{
    constructor(
        public data?: T,
        public isSuccessful?: boolean
    ) { }
}