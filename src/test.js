const {Builder, By, until} = require("selenium-webdriver");
const fs = require("fs");

async function lushChallenge() {
    // launch browser
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.manage().setTimeouts({implicit: 3 * 1000});

    // navigate to application
    await driver.get("https://www.lush.ca/");

    // set window size
    await driver.manage().window().setRect({width: 1560, height: 3800});

    // find the `New` Dropdown button then click
    let newBtn = driver.findElement(
        By.xpath("/html/body/div[1]/header/div/nav/div/div/ul/li[3]/button")
    );
    await driver
        .actions({async: true})
        .move({origin: newBtn})
        .click()
        .perform()
        .then(function () {
            // Click `ALL NEW` button
            let allNewBtn = driver.findElement(
                By.xpath('//*[@id="custom-link-all-new"]')
            );
            const actionTwo = driver.actions({async: true});
            actionTwo.move({origin: allNewBtn}).click().perform();
        });

    await driver.sleep(15 * 1000);

    //   click modal to continue
    await driver
        .wait(
            until.elementIsVisible(
                driver.findElement(By.xpath('//*[@id="email-signup-modal"]'))
            ),
            10 * 1000
        )
        .then(function () {
            driver.sleep(10 * 1000);
            let cancelBtn = driver.findElement(
                By.xpath("/html/body/div[4]/div/div/div/div[1]/button")
            );
            cancelBtn.click();
        });

    // scroll element into view
    await driver.sleep(5 * 1000);
    const scrollElement = await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[4]/div[4]/div/div[1]/div/div[2]/div[4]/div[1]/div'))
    await driver.executeScript("arguments[0].scrollIntoView(true);", scrollElement)

    // add first item
    let addFirstBtn = await driver.findElement(
        By.xpath(
            "/html/body/div[1]/div[3]/div[4]/div[4]/div/div[1]/div/div[2]/div[4]/div[1]/div/div/div[3]/div[5]/div[2]/button"
        )
    );

    const addFirstItem = driver.actions({async: true});
    await addFirstItem.move({origin: addFirstBtn}).click().perform();
    console.log("Added first item");

    // continue shopping
    await driver.sleep(5 * 1000);
    let continueShopBtn = await driver.findElement(
        By.xpath(
            "/html/body/div[1]/header/div/div[3]/div/div/div[5]/div[2]/div[2]/div[3]/div/div/div[3]/div[3]/div/div/button"
        )
    );
    const continueShop = await driver.actions({async: true});
    await continueShop.move({origin: continueShopBtn}).click().perform();

    // add second item
    await driver.sleep(5 * 1000);
    let addSecondBtn = await driver.findElement(
        By.xpath(
            '/html/body/div[1]/div[3]/div[4]/div[4]/div/div[1]/div/div[2]/div[4]/div[2]/div/div/div[3]/div[5]/div[2]/button'
        )
    );
    const addSecondItem = driver.actions({async: true});
    await addSecondItem.move({origin: addSecondBtn}).click().perform();
    console.log("Added second item");

    // view cart
    await driver.sleep(5 * 1000);
    let cartBtn = await driver.findElement(
        By.xpath(
            '//a[@title=\'View Cart\']'
        )
    )
    const viewCart = driver.actions({async: true});
    await viewCart.move({origin: cartBtn}).click().perform();

    // take screenshot
    await driver.sleep(5 * 1000);
    await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync('TestResults/AutomationResult.png', image, 'base64');
        console.log("picture taken")
    });

    // close browser
    await driver.quit();
}

lushChallenge();
