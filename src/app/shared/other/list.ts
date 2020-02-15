
export abstract class List<T>{

    pageSize: number = 5;
    numberOfPages: number;
    selectedPage: number;
    entities: T[];

    abstract updatePage(page: number);
}
