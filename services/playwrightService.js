process.on("unhandledRejection", (reason) => {
    console.error("🔥 UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("🔥 UNCAUGHT EXCEPTION:", err);
});

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const DOWNLOAD_DIR = path.join(__dirname, "..", "downloads");

if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

async function selectOptionFuzzy(page, selector, target) {
    const options = await page.$$eval(selector + " option", (opts) =>
        opts.map((o) => ({
            value: o.value,
            text: o.textContent
        }))
    );

    const normalize = (s) =>
        s.trim().toLowerCase().replace(/\s+/g, " ");

    const targetNorm = normalize(target);

    let match = options.find(
        (o) => normalize(o.text) === targetNorm
    );

    if (!match) {
        match = options.find(
            (o) => normalize(o.text).includes(targetNorm)
        );
    }

    if (!match) {
        const available = options
            .map((o) => `"${o.text.trim()}"`)
            .filter((t) => t !== '""')
            .join(", ");

        throw new Error(
            `No option matching "${target}" found in ${selector}. Available options: ${available}`
        );
    }

    await page.selectOption(selector, {
        value: match.value
    });

    return match;
}

async function waitForOptionsLoaded(page, selector, minLength = 2) {
    await page.waitForFunction(
        ({ selector, minLength }) => {
            const select = document.querySelector(selector);
            return select && select.options.length >= minLength;
        },
        { selector, minLength }
    );
}

async function snapshotOptions(page, selector) {
    return page.$eval(selector, (el) =>
        Array.from(el.options)
            .map((o) => o.value + "|" + o.textContent)
            .join(",")
    );
}

async function waitForOptionsToRefresh(
    page,
    selector,
    previousSnapshot,
    minLength = 2
) {
    await page.waitForFunction(
        ({ selector, previousSnapshot, minLength }) => {
            const select = document.querySelector(selector);

            if (!select || select.options.length < minLength) {
                return false;
            }

            const current = Array.from(select.options)
                .map((o) => o.value + "|" + o.textContent)
                .join(",");

            return current !== previousSnapshot;
        },
        {
            selector,
            previousSnapshot,
            minLength
        },
        {
            timeout: 30000
        }
    );
}

async function launchBrowser() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 200
    });

    const context = await browser.newContext({
        acceptDownloads: true
    });

    const page = await context.newPage();

    page.on("dialog", async (dialog) => {
        console.log(
            "⚠️ PAGE DIALOG:",
            dialog.type(),
            "-",
            dialog.message()
        );

        await dialog.accept().catch(() => {});
    });

    return {
        browser,
        page
    };
}

async function automateEC(data) {
    console.log("automateEC started");

    const {
        district,
        mandal,
        village,
        surveyNo,
        khataNo
    } = data;

    const {
        browser,
        page
    } = await launchBrowser();

    try {
        await page.goto(
            "https://bhubharati.telangana.gov.in/login"
        );

        await page.waitForLoadState("networkidle");

        console.log("Please login manually...");

        await page.waitForURL("**/citizenDashboard**", {
            timeout: 300000
        });

        console.log("Dashboard loaded");

        await page
            .locator("div[onclick*='searchECDetails']")
            .click();

        await page.waitForURL("**/searchECDetails**", {
            timeout: 60000
        });

        console.log("EC Search page loaded");

        await page.waitForTimeout(5000);

        await waitForOptionsLoaded(page, "#districtId");

        console.log(
            "District options loaded, selecting:",
            district
        );

        let mandalSnapshot = await snapshotOptions(
            page,
            "#mandalID"
        );

        await selectOptionFuzzy(
            page,
            "#districtId",
            district
        );

        console.log("District Selected");

        await waitForOptionsToRefresh(
            page,
            "#mandalID",
            mandalSnapshot
        );

        console.log(
            "Mandal options loaded, selecting:",
            mandal
        );

        let villageSnapshot = await snapshotOptions(
            page,
            "#villageId"
        );

        await selectOptionFuzzy(
            page,
            "#mandalID",
            mandal
        );

        console.log("Mandal Selected");

        await waitForOptionsToRefresh(
            page,
            "#villageId",
            villageSnapshot
        );

        console.log(
            "Village options loaded, selecting:",
            village
        );

        let surveySnapshot = await snapshotOptions(
            page,
            "#surveyNo"
        );

        await selectOptionFuzzy(
            page,
            "#villageId",
            village
        );

        console.log("Village Selected");

        console.log("Waiting for Survey dropdown...");

        await waitForOptionsToRefresh(
            page,
            "#surveyNo",
            surveySnapshot
        );

        console.log("Survey loaded");

        let khataSnapshot = await snapshotOptions(
            page,
            "#khataid"
        );

        await selectOptionFuzzy(
            page,
            "#surveyNo",
            surveyNo
        );

        console.log("Survey Selected");

        const surveyOptions = await page.$$eval(
            "#surveyNo option",
            (options) =>
                options.map((o) =>
                    o.textContent.trim()
                )
        );

        console.log("Survey Options:", surveyOptions);

        console.log("Waiting for Khata to load...");

        await waitForOptionsToRefresh(
            page,
            "#khataid",
            khataSnapshot
        );

        console.log(
            "Khata No options loaded, selecting:",
            khataNo
        );

        await selectOptionFuzzy(
            page,
            "#khataid",
            khataNo
        );

        console.log("Khata Selected");
        console.log("All fields selected");
        await page.click("#search");
        console.log("Searching EC...");
        await page.waitForSelector(
            "img[src='img/pdfdownload.png']",
            {
                timeout: 60000
            }
        );

        console.log("EC Result Loaded");

        const downloadPromise =
            page.waitForEvent("download");

        await page.click(
            "img[src='img/pdfdownload.png']"
        );

        const download = await downloadPromise;
        const pdfPath = path.join(
            DOWNLOAD_DIR,
            `EC_${Date.now()}.pdf`
        );

        await download.saveAs(pdfPath);

        console.log("PDF Downloaded:", pdfPath);

        return pdfPath;
    } catch (err) {
        console.error(
            "automateEC failed:",
            err.message
        );
        throw err;
    } finally {
        console.log("Browser left open for debugging");
    }
}
module.exports = {
    launchBrowser,
    automateEC
};