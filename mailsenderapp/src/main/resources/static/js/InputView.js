import PageFactory from './PageFactory';

const INPUT_ARTICLE_INDEX = 0;

const ADD_PAGE_ID = '/adduser';
const SEND_PAGE_ID = '/send';
const DELETE_PAGE_ID = '/deleteuser';

export default class InputView {
    constructor() {
        this.factory = new PageFactory();
        this.views = this.fillViews();
        this.inputArticle = document.getElementById('main-section').getElementsByTagName('article')[
            INPUT_ARTICLE_INDEX
        ];
    }

    fillViews() {
        const views = new Map();
        views.set(ADD_PAGE_ID, (route) => this.factory.getDeletePage(route));
        views.set(SEND_PAGE_ID, (route) => this.factory.getSendPage(route));
        views.set(DELETE_PAGE_ID, (route) => this.factory.getDeletePage(route));
        return views;
    }

    renderPage(page) {
        this.clearPage();
        page.renderTo(this.inputArticle);
    }

    clearPage() {
        this.inputArticle.innerHTML = '';
        this.inputArticle.id = 'input';
    }

    routeChanged(route) {
        let wasNotRoutedToDefault = false;
        const currentPageCreator = this.views.get(route.url);
        if (currentPageCreator !== undefined) {
            const currentPage = currentPageCreator();
            this.renderPage(currentPage);
            document.title = route.title;
            wasNotRoutedToDefault = true;
            return wasNotRoutedToDefault;
        }
        const currentPage = this.factory.getDefaultPage();
        this.renderPage(currentPage);
        document.title = 'MailSender';
        return wasNotRoutedToDefault;
    }
}
