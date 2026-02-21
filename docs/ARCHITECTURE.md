# Architecture technique

## Décisions clés

### Pourquoi Yjs + CodeMirror 6 plutôt qu'un textarea custom ?

Yjs implémente les **CRDT (Conflict-free Replicated Data Types)**, ce qui garantit
mathématiquement la convergence des états entre tous les clients, sans serveur central.
CodeMirror 6 expose une API de **Decorations** qui manipule le DOM directement,
court-circuitant entièrement React pour les curseurs des autres utilisateurs.
Résultat : zéro re-render React lors de la saisie ou du déplacement des curseurs.

### Pourquoi Zustand et non un Context React global ?

React Context provoque le re-render de tous les consumers lors de chaque update.
Zustand utilise des **selectors granulaires** : un composant ne re-rend que si
la slice d'état qu'il écoute a changé. Exemple : `Footer` écoute uniquement
`latency` et `documentSize`, il ne re-rend pas quand un log est ajouté.

### Pourquoi setInterval pour les bots et non des Web Workers ?

Les Web Workers sont adaptés aux calculs CPU intensifs (image processing, crypto).
Ici les bots font uniquement des appels Yjs espacés dans le temps — `setInterval`
suffit, reste sur le même thread JS, et partage directement la référence au
`sharedDoc` Yjs sans sérialisation/désérialisation.

## Flux de données
```
Utilisateur tape
      │
      ▼
CodeMirror (DOM natif)
      │ update binaire Yjs
      ▼
MockNetworkProvider
      │ setTimeout (100-1500ms)  ←── 1% probabilité de drop
      ▼
sharedDoc (Y.Doc commun)
      │
      ├──► BotSimulator (setInterval) ──► lit/écrit dans sharedDoc
      │
      ▼
MockNetworkProvider (remote update)
      │ setTimeout (latence retour)
      ▼
localDoc ──► CodeMirror ──► DOM (curseurs via Decorations)
```

## Gestion des conflits

Yjs résout les conflits via l'algorithme **YATA** (Yet Another Transformation Approach),
une variante des CRDTs qui garantit la convergence sans coordination centrale.
Lorsque deux bots insèrent simultanément au même index, Yjs détermine l'ordre
de façon déterministe basée sur les identifiants de client, sans perte de données.
