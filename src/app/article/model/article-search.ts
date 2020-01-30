export class ArticleSearch {

    heroes: string[];
    title: string;
    paging: boolean;
    sort: string;

    readonly SORT_NEWEST: string = 'desc';
    readonly SORT_OLDEST: string = 'asc';

    constructor(heroes?: string[], paging?: boolean, sort?: string) {
        this.heroes = heroes;
        this.paging = paging;
        this.sort = sort;
    }

    resetSort() {
        this.sort = null;
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
            if (this.sort === this.SORT_NEWEST) {
                query = query +'sort='+this.SORT_NEWEST +'&';
            } else if (this.sort === this.SORT_OLDEST) {
                query = query +'sort='+this.SORT_OLDEST +'&';
            }
        } if (this.title) {
            query = query + 'title=' + this.title + '&';
            if (query.includes('paging')) {
                query = query.replace('paging=true', 'paging=false');
            } else {
                query = query + 'paging=' + 'false&';
            }
        } if (this.heroes) {
            if (this.heroes[0] !== 'none') {
                for (let i = 0; i < this.heroes.length; i++) {
                    query = query + 'hero=' + this.heroes[i] + '&';
                }
            }
        }
        if (query[query.length - 1] === '&') {
            query = query.substring(0, query.length - 1);
        }
        return query;
    }
}