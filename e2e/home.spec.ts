import { expect, test } from "@playwright/test";

test("home page loads and shows the Inner DAVE heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Inner DAVE" })).toBeVisible();
  await expect(page.getByText("The check-in lives here soon.")).toBeVisible();
});
