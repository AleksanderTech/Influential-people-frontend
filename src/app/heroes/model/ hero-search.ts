export class HeroSearch {

    name: string;
    categories: string[];
    paging: boolean;
    sort: string;

    constructor(name?: string, categories?: string[], paging?: boolean, sort?: string) {
        this.name = name;
        this.categories = categories;
        this.paging = paging;
        this.sort = sort;
    }

    reset() {
        this.name = null;
        this.categories = null;
        this.paging = null;
        this.sort = null;
    }
}