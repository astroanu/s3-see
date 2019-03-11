import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getPlaceholderText() {
    return element(by.css('.placeholder')).getText() as Promise<string>;
  }
}
