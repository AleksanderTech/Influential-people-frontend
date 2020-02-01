export class Hero {

    name: string;
    avatarImageUrl: string;
    categories: string[];
    rate: number;

    constructor(name?: string, avatarImageUrl?: string, categories?: string[], rate?: number) {
        this.name = name;
        this.avatarImageUrl=avatarImageUrl;
        this.categories = categories;
        this.rate=rate;
    }
}