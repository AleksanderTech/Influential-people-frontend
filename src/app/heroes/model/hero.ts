export class Hero {

    name: string;
    profileImageUrl: string;
    categories: string[];
    rate: number;

    constructor(name?: string, profileImageUrl?: string, categories?: string[], rate?: number) {
        this.name = name;
        this.profileImageUrl = profileImageUrl;
        this.categories = categories;
        this.rate=rate;
    }
}