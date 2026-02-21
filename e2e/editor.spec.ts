import { test, expect } from '@playwright/test'

test.describe('Collaborative Editor', () => {
  test('Affiche correctement l\'interface', async ({ page }) => {
    await page.goto('/')
    
    // Vérification du layout principal
    await expect(page.getByRole('banner')).toBeVisible() // Header
    await expect(page.locator('aside').first()).toBeVisible() // LeftPanel
    await expect(page.locator('aside').last()).toBeVisible() // RightPanel
    await expect(page.locator('footer')).toBeVisible() // Footer
    
    // Vérification de l'éditeur (CodeMirror)
    await expect(page.locator('.cm-editor')).toBeVisible()
  })

  test('Permet de modifier le titre du document', async ({ page }) => {
    await page.goto('/')
    
    const titleInput = page.getByPlaceholder('Nom du document')
    await titleInput.fill('Mon super document')
    await expect(titleInput).toHaveValue('Mon super document')
  })

  test('Permet de basculer entre Journal et Chat', async ({ page }) => {
    await page.goto('/')
    
    // Au départ, l'onglet Journal est actif
    await expect(page.getByRole('button', { name: 'Journal' })).toHaveClass(/text-vercel-text/)
    
    // Bascule vers Chat
    await page.getByRole('button', { name: 'Chat' }).click()
    await expect(page.getByRole('button', { name: 'Chat' })).toHaveClass(/text-vercel-text/)
    await expect(page.getByPlaceholder('Envoyer un message...')).toBeVisible()
  })
})
