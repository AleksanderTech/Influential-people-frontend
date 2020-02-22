export class QuoteSearch {

    heroes: string[];
    content: string;
    paging: boolean;
    sort: string;

    readonly SORT_ALPH_ASC: string = 'asc';
    readonly SORT_ALPH_DESC: string = 'desc';

    constructor(content?: string, heroes?: string[], paging?: boolean, sort?: string) {
        this.content = content;
        this.heroes = heroes;
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
            if (this.sort === this.SORT_ALPH_ASC) {
                query = query + 'sort=asc&';
            } else if (this.sort === this.SORT_ALPH_DESC) {
                query = query + 'sort=desc&';
            }
        } if (this.content) {
            query = query + 'content=' + this.content + '&';
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