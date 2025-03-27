```typescript
import { test } from '@playwright/test';

test.describe('Insurance Application Tests', () => {

  test('Verify IDV agreement for vehicles older than 5 years', async ({ page }) => {
    await test.step('Access the depreciation schedule module in the insurance application', async () => {
      await page.goto('https://insurance-app.com/depreciation');
    });

    await test.step('Select a vehicle older than 5 years for evaluating IDV', async () => {
      await page.click('#vehicle-age-selection');
      await page.selectOption('#vehicle-age-dropdown', 'olderThan5');
    });

    await test.step('Negotiate and agree upon an IDV with the insured party', async () => {
      await page.fill('#proposed-idv', '4500');
      await page.click('#agree-idv');
    });

    await test.step('Confirm and document the agreed IDV value in the system', async () => {
      await page.click('#confirm-idv');
      await page.waitForSelector('#idv-confirmation', { state: 'visible' });
      const idvValue = await page.textContent('#idv-value');
      test.expect(idvValue).toBe('4500');
    });
  });

  test('Verify depreciation schedule for vehicles less than 5 years old', async ({ page }) => {
    await test.step('Access the depreciation schedule module in the insurance application', async () => {
      await page.goto('https://insurance-app.com/depreciation');
    });

    await test.step('Select a vehicle less than 5 years old for calculating IDV', async () => {
      await page.click('#vehicle-age-selection');
      await page.selectOption('#vehicle-age-dropdown', 'lessThan5');
    });

    await test.step('Apply depreciation percentage based on the vehicle\'s age', async () => {
      await page.fill('#depreciation-percentage', '15');
    });

    await test.step('Verify the calculated IDV is consistent with the depreciation schedule', async () => {
      await page.click('#calculate-idv');
      await page.waitForSelector('#idv-result', { state: 'visible' });
      const idvValue = await page.textContent('#idv-value');
      // Assume the expected IDV value is calculated as per system logic
      const expectedIDVValue = '8500'; 
      test.expect(idvValue).toBe(expectedIDVValue);
    });
  });
});
```