const dotenv = require('dotenv');
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require("fs");
const nodemailer = require("nodemailer");
const sendMail = require('./sendMail');
dotenv.config();

const number = process.env.TRACKING_NUMBER;
const url = `https://inpost.pl/sledzenie-przesylek?number=${number}`;
const script = `
return document.querySelector('.last-status').childNodes[1].textContent;
`;


let inc = 0;
async function checkData(driver) {
  await driver.manage().deleteAllCookies();
  await driver.get(url).then( () => driver.executeScript(script))
    .catch(err => {
      console.log(`błąd execute: ${err}`);
      return logIn(driver);
    })
    .then(data => {
      fs.readFile('inpost.txt', function(err, fileData) {
        console.log(fileData.toString() == data, inc++);
        if(fileData.toString() == data)
          return checkData(driver);
        else {
          console.log('nope');
          sendMail(data);
          driver.quit();
        }
      });
    }).catch(error => logIn(driver));
}
async function writeDataToFile(driver) {
  await driver.get(url).then( () => driver.executeScript(script))
    .then(data => {
      fs.writeFile("inpost.txt", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.\n"+data);
        driver.quit();
      })
    });
}

async function main() {
  let chrome = require('selenium-webdriver/chrome');
  let webdriver = require('selenium-webdriver');
  let options = new chrome.Options();
  let driver;
  if(!process.env.BROWSER == "true")
  {
    driver = await new Builder()
    .forBrowser('chrome')
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(new chrome.Options().addArguments('--headless'))
    .build();
  }
  else {
    driver = await new Builder()
    .forBrowser('chrome')
    .build();

  }
  await driver.get(url).then((x) => {
    driver.executeScript(script)
      .then(result => (process.argv[2] == 'write') ? writeDataToFile(driver) : checkData(driver),
      err => {
        console.error(`We have an ${err.message}`)
        console.log('Wrong tracking number!');
    });
  });
}
main();
