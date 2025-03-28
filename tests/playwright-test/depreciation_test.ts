```typescript
import { test } from '@playwright/test';

test.describe('Depreciation Schedule Tests', () => {

  test('Verify depreciation schedule visibility for insurance agents', async ({ page }) => {
    await test.step('Log in to the system as an insurance agent', async () => {
      await page.goto('https://example.com/login');
      await page.fill('input[name="username"]', 'insuranceAgent');
      await page.fill('input[name="password"]', 'password123');
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
    });

    await test.step('Navigate to the vehicle value evaluation section', async () => {
      await page.click('a[href="/vehicle-value-evaluation"]');
    });

    await test.step('Check for the presence of the depreciation schedule', async () => {
      await page.waitForSelector('#depreciation-schedule');
      const isVisible = await page.isVisible('#depreciation-schedule');
      if (!isVisible) {
        throw new Error('Depreciation schedule is not visible');
      }
    });
  });

  test('Verify 5% depreciation for vehicles up to 6 months', async ({ page }) => {
    await test.step('Enter vehicle age as 5 months', async () => {
      await page.goto('https://example.com/vehicle-value-evaluation');
      await page.fill('input[name="vehicleAge"]', '5');
    });

    await test.step('Calculate depreciation value', async () => {
      await page.click('button#calculate-depreciation');
      await page.waitForSelector('#depreciation-value');
    });

    await test.step('Verify IDV calculation', async () => {
      const depreciationValue = await page.textContent('#depreciation-value');
      if (depreciationValue !== '5%') {
        throw new Error(`Expected depreciation value to be 5%, but got ${depreciationValue}`);
      }
    });
  });

  test('Verify 15% depreciation for vehicles 6 months to 1 year', async ({ page }) => {
    await test.step('Enter vehicle age as 10 months', async () => {
      await page.goto('https://example.com/vehicle-value-evaluation');
      await page.fill('input[name="vehicleAge"]', '10');
    });

    await test.step('Calculate depreciation value', async () => {
      await page.click('button#calculate-depreciation');
      await page.waitForSelector('#depreciation-value');
    });

    await test.step('Verify IDV calculation', async () => {
      const depreciationValue = await page.textContent('#depreciation-value');
      if (depreciationValue !== '15%') {
        throw new Error(`Expected depreciation value to be 15%, but got ${depreciationValue}`);
      }
    });
  });

  test('Verify 50% depreciation for vehicles 4 to 5 years', async ({ page }) => {
    await test.step('Enter vehicle age as 4 years and 6 months', async () => {
      await page.goto('https://example.com/vehicle-value-evaluation');
      await page.fill('input[name="vehicleAge"]', '54'); // 54 months
    });

    await test.step('Calculate depreciation value', async () => {
      await page.click('button#calculate-depreciation');
      await page.waitForSelector('#depreciation-value');
    });

    await test.step('Verify IDV calculation', async () => {
      const depreciationValue = await page.textContent('#depreciation-value');
      if (depreciationValue !== '50%') {
        throw new Error(`Expected depreciation value to be 50%, but got ${depreciationValue}`);
      }
    });
  });

});
```