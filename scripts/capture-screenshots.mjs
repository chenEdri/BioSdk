import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { resolve } from "path";

const BASE_URL = "http://localhost:5174";
const OUTPUT_DIR = resolve("docs/screenshots");

async function capture() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // 1. Home page (logged out)
  await page.goto(`${BASE_URL}/`);
  await page.waitForSelector(".page");
  await page.screenshot({ path: `${OUTPUT_DIR}/01-home.png` });
  console.log("✓ Home page captured");

  // 2. Login page
  await page.goto(`${BASE_URL}/login`);
  await page.waitForSelector(".page");
  await page.screenshot({ path: `${OUTPUT_DIR}/02-login.png` });
  console.log("✓ Login page captured");

  // 3. Login with user
  await page.type("#username", "demo@example.com");
  await page.click('button[type="submit"]');
  await page.waitForSelector(".response-box");
  await page.screenshot({ path: `${OUTPUT_DIR}/03-login-init-response.png` });
  console.log("✓ Login init response captured");

  // 4. Wait for redirect to account
  await page
    .waitForNavigation({ waitUntil: "networkidle0", timeout: 5000 })
    .catch(() => {});
  await page.goto(`${BASE_URL}/account`);
  await page.waitForSelector(".page");
  await page.screenshot({ path: `${OUTPUT_DIR}/04-account-overview.png` });
  console.log("✓ Account overview captured");

  // 5. Show Activity
  await page.click(".actions-row button");
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `${OUTPUT_DIR}/05-account-activity.png` });
  console.log("✓ Account activity captured");

  // 6. Payment page
  await page.goto(`${BASE_URL}/payment`);
  await page.waitForSelector(".page");
  await page.screenshot({ path: `${OUTPUT_DIR}/06-payment.png` });
  console.log("✓ Payment page captured");

  // 7. Make Payment (getScore)
  await page.click(".actions button");
  await page.waitForSelector(".response-box");
  await page.screenshot({
    path: `${OUTPUT_DIR}/07-payment-getscore-response.png`,
  });
  console.log("✓ Payment getScore response captured");

  await browser.close();
  console.log(`\nAll screenshots saved to ${OUTPUT_DIR}`);
}

capture().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
