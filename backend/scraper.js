// const playwright = require('playwright');
// const fs = require('fs');
// const path = require('path');
// const xlsx = require('xlsx');
// const { createObjectCsvWriter } = require('csv-writer');

// // Business class to hold individual business data
// class Business {
//   constructor({
//     name = '',
//     address = '',
//     website = '',
//     phone_number = '',
//     reviews_count = 0,
//     reviews_average = 0.0,
//     latitude = 0.0,
//     longitude = 0.0,
//   }) {
//     this.name = name;
//     this.address = address;
//     this.website = website;
//     this.phone_number = phone_number;
//     this.reviews_count = reviews_count;
//     this.reviews_average = reviews_average;
//     this.latitude = latitude;
//     this.longitude = longitude;
//   }
// }

// // BusinessList class to manage and save the business data
// class BusinessList {
//   constructor() {
//     this.businessList = [];
//     this.saveAt = 'output';
//   }

//   toJSON() {
//     return this.businessList.map((business) => ({ ...business }));
//   }

//   saveToExcel(filename) {
//     if (!fs.existsSync(this.saveAt)) {
//       fs.mkdirSync(this.saveAt);
//     }
//     const filePath = path.join(this.saveAt, `${filename}.xlsx`);
//     const worksheet = xlsx.utils.json_to_sheet(this.toJSON());
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'BusinessData');
//     xlsx.writeFile(workbook, filePath);
//   }

//   async saveToCSV(filename) {
//     if (!fs.existsSync(this.saveAt)) {
//       fs.mkdirSync(this.saveAt);
//     }
//     const filePath = path.join(this.saveAt, `${filename}.csv`);
//     const csvWriter = createObjectCsvWriter({
//       path: filePath,
//       header: Object.keys(new Business({})).map((key) => ({ id: key, title: key })),
//     });
//     await csvWriter.writeRecords(this.businessList);
//   }
// }

// // Extract coordinates from URL
// function extractCoordinatesFromUrl(url) {
//   const coordinates = url.split('/@')[1].split('/')[0];
//   const [latitude, longitude] = coordinates.split(',').map(parseFloat);
//   return { latitude, longitude };
// }

// // Helper function to safely interact with elements
// // Helper function to safely interact with elements
// async function safeLocatorAction(page, selector, action, options = { timeout: 120000, nth: 0 }) {
//   try {
//     await page.waitForSelector(selector, { timeout: options.timeout });
//     const locator = page.locator(selector);
    
//     if (action === 'click') {
//       await locator.nth(options.nth).click();
//     } else if (action === 'text') {
//       return await locator.nth(options.nth).textContent();
//     }
//   } catch (error) {
//     console.log(`Error occurred with selector: ${selector} - ${error}`);
//     return null;
//   }
// }

// // Main function for scraping
// async function scrapeGoogleMaps(searchTerm, total = 1000000) {
//   const browser = await playwright.chromium.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto('https://www.google.com/maps', { timeout: 60000 });
//   await page.waitForTimeout(10000);  // Added delay for page to fully load

//   console.log(`Searching for: ${searchTerm}`);
//   await page.fill('//input[@id="searchboxinput"]', searchTerm);
//   await page.waitForTimeout(5000);
//   await page.keyboard.press('Enter');
//   await page.waitForTimeout(10000);  // Wait for search results to load

//   let businessList = new BusinessList();
//   let previouslyCounted = 0;

//   while (true) {
//     await page.mouse.wheel(0, 10000);
//     await page.waitForTimeout(5000);
  
//     const listingsCount = await page
//       .locator('//a[contains(@href, "https://www.google.com/maps/place")]')
//       .count();
  
//     if (listingsCount >= total || listingsCount === previouslyCounted) {
//       const listings = await page
//         .locator('//a[contains(@href, "https://www.google.com/maps/place")]')
//         .all();
//       console.log(`Total Scraped: ${listings.length}`);
      
//       for (let i = 0; i < listings.length; i++) {
//         try {
//           await listings[i].click();
//           await page.waitForTimeout(5000);
  
//           const business = new Business({
//             name: await safeLocatorAction(page, 'a[aria-label]', 'text', { nth: i }),
//             address: await safeLocatorAction(
//               page,
//               '//button[@data-item-id="address"]//div[contains(@class, "fontBodyMedium")]',
//               'text'
//             ),
//             website: await safeLocatorAction(
//               page,
//               '//a[@data-item-id="authority"]//div[contains(@class, "fontBodyMedium")]',
//               'text'
//             ),
//             phone_number: await safeLocatorAction(
//               page,
//               '//button[contains(@data-item-id, "phone:tel:")]//div[contains(@class, "fontBodyMedium")]',
//               'text'
//             ),
//             reviews_count: parseInt(
//               (await safeLocatorAction(
//                 page,
//                 '//button[@jsaction="pane.reviewChart.moreReviews"]//span',
//                 'text'
//               ))?.split(' ')[0].replace(',', '') || 0
//             ),
//             reviews_average: parseFloat(
//               (await safeLocatorAction(
//                 page,
//                 '//div[@jsaction="pane.reviewChart.moreReviews"]//div[@role="img"]',
//                 'text'
//               ))?.split(' ')[0].replace(',', '.') || 0.0
//             ),
//             ...extractCoordinatesFromUrl(page.url()),
//           });
  
//           businessList.businessList.push(business);
//         } catch (error) {
//           console.log(`Error occurred: ${error}`);
//         }
//       }
//       break;
//     } else {
//       previouslyCounted = listingsCount;
//       console.log(`Currently Scraped: ${listingsCount}`);
//     }
//   }
//       await browser.close();

//   const filename = searchTerm.replace(' ', '_');
//   businessList.saveToExcel(`google_maps_data_${filename}`);
//   await businessList.saveToCSV(`google_maps_data_${filename}`);
// }


// module.exports = { scrapeGoogleMaps };


// const playwright = require('playwright');
// const fs = require('fs');
// const path = require('path');
// const xlsx = require('xlsx');
// const { createObjectCsvWriter } = require('csv-writer');

// // Business class to hold individual business data
// class Business {
//   constructor({
//     name = '',
//     address = '',
//     website = '',
//     phone_number = '',
//     reviews_count = 0,
//     reviews_average = 0.0,
//     latitude = 0.0,
//     longitude = 0.0,
//   }) {
//     this.name = name;
//     this.address = address;
//     this.website = website;
//     this.phone_number = phone_number;
//     this.reviews_count = reviews_count;
//     this.reviews_average = reviews_average;
//     this.latitude = latitude;
//     this.longitude = longitude;
//   }
// }

// // BusinessList class to manage and save the business data
// class BusinessList {
//   constructor() {
//     this.businessList = [];
//     this.saveAt = 'output';
//   }

//   toJSON() {
//     return this.businessList.map((business) => ({ ...business }));
//   }

//   saveToExcel(filename) {
//     if (!fs.existsSync(this.saveAt)) {
//       fs.mkdirSync(this.saveAt);
//     }
//     const filePath = path.join(this.saveAt, `${filename}.xlsx`);
//     const worksheet = xlsx.utils.json_to_sheet(this.toJSON());
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'BusinessData');
//     xlsx.writeFile(workbook, filePath);
//   }

//   async saveToCSV(filename) {
//     if (!fs.existsSync(this.saveAt)) {
//       fs.mkdirSync(this.saveAt);
//     }
//     const filePath = path.join(this.saveAt, `${filename}.csv`);
//     const csvWriter = createObjectCsvWriter({
//       path: filePath,
//       header: Object.keys(new Business({})).map((key) => ({ id: key, title: key })),
//     });
//     await csvWriter.writeRecords(this.businessList);
//   }
// }

// // Extract coordinates from URL
// function extractCoordinatesFromUrl(url) {
//   const coordinates = url.split('/@')[1].split('/')[0];
//   const [latitude, longitude] = coordinates.split(',').map(parseFloat);
//   return { latitude, longitude };
// }

// // Helper function to retry actions with a selector
// async function retryLocatorAction(page, selector, action, retries = 3, timeout = 20000, nth = 0) {
//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       await page.waitForSelector(selector, { timeout });
//       const locator = page.locator(selector);

//       if (action === 'click') {
//         await locator.nth(nth).click();
//       } else if (action === 'text') {
//         return await locator.nth(nth).textContent();
//       }
//       break; // If successful, break out of the retry loop
//     } catch (error) {
//       console.log(`Attempt ${attempt} failed for selector: ${selector} - ${error}`);
//       if (attempt === retries) {
//         return null; // Return null if all retries fail
//       }
//     }
//   }
// }

// // Main function for scraping
// async function scrapeGoogleMaps(searchTerm, total = 1000000) {
//   const browser = await playwright.chromium.launch({ headless: true }); // Headless mode for better performance
//   const page = await browser.newPage();

//   // Block unnecessary resources like images, stylesheets, and fonts
//   await page.route('**/*', (route) => {
//     const resourceType = route.request().resourceType();
//     if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
//       route.abort();
//     } else {
//       route.continue();
//     }
//   });

//   await page.goto('https://www.google.com/maps', { timeout: 60000 });
//   await page.waitForTimeout(5000);  // Delay for the page to fully load

//   console.log(`Searching for: ${searchTerm}`);
//   await page.fill('//input[@id="searchboxinput"]', searchTerm);
//   await page.waitForTimeout(3000);
//   await page.keyboard.press('Enter');
//   await page.waitForTimeout(5000);  // Wait for search results to load

//   let businessList = new BusinessList();
//   let previouslyCounted = 0;
//   let sameCountCheck = 0; // Counter to stop if the number of listings doesn't change

//   while (true) {
//     await page.mouse.wheel(0, 10000);  // Scroll down to load more listings
//     await page.waitForTimeout(5000);    // Wait for new listings to load

//     const listingsCount = await page
//       .locator('//a[contains(@href, "https://www.google.com/maps/place")]')
//       .count();

//     if (listingsCount === previouslyCounted) {
//       sameCountCheck++;
//       if (sameCountCheck >= 3) {
//         break;  // Stop if the count hasn't changed after multiple attempts
//       }
//     } else {
//       sameCountCheck = 0;  // Reset the check if new listings are found
//     }

//     previouslyCounted = listingsCount;
//     console.log(`Currently Scraped: ${listingsCount}`);

//     // Process each listing
//     const listings = await page.locator('//a[contains(@href, "https://www.google.com/maps/place")]').all();

//     for (let i = 0; i < listings.length; i++) {
//       try {
//         await listings[i].click();
//         await page.waitForTimeout(5000);

//         const business = new Business({
//           name: await retryLocatorAction(page, 'a[aria-label]', 'text', 3, 20000, i),
//           address: await retryLocatorAction(
//             page,
//             '//button[@data-item-id="address"]//div[contains(@class, "fontBodyMedium")]',
//             'text',
//             3,
//             20000
//           ),
//           website: await retryLocatorAction(
//             page,
//             '//a[@data-item-id="authority"]//div[contains(@class, "fontBodyMedium")]',
//             'text',
//             3,
//             20000
//           ),
//           phone_number: await retryLocatorAction(
//             page,
//             '//button[contains(@data-item-id, "phone:tel:")]//div[contains(@class, "fontBodyMedium")]',
//             'text',
//             3,
//             20000
//           ),
//           reviews_count: parseInt(
//             (await retryLocatorAction(
//               page,
//               '//button[@jsaction="pane.reviewChart.moreReviews"]//span',
//               'text',
//               3,
//               20000
//             ))?.split(' ')[0].replace(',', '') || 0
//           ),
//           reviews_average: parseFloat(
//             (await retryLocatorAction(
//               page,
//               '//div[@jsaction="pane.reviewChart.moreReviews"]//div[@role="img"]',
//               'text',
//               3,
//               20000
//             ))?.split(' ')[0].replace(',', '.') || 0.0
//           ),
//           ...extractCoordinatesFromUrl(page.url()),
//         });

//         businessList.businessList.push(business);
//       } catch (error) {
//         console.log(`Error occurred: ${error}`);
//       }
//     }

//     if (listingsCount >= total) {
//       break;  // Stop if total listings count reaches the defined limit
//     }
//   }

//   await browser.close();

//   const filename = searchTerm.replace(' ', '_');
//   businessList.saveToExcel(`google_maps_data_${filename}`);
//   await businessList.saveToCSV(`google_maps_data_${filename}`);
// }

// module.exports = { scrapeGoogleMaps };

// const playwright = require('playwright');
// const fs = require('fs');
// const path = require('path');
// const xlsx = require('xlsx');
// const { createObjectCsvWriter } = require('csv-writer');

// // Business class to hold individual business data
// class Business {
//   constructor({
//     name = '',
//     address = '',
//     website = '',
//     phone_number = '',
//     reviews_count = 0,
//     reviews_average = 0.0,
//     latitude = 0.0,
//     longitude = 0.0,
//   }) {
//     this.name = name;
//     this.address = address;
//     this.website = website;
//     this.phone_number = phone_number;
//     this.reviews_count = reviews_count;
//     this.reviews_average = reviews_average;
//     this.latitude = latitude;
//     this.longitude = longitude;
//   }
// }

// // BusinessList class to manage and save the business data
// class BusinessList {
//   constructor() {
//     this.businessList = [];
//     this.saveAt = 'output';
//   }

//   toJSON() {
//     return this.businessList.map((business) => ({ ...business }));
//   }

//   saveToExcel(filename) {
//     if (!fs.existsSync(this.saveAt)) {
//       fs.mkdirSync(this.saveAt);
//     }
//     const filePath = path.join(this.saveAt, `${filename}.xlsx`);
//     const worksheet = xlsx.utils.json_to_sheet(this.toJSON());
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'BusinessData');
//     xlsx.writeFile(workbook, filePath);
//   }

//   async saveToCSV(filename) {
//     if (!fs.existsSync(this.saveAt)) {
//       fs.mkdirSync(this.saveAt);
//     }
//     const filePath = path.join(this.saveAt, `${filename}.csv`);
//     const csvWriter = createObjectCsvWriter({
//       path: filePath,
//       header: Object.keys(new Business({})).map((key) => ({ id: key, title: key })),
//     });
//     await csvWriter.writeRecords(this.businessList);
//   }
// }

// // Extract coordinates from URL
// function extractCoordinatesFromUrl(url) {
//   const coordinates = url.split('/@')[1].split('/')[0];
//   const [latitude, longitude] = coordinates.split(',').map(parseFloat);
//   return { latitude, longitude };
// }

// // Helper function to safely interact with elements
// async function retryLocatorAction(page, selector, action, retries = 2, timeout = 15000, nth = 0) {
//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       await page.waitForSelector(selector, { timeout });
//       const locator = page.locator(selector);

//       if (action === 'click') {
//         await locator.nth(nth).click();
//       } else if (action === 'text') {
//         return await locator.nth(nth).textContent();
//       }
//       break; // If successful, break out of the retry loop
//     } catch (error) {
//       console.log(`Attempt ${attempt} failed for selector: ${selector} - ${error}`);
//       if (attempt === retries) {
//         return null; // Return null if all retries fail
//       }
//     }
//   }
// }

// // Main function for scraping
// async function scrapeGoogleMaps(searchTerm, total = 200) {  // Reduced total for faster results
//   const browser = await playwright.chromium.launch({ headless: true }); // Headless mode for better performance
//   const page = await browser.newPage();

//   // Block unnecessary resources like images, stylesheets, and fonts
//   await page.route('**/*', (route) => {
//     const resourceType = route.request().resourceType();
//     if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
//       route.abort();
//     } else {
//       route.continue();
//     }
//   });

//   await page.goto('https://www.google.com/maps', { timeout: 60000 });
//   await page.waitForTimeout(2000);  // Reduced initial timeout

//   console.log(`Searching for: ${searchTerm}`);
//   await page.fill('//input[@id="searchboxinput"]', searchTerm);
//   await page.waitForTimeout(2000);  // Reduced waiting for searchbox fill
//   await page.keyboard.press('Enter');
//   await page.waitForTimeout(3000);  // Reduced search results load time

//   let businessList = new BusinessList();
//   let previouslyCounted = 0;

//   while (true) {
//     await page.mouse.wheel(0, 2000);  // Scroll faster to load listings in batches
//     await page.waitForTimeout(3000);  // Reduced waiting time between scrolls

//     const listingsCount = await page
//       .locator('//a[contains(@href, "https://www.google.com/maps/place")]')
//       .count();

//     if (listingsCount >= total || listingsCount === previouslyCounted) {
//       const listings = await page
//         .locator('//a[contains(@href, "https://www.google.com/maps/place")]')
//         .all();
//       console.log(`Total Scraped: ${listings.length}`);

//       // Limit number of concurrent clicks for faster processing
//       await Promise.all(listings.slice(0, total).map(async (listing, i) => {
//         try {
//           await listing.click();
//           await page.waitForTimeout(3000);  // Reduced timeout after clicking a listing

//           const business = new Business({
//             name: await retryLocatorAction(page, 'a[aria-label]', 'text', 2, 10000, i),
//             address: await retryLocatorAction(
//               page,
//               '//button[@data-item-id="address"]//div[contains(@class, "fontBodyMedium")]',
//               'text',
//               2,
//               10000
//             ),
//             website: await retryLocatorAction(
//               page,
//               '//a[@data-item-id="authority"]//div[contains(@class, "fontBodyMedium")]',
//               'text',
//               2,
//               10000
//             ),
//             phone_number: await retryLocatorAction(
//               page,
//               '//button[contains(@data-item-id, "phone:tel:")]//div[contains(@class, "fontBodyMedium")]',
//               'text',
//               2,
//               10000
//             ),
//             reviews_count: parseInt(
//               (await retryLocatorAction(
//                 page,
//                 '//button[@jsaction="pane.reviewChart.moreReviews"]//span',
//                 'text',
//                 2,
//                 10000
//               ))?.split(' ')[0].replace(',', '') || 0
//             ),
//             reviews_average: parseFloat(
//               (await retryLocatorAction(
//                 page,
//                 '//div[@jsaction="pane.reviewChart.moreReviews"]//div[@role="img"]',
//                 'text',
//                 2,
//                 10000
//               ))?.split(' ')[0].replace(',', '.') || 0.0
//             ),
//             ...extractCoordinatesFromUrl(page.url()),
//           });

//           businessList.businessList.push(business);
//         } catch (error) {
//           console.log(`Error occurred: ${error}`);
//         }
//       }));
//       break;
//     } else {
//       previouslyCounted = listingsCount;
//       console.log(`Currently Scraped: ${listingsCount}`);
//     }
//   }

//   await browser.close();

//   const filename = searchTerm.replace(' ', '_');
//   businessList.saveToExcel(`google_maps_data_${filename}`);
//   await businessList.saveToCSV(`google_maps_data_${filename}`);
// }

// module.exports = { scrapeGoogleMaps };


// const { chromium } = require('playwright');

// async function scrapeGoogleMaps(query, total = 10) {
//     const browser = await chromium.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto('https://www.google.com/maps');
//     await page.fill('#searchboxinput', query);
//     await page.keyboard.press('Enter');
//     await page.waitForTimeout(5000);

//     let scrapedData = [];

//     while (scrapedData.length < total) {
//         await page.mouse.wheel(0, 10000);  // Scroll
//         await page.waitForTimeout(3000);

//         let listings = await page.$$eval('a[href*="https://www.google.com/maps/place"]', anchors => {
//             return anchors.map(anchor => anchor.getAttribute('aria-label'));
//         });

//         for (let i = 0; i < listings.length; i++) {
//             const business = {};
//             await page.click(`a[href*="https://www.google.com/maps/place"]:nth-child(${i + 1})`);
//             await page.waitForTimeout(3000);

//             business.name = await page.$eval('h1', el => el.textContent).catch(() => '');
//             business.address = await page.$eval('button[data-item-id="address"] div', el => el.textContent).catch(() => '');
//             business.phone = await page.$eval('button[data-item-id^="phone:tel:"] div', el => el.textContent).catch(() => '');
//             business.website = await page.$eval('a[data-item-id="authority"] div', el => el.textContent).catch(() => '');

//             scrapedData.push(business);
//             if (scrapedData.length >= total) break;
//         }
//     }

//     await browser.close();
//     return scrapedData;
// }

// module.exports = { scrapeGoogleMaps };

// const { chromium } = require('playwright');

// async function scrapeGoogleMaps(query, total = 20) {
//     const browser = await chromium.launch({ headless: true });
//     const page = await browser.newPage();
//     page.setDefaultTimeout(60000); // Set default timeout to 60 seconds
//     await page.goto('https://www.google.com/maps');
//     await page.fill('#searchboxinput', query);
//     await page.keyboard.press('Enter');
//     await page.waitForTimeout(5000); // Wait for results to load

//     let scrapedData = [];
//     let listingsCount = 0;
//     let retries = 0;

//     while (scrapedData.length < total && retries < 5) {
//         await page.mouse.wheel(0, 10000);  // Scroll down to load more results
//         await page.waitForTimeout(3000);

//         let listings = await page.$$('a[href*="https://www.google.com/maps/place"]');

//         for (let i = 0; i < listings.length; i++) {
//             if (scrapedData.length >= total) break; // Stop if we reached the total count

//             try {
//                 await listings[i].click();  // Try clicking the listing
//                 await page.waitForTimeout(5000);  // Wait for the page to load

//                 const business = {};
//                 business.name = await page.$eval('h1', el => el.textContent).catch(() => '');
//                 business.address = await page.$eval('button[data-item-id="address"] div', el => el.textContent).catch(() => '');
//                 business.phone = await page.$eval('button[data-item-id^="phone:tel:"] div', el => el.textContent).catch(() => '');
//                 business.website = await page.$eval('a[data-item-id="authority"] div', el => el.textContent).catch(() => '');

//                 scrapedData.push(business);
//                 listingsCount++;
//             } catch (error) {
//                 console.error(`Error processing listing ${i + 1}:`, error);
//                 retries++;  // Increment retries if an error occurs
//                 if (retries >= 5) {
//                     console.log('Too many errors, exiting...');
//                     break;
//                 }
//             }

//             if (scrapedData.length >= total) break;  // Stop once we reach the total count
//         }

//         if (listingsCount === listings.length) {
//             console.log(`All listings processed. Total: ${scrapedData.length}`);
//             break;
//         }
//     }

//     await browser.close();
//     return scrapedData;
// }

// module.exports = { scrapeGoogleMaps };

// const { chromium } = require('playwright');

// async function scrapeGoogleMaps(query, total = 50) {
//     const browser = await chromium.launch({ headless: true });
//     const page = await browser.newPage();
//     page.setDefaultTimeout(60000); // Set default timeout to 60 seconds
//     await page.goto('https://www.google.com/maps');
    
//     // Perform the search
//     await page.fill('#searchboxinput', query);
//     await page.keyboard.press('Enter');
//     await page.waitForTimeout(5000); // Wait for results to load

//     let scrapedData = [];
//     let listingsCount = 0;
//     let retries = 0;

//     while (scrapedData.length < total && retries < 50) {
//         await page.mouse.wheel(0, 10000);  // Scroll down to load more results
//         await page.waitForTimeout(3000);

//         // Get all listing links
//         let listings = await page.$$('a[href*="https://www.google.com/maps/place"]');
//         console.log(`Found ${listings.length} listings`);

//         for (let i = 0; i < listings.length; i++) {
//             if (scrapedData.length >= total) break; // Stop if we reached the total count

//             try {
//                 await listings[i].click();  // Try clicking the listing
//                 await page.waitForTimeout(5000);  // Wait for the page to load

//                 const business = {};

//                 // Corrected name selector: it should target the main business title in the listing panel
//                 business.name = await page.$eval('h1.section-hero-header-title-title span', el => el.textContent).catch(() => 'N/A');
                
//                 // Address
//                 business.address = await page.$eval('button[data-item-id="address"] div', el => el.textContent).catch(() => 'N/A');
                
//                 // Phone number
//                 business.phone = await page.$eval('button[data-item-id^="phone:tel:"] div', el => el.textContent).catch(() => 'N/A');
                
//                 // Website
//                 business.website = await page.$eval('a[data-item-id="authority"] div', el => el.textContent).catch(() => 'N/A');

//                 scrapedData.push(business);
//                 listingsCount++;
//             } catch (error) {
//                 console.error(`Error processing listing ${i + 1}:`, error);
//                 retries++;  // Increment retries if an error occurs
//                 if (retries >= 5) {
//                     console.log('Too many errors, exiting...');
//                     break;
//                 }
//             }

//             if (scrapedData.length >= total) break;  // Stop once we reach the total count
//         }

//         if (listingsCount === listings.length) {
//             console.log(`All listings processed. Total: ${scrapedData.length}`);
//             break;
//         }
//     }

//     await browser.close();
//     return scrapedData;
// }

// module.exports = { scrapeGoogleMaps };






// const { chromium } = require('playwright');

// async function scrapeGoogleMaps(query, total = 100) {
//     const browser = await chromium.launch({ headless: true });
//     const page = await browser.newPage();
//     page.setDefaultTimeout(60000); // Set default timeout to 60 seconds
//     await page.goto('https://www.google.com/maps');

//     await page.fill('#searchboxinput', query);
//     await page.keyboard.press('Enter');
//     await page.waitForSelector('a[href*="https://www.google.com/maps/place"]', { timeout: 10000 });

//     let scrapedData = [];
//     let scrollAttempts = 0;
//     let prevListingsCount = 0;

//     while (scrapedData.length < total && scrollAttempts < 30) {
//         let listings = await page.$$('a[href*="https://www.google.com/maps/place"]');
//         console.log(`Found ${listings.length} listings after scroll attempt ${scrollAttempts + 1}`);

//         for (let i = 0; i < listings.length; i++) {
//             if (scrapedData.length >= total) break;

//             let retries = 0;
//             while (retries < 3) {
//                 try {
//                     await listings[i].click();
//                     await page.waitForTimeout(5000);  // Wait for page to load

//                     const business = {};

//                     // Updated: Fetch name from the `aria-label` attribute
//                     business.name = await listings[i].getAttribute('aria-label').catch(() => 'N/A');

//                     // Scrape other details
//                     business.address = await page.$eval('button[data-item-id="address"] div', el => el.textContent.trim()).catch(() => 'N/A');
//                     business.phone = await page.$eval('button[data-item-id^="phone:tel:"] div', el => el.textContent.trim()).catch(() => 'N/A');
//                     business.website = await page.$eval('a[data-item-id="authority"] div', el => el.textContent.trim()).catch(() => 'N/A');

//                    // Output the scraped name for debugging
//                     scrapedData.push(business);
//                     break;
//                 } catch (error) {
//                     console.error(`Error processing listing ${i + 1}:`, error);
//                     retries++;
//                     if (retries >= 3) {
//                         console.log(`Skipping listing ${i + 1} after multiple errors.`);
//                         break;
//                     }
//                 }
//             }
//         }

//         if (scrapedData.length >= total) break;

//         prevListingsCount = listings.length;
//         await page.mouse.wheel(0, 10000);
//         await page.waitForTimeout(3000);

//         listings = await page.$$('a[href*="https://www.google.com/maps/place"]');
//         if (listings.length === prevListingsCount) {
//             console.log('No more new listings loaded, stopping...');
//             break;
//         }

//         scrollAttempts++;
//     }

//     await browser.close();
//     return scrapedData;
// }

// module.exports = { scrapeGoogleMaps };
//------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

const { chromium } = require('playwright');

async function scrapeGoogleMaps(query, total = 100) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultTimeout(6000); // Set default timeout to 60 seconds
    await page.goto('https://www.google.com/maps');

    // Perform the search
    await page.fill('#searchboxinput', query);
    await page.keyboard.press('Enter');
    await page.waitForSelector('a[href*="https://www.google.com/maps/place"]', { timeout: 3000 });

    let scrapedData = [];
    let scrollAttempts = 0;
    let prevListingsCount = 0;

    while (scrapedData.length < total && scrollAttempts < 30) {
        let listings = await page.$$('a[href*="https://www.google.com/maps/place"]');
        console.log(`Found ${listings.length} listings after scroll attempt ${scrollAttempts + 1}`);

        for (let i = 0; i < listings.length; i++) {
            if (scrapedData.length >= total) break;

            let retries = 0;
            while (retries < 3) {
                try {
                    await listings[i].click();
                    await page.waitForTimeout(2000);  // Wait for page to load

                    const business = {};

                    // Fetch name from the `aria-label` attribute
                    business.name = await listings[i].getAttribute('aria-label').catch(() => 'N/A');

                    // Scrape other details
                    business.address = await page.$eval('button[data-item-id="address"] div', el => el.textContent.trim()).catch(() => 'N/A');
                    business.phone = await page.$eval('button[data-item-id^="phone:tel:"] div', el => el.textContent.trim()).catch(() => 'N/A');
                    business.website = await page.$eval('a[data-item-id="authority"] div', el => el.textContent.trim()).catch(() => 'N/A');

                    // Scrape reviews count (based on your provided XPath)
                    //business.reviews = await page.$eval('//button[@jsaction="pane.reviewChart.moreReviews"]//span', el => el.textContent.trim()).catch(() => 'N/A');

                    // Scrape ratings (based on your provided XPath)
                    business.rating = await page.$eval('//div[@jsaction="pane.reviewChart.moreReviews"]//div[@role="img"]', el => el.getAttribute('aria-label')).catch(() => 'N/A');

                    
                    scrapedData.push(business);
                    break;
                } catch (error) {
                    console.error(`Error processing listing ${i + 1}:`, error);
                    retries++;
                    if (retries >= 3) {
                        console.log(`Skipping listing ${i + 1} after multiple errors.`);
                        break;
                    }
                }
            }
        }

        if (scrapedData.length >= total) break;

        prevListingsCount = listings.length;
        await page.mouse.wheel(0, 1000);
        await page.waitForTimeout(600);

        listings = await page.$$('a[href*="https://www.google.com/maps/place"]');
        if (listings.length === prevListingsCount) {
            console.log('No more new listings loaded, stopping...');
            break;
        }

        scrollAttempts++;
    }

    await browser.close();
    return scrapedData;
}

module.exports = { scrapeGoogleMaps };
//-----------------------------------------------------------
//------------------------------------------------------







// const { chromium } = require('playwright');

// async function scrapeGoogleMaps(query, total = 100) {
//     const browser = await chromium.launch({ headless: true });
//     const page = await browser.newPage();
//     page.setDefaultTimeout(60000);  // Default timeout

//     // Go to Google Maps
//     await page.goto('https://www.google.com/maps');
    
//     // Perform the search
//     await page.fill('#searchboxinput', query);
//     await page.keyboard.press('Enter');
    
//     // Wait for the listings to appear
//     await page.waitForSelector('a[href*="https://www.google.com/maps/place"]', { timeout: 10000 });

//     let scrapedData = [];
//     let scrollAttempts = 0;
//     let prevListingsCount = 0;

//     // Increase the batch size for faster scrolling
//     while (scrapedData.length < total && scrollAttempts < 20) {  // Limit to 20 scroll attempts for efficiency
//         let listings = await page.$$('a[href*="https://www.google.com/maps/place"]');
//         console.log(`Found ${listings.length} listings after scroll attempt ${scrollAttempts + 1}`);
        
//         if (listings.length > prevListingsCount) {
//             const listingUrls = await Promise.all(listings.map(listing => listing.getAttribute('href')));

//             // Scrape new listings and ignore already scraped ones
//             const newListingUrls = listingUrls.slice(scrapedData.length, total);
//             const listingPromises = newListingUrls.map(async (url) => {
//                 try {
//                     const listingPage = await browser.newPage();
//                     await listingPage.goto(url, { waitUntil: 'domcontentloaded' });

//                     // Collect business details
//                     const business = {};
//                     business.name = await listingPage.$eval('[aria-label]', el => el.getAttribute('aria-label')).catch(() => 'N/A');
//                     business.address = await listingPage.$eval('button[data-item-id="address"] div', el => el.textContent.trim()).catch(() => 'N/A');
//                     business.phone = await listingPage.$eval('button[data-item-id^="phone:tel:"] div', el => el.textContent.trim()).catch(() => 'N/A');
//                     business.website = await listingPage.$eval('a[data-item-id="authority"] div', el => el.textContent.trim()).catch(() => 'N/A');
//                     business.rating = await listingPage.$eval('div[role="img"]', el => el.getAttribute('aria-label')).catch(() => 'N/A');

//                     scrapedData.push(business);
//                     await listingPage.close();
//                 } catch (error) {
//                     console.error(`Error scraping URL: ${url}`, error);
//                 }
//             });

//             await Promise.all(listingPromises);

//             if (scrapedData.length >= total) break;

//             prevListingsCount = listings.length;

//             // Scroll down further and wait briefly
//             await page.evaluate(() => window.scrollBy(0, 6000));
//             await page.waitForTimeout(2000);  // Shortened timeout to speed up the process
//         } else {
//             // Handle scenarios where no new listings are loaded
//             const nextButton = await page.$('button[aria-label="Next"]');
//             if (nextButton) {
//                 await nextButton.click();
//                 await page.waitForTimeout(2000);
//             } else {
//                 console.log('No more new listings loaded, stopping...');
//                 break;
//             }
//         }

//         scrollAttempts++;
//     }

//     await browser.close();
//     return scrapedData;
// }

// module.exports = { scrapeGoogleMaps };
