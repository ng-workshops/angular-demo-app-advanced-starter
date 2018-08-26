import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getNavigation() {
    return element.all(by.tagName('nav'));
  }

  getNavigationItems() {
    return this.getNavigation().all(by.tagName('a'));
  }
}
