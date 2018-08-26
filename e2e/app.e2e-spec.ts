import { AppPage } from './app.po';

describe('angular-demo-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hello Angular');
  });

  it('should display the navigation', () => {
    page.navigateTo();

    const nav = page.getNavigation();
    const navItems = page.getNavigationItems();

    expect(nav.isPresent()).toBeTruthy();
    expect(nav.count()).toBe(1);

    expect(navItems.isPresent()).toBeTruthy();
    expect(navItems.count()).toBe(5);
  });
});
