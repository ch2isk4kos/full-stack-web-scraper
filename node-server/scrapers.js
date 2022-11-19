const puppeteer = require("puppeteer");

const scrapeWebpage = async (url) => {
  const browser = await puppeteer.launch(); // launch browser
  const page = await browser.newPage(); // create new page
  await page.goto(url); // navigate to input url

  const [element] = await page.$x('//*[@id="text"]');
  const text = await element.getProperty("textContent");
  const name = await text.jsonValue();

  const [element2] = await page.$x('//*[@id="img"]');
  const src = await element2.getProperty("src");
  const img = await src.jsonValue();

  browser.close();

  console.log({ name, img });

  return { name, img };
};

scrapeWebpage("https://www.youtube.com/@raiders");

module.exports = { scrapeWebpage };
