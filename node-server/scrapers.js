const puppeteer = require("puppeteer");

async function scrapeWebpage(url) {
  const browser = await puppeteer.launch(); // launch browser
  const page = await browser.newPage(); // create new page
  await page.goto(url); // navigate to input url

  const [element] = await page.$x("//*[@id='text']");
  console.log(element);
  const text = await element.getProperty("textContent");
  const name = await text.jsonValue();

  const [element2] = await page.$x("//*[@id='img']");
  const src = await element2.getProperty("src");
  const img = await src.jsonValue();

  browser.close();

  console.log({ name, img });

  return { name, img };
}

module.exports = { scrapeWebpage };
