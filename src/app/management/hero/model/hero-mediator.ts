import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { Hero } from 'src/app/heroes/model/hero';
import { Category } from 'src/app/category/model/category';

export class HeroMediator extends ModalMediator<Hero> {

    categories: Category[];

    constructor(display?: boolean, entity?: Hero, categories?: Category[]) {
        super(display, entity);
        this.categories = categories;
    }
}
