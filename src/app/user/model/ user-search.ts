export class UserSearch {

    username: string;
    email:string;
    paging: boolean;
    sort: string;

    readonly SORT_ASC: string = 'asc';
    readonly SORT_DESC: string = 'desc';

    constructor(username?: string, email?: string, paging?: boolean, sort?: string) {
        this.username = username;
        this.email = email;
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
            if (this.sort === 'asc') {
                query = query + 'sort=' + this.SORT_ASC + '&';
            } else if (this.sort === 'desc') {
                query = query + 'sort=' + this.SORT_DESC + '&';
            }
        } if (this.username) {
            query = query + 'username=' + this.username+'&';
            if(query.includes('paging')){
                query = query.replace('paging=true', 'paging=false');
            }else{
                query = query + 'paging=' + 'false&';
            }
        } if (this.email) {
            query = query + 'email=' + this.email+'&';
            if(query.includes('paging')){
                query = query.replace('paging=true', 'paging=false');
            }else{
                query = query + 'paging=' + 'false&';
            }
        } if (query[query.length - 1] === '&') {
            query = query.substring(0, query.length - 1);
        }
        return query;
    }
}