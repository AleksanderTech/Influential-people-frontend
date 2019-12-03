export class Hero {

    name: string;
    profileImageUrl: string;
    categories: string[];
    score: number;

    constructor(name?: string, profileImageUrl?: string, categories?: string[], score?: number) {
        this.name = name;
        this.profileImageUrl = profileImageUrl;
        this.categories = categories;
        this.score = score;
    }
}