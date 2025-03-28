```typescript
import { test } from '@playwright/test';

test.describe('Vehicle Depreciation Rate Tests', () => {

  test('Verify 5% depreciation rate application for vehicles up to 6 months old', async ({ page }) => {
    await test.step('Access the insurance policy management system.', async () => {
      await page.goto('https://insurance-policy-management-system.com');
    });

    await test.step('Enter the vehicle\'s manufacture date and calculate its age.', async () => {
      await page.fill('#manufactureDateInput', '2023-06-15');
      await page.click('#calculateAgeButton');
    });

    await test.step('Check the depreciation rate applied to the vehicle.', async () => {
      const depreciationRate = await page.textContent('#depreciationRate');
      await test.expect(depreciationRate).toBe('5%');
    });

    await test.step('Verify the updated IDV displayed in the policy documents.', async () => {
      const idv = await page.textContent('#policyDocumentIDV');
      await test.expect(idv).toBe('95% of Original Value');
    });
  });

  test('Confirm automatic IDV update for vehicles up to 6 months of age', async ({ page }) => {
    await test.step('Log into the claims analyst dashboard.', async () => {
      await page.goto('https://claims-analyst-dashboard.com');
      await page.fill('#username', 'analystUser');
      await page.fill('#password', 'securePassword123');
      await page.click('#loginButton');
    });

    await test.step('Input vehicle data including the date of manufacture.', async () => {
      await page.fill('#manufactureDateInput', '2023-07-01');
      await page.click('#submitVehicleData');
    });

    await test.step('Verify that a 5% depreciation rate is applied for a 4-month-old vehicle.', async () => {
      const depreciationRate = await page.textContent('#depreciationRate');
      await test.expect(depreciationRate).toBe('5%');
    });

    await test.step('Check the policy document for the amended IDV and depreciation.', async () => {
      const idv = await page.textContent('#amendedIDV');
      await test.expect(idv).toBe('95% of Original Value');
    });
  });

  test('Apply 5% depreciation for vehicles up to 6 months', async ({ page }) => {
    await test.step('Navigate to the vehicle information page in the insurance policy system.', async () => {
      await page.goto('https://insurance-policy-system.com/vehicle-info');
    });

    await test.step('Verify the depreciation rate applied based on vehicle age.', async () => {
      const depreciationRate = await page.textContent('#currentDepreciationRate');
      await test.expect(depreciationRate).toBe('5%');
    });

    await test.step('Check the updated Insured Declared Value (IDV) after depreciation.', async () => {
      const updatedIDV = await page.textContent('#updatedIDV');
      await test.expect(updatedIDV).toBe('95% of Original Value');
    });

    await test.step('Confirm the IDV is correctly reflected in the policy documents.', async () => {
      const policyIDV = await page.textContent('#policyDocumentIDV');
      await test.expect(policyIDV).toBe('95% of Original Value');
    });
  });

});
```