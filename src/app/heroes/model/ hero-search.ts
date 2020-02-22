export class HeroSearch {

    name: string;
    categories: string[];
    paging: boolean;
    sort: string;

    readonly SORT_ASC: string = 'asc';
    readonly SORT_DESC: string = 'desc';

    constructor(name?: string, categories?: string[], paging?: boolean, sort?: string) {
        this.name = name;
        this.categories = categories;
        this.paging = paging;
        this.sort = sort;
    }

    toQuery() {
        let query = '?';
        if (this.paging) {
            if (this.paging === true) {
                query = query + 'paging=' + 'true&';
            } else {
                query = query + 'paging=' + 'false&';
            }
        } if (this.sort) {
            if (this.sort === 'asc') {
                query = query + 'sort=' + this.SORT_ASC + '&';
            } else if (this.sort === 'desc') {
                query = query + 'sort=' + this.SORT_DESC + '&';
            }
        } if (this.name) {
            query = query + 'name=' + this.name+'&';
            if(query.includes('paging')){
                query = query.replace('paging=true', 'paging=false');
            }else{
                query = query + 'paging=' + 'false&';
            }
        } if (this.categories) {
            if (this.categories[0] !== 'none') {
                for (let i = 0; i < this.categories.length; i++) {
                    query = query + 'category=' + this.categories[i] + '&';
                }
            }
        } if (query[query.length - 1] === '&') {
            query = query.substring(0, query.length - 1);
        }
        return query;
    }
}