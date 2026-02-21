# Guide de contribution

## Prérequis

- Node.js >= 20.x
- pnpm >= 10.x
- Lire le [README](README.md) et [ARCHITECTURE.md](docs/ARCHITECTURE.md) avant de commencer

---

## Workflow Git

Ce projet suit la convention **Conventional Commits** et le workflow **GitHub Flow**.

### Branches

| Branche | Usage |
|---|---|
| `main` | Production — protégée, merge uniquement via PR |
| `develop` | Intégration — branche de travail principale |
| `feat/nom` | Nouvelle fonctionnalité |
| `fix/nom` | Correction de bug |
| `chore/nom` | Maintenance, config, deps |

### Convention de commits
```
type(scope): description courte

[body optionnel]

[footer optionnel: BREAKING CHANGE ou refs]
```

**Types acceptés :**
- `feat` — nouvelle fonctionnalité
- `fix` — correction de bug
- `perf` — amélioration de performance
- `refactor` — refactoring sans changement fonctionnel
- `test` — ajout ou modification de tests
- `docs` — documentation uniquement
- `chore` — maintenance (deps, config)
- `style` — formatage, sans impact logique

**Exemples :**
```
feat(editor): add line numbers to CodeMirror
fix(simulation): prevent bot updates after component unmount
perf(store): memoize log selectors to avoid re-renders
test(e2e): add dark mode toggle spec
```

---

## Process de contribution

1. Fork le dépôt
2. Crée ta branche depuis `develop`
```bash
git checkout -b feat/ma-fonctionnalite
```
3. Développe avec des commits atomiques et conventionnels
4. Vérifie que tous les tests passent
```bash
pnpm test
pnpm test:e2e
pnpm lint
```
5. Ouvre une Pull Request vers `develop`
6. Attends la review et les checks CI

---

## Standards de code

- **TypeScript strict** : aucun `any`, aucun `// @ts-ignore`
- **Commentaires JSDoc** sur toutes les fonctions et interfaces publiques
- **Tests** : tout nouveau composant doit avoir sa story Storybook et au minimum un test unitaire
- **Performance** : vérifier avec React DevTools qu'aucun re-render global n'est introduit

---

## Structure des composants

Chaque composant doit suivre cette structure :
```
├── ComponentName.tsx          # Composant principal
├── ComponentName.test.tsx     # Tests unitaires
├── ComponentName.stories.tsx  # Stories Storybook

```