import * as option from '../helpers/options.js';
import exec from 'k6/execution';
import randomSleep from '../helpers/randomSleep.js';
import { browser } from 'k6/experimental/browser';
import { ClothoHomePage } from '../helpers/pom/ClothoHomePage.js';
import { pages } from '../helpers/data.js';
import { sleep } from 'k6';
import { BaseAuth, SignInOrRegister } from '../helpers/pom/SignInOrRegister.js';
import { ContentPage, Video } from '../helpers/pom/ContentPage.js';
import {
  env,
  testEnv,
  username as exampleEmail,
  password,
} from '../helpers/config.js';

const { cdaUrl, clothoUrl } = env[testEnv];

export const options = option.browser(2, 2);

export default async function () {
  const context = browser.newContext();
  const page = context.newPage();
  context.setDefaultTimeout(10000);
  context.setDefaultNavigationTimeout(10000);

  const username = exampleEmail.replace(
    /\d\d\d@/,
    `${exec.vu.idInTest + 100}@`
  );

  try {
    await page.goto(clothoUrl, {
      waitUntil: 'networkidle',
    });

    randomSleep();

    const singInOrRegister = new SignInOrRegister(page);
    await singInOrRegister.signInLink.click();
    await page.waitForNavigation();

    randomSleep(3, 8);

    const baseAuthPage = new BaseAuth(page);
    await baseAuthPage.fillUsername(username);
    await baseAuthPage.fillPassword(password);
    await baseAuthPage.clickSubmitButton();
    await page.waitForNavigation();

    const clothoHomePage = new ClothoHomePage(page);
    await clothoHomePage.checkIfPageIsOpened();

    randomSleep(3, 5);

    const contentPage = new ContentPage(page, cdaUrl);
    await contentPage.openPage(pages.htmlPages[0]);
    randomSleep(1, 5);
    await contentPage.scrollToBottom();

    randomSleep();

    await contentPage.nextPage(2, 5, 10, true);

    await contentPage.openCourseOutline();
    await contentPage.clickOnCourseOutlineItems([
      'Introduction to Law and the Court Systems',
      'What is Law?',
      ' Distinguishing Legal from Other Kinds of Rules',
    ]);
    await contentPage.closeCourseOutline();

    contentPage.checkIfPageIsOpened(pages.videoPages[0]);

    randomSleep();

    const video = new Video(page, pages.videoPages[0].videos[0].uid);
    await video.play();

    sleep(1);
  } finally {
    page.close();
    context.close();
  }
}
