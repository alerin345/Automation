## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Automation scripts

## Technologies
Project is created with:
* Selenium Webdriver
* Node.js


## Setup
To run this project:

First we need to download chromedriver from the site:

[Chromedriver](https://chromedriver.chromium.org/downloads)

Install libraries
```
npm install
```
Create file .env with environment variables likes:
```
TRACKING_NUMBER=1235421
EHOST=ct8.pl
EMAIL=example@gmail.com
EPASSWORD=examplePassword
BROWSER=true

```
If we don't want to run browser during script we can delete BROWSER from environment variables
TRACKING_NUMBER - this is the tracking number
EHOST - SMTP address
EMAIL - The email we use to send the email
EPASSWORD - Email password that we use to send the e-mail
BROWSER=true - Show the browser window while the script is running (environment variable optional)

To run script use command
```
node inpost
```
