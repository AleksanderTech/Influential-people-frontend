export class NewArticle {
    
    title: string;
    text: string;
    heroName: string;

    constructor(title: string, text: string, heroName: string) {
        this.title = title;
        this.text = text;
        this.heroName = heroName
    }
}