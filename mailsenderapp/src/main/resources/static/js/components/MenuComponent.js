import menudata from '../../templates/menudata.json';
import compiledTemplate from '../../templates/menuTemplate.hbs';

export default class MenuComponent {
    constructor() {
        this.generatedHTML = compiledTemplate(menudata);
    }

    inject() {
        const menuContainer = document.getElementById('menu');
        menuContainer.innerHTML = this.generatedHTML;
    }
}
