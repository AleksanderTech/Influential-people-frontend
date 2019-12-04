
export abstract class List<T>{

    protected pageSize: number = 5;
    protected numberOfPages: number;
    protected selectedPage: number;
    protected entities: T[];

    abstract updatePage(page: number);
}
