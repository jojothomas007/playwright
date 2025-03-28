```typescript
import { test } from '@playwright/test';

test.describe('Vehicle Depreciation Tests', () => {
  test('Verify depreciation schedule visibility for insurance agents', async ({ page }) => {
    await test.step('Log in to the system as an insurance agent', async () => {
      await page.goto('https://example-insurance.com/login');
      await page.fill('#username', 'agent_user');
      await page.fill('#password', 'securepassword');
      await page.click('button#login');
      await page.waitForNavigation();
    });

    await test.step('Navigate to the vehicle value evaluation section', async () => {
      await page.click('nav >> text=Vehicle Evaluation');
      await page.waitForSelector('text=Depreciation Schedule');
    });

    await test.step('Check for the presence of the depreciation schedule', async () => {
      const isVisible = await page.isVisible('text=Depreciation Schedule');
      test.expect(isVisible).toBeTruthy();
    });
  });

  test('Verify 5% depreciation for vehicles up to 6 months', async ({ page }) => {
    await test.step('Enter vehicle age as 5 months', async () => {
      await page.fill('input[name="vehicle-age"]', '5');
    });

    await test.step('Calculate depreciation value', async () => {
      await page.click('button#calculate-depreciation');
    });

    await test.step('Verify IDV calculation', async () => {
      const depreciationValue = await page.textContent('#depreciation-value');
      test.expect(depreciationValue).toContain('5%');
    });
  });

  test('Verify 15% depreciation for vehicles 6 months to 1 year', async ({ page }) => {
    await test.step('Enter vehicle age as 10 months', async () => {
      await page.fill('input[name="vehicle-age"]', '10');
    });

    await test.step('Calculate depreciation value', async () => {
      await page.click('button#calculate-depreciation');
    });

    await test.step('Verify IDV calculation', async () => {
      const depreciationValue = await page.textContent('#depreciation-value');
      test.expect(depreciationValue).toContain('15%');
    });
  });

  test('Verify 50% depreciation for vehicles 4 to 5 years', async ({ page }) => {
    await test.step('Enter vehicle age as 4 years and 6 months', async () => {
      await page.fill('input[name="vehicle-age"]', '54'); // Represents 4 years and 6 months
    });

    await test.step('Calculate depreciation value', async () => {
      await page.click('button#calculate-depreciation');
    });

    await test.step('Verify IDV calculation', async () => {
      const depreciationValue = await page.textContent('#depreciation-value');
      test.expect(depreciationValue).toContain('50%');
    });
  });
});
```
