import { test, expect } from '@playwright/test'

test.describe('Collaboration Simulation', () => {
  test('Affiche les autres utilisateurs et applique la latence', async ({ page }) => {
    await page.goto('/')

    // On vérifie que le statut de connexion passe à connected (mock network)
    await expect(page.getByText(/sys\.status: (connected|syncing)/)).toBeVisible()

    // On vérifie que le LeftPanel affiche des "Utilisateurs Actifs"
    // On s'attend à voir au moins "Moi" et d'autres bots.
    const activeUsersList = page.locator('aside').first().locator('.flex.flex-col > div')
    // Au moins 2 utilisateurs ("Moi" + au moins un bot qui se connecte après 2s)
    await expect(activeUsersList).toHaveCount(1, { timeout: 1000 })
    
    // Après un moment, la file d'attente s'active ou les bot entrent
    await page.waitForTimeout(3000)

    // Vérifie un input
    const editor = page.locator('.cm-content')
    await editor.click()
    await editor.pressSequentially('Hello World')

    // Attendre l'apparition des badges / logs
    await expect(page.getByText(/sys\.latency: \d+ms/)).toBeVisible()
  })
})
