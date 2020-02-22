export class ChangeArticle {

    id: number;
    title: string;
    text: string;
    heroName: string;

    constructor(id: number, title: string, text: string, heroName: string) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.heroName = heroName
    }
}