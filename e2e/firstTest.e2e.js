describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show "Step One" at the begging', async () => {
    await expect(element(by.text('Category'))).toBeVisible();
  });
});