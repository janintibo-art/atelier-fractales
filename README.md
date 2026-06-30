# Atelier de Fractales

Explorateur de fractales en temps réel (WebGL) : Mandelbrot, Julia, Vaisseau ardent,
Tricorn et Celtique, avec un menu de réglages complet, des palettes, l'export d'images
et un mode hors-ligne. L'application tient dans un seul fichier `index.html`.

## Contenu

- `index.html` — l'application
- `manifest.webmanifest`, `sw.js`, `icon-*.png`, `apple-touch-icon.png` — installation (PWA) et hors-ligne
- `config.xml` — paramètres de l'application Android (nom, icône, plein écran)
- `.github/workflows/build-apk.yml` — fabrique l'APK automatiquement

## Envoyer le projet sur GitHub depuis Termux

```bash
pkg update && pkg install git gh unzip -y

cd ~
unzip /sdcard/Download/atelier-fractales.zip      # adaptez le chemin du zip
cd atelier-fractales

gh auth login                                     # connexion à votre compte GitHub
git init
git add .
git commit -m "Atelier de Fractales"
gh repo create atelier-fractales --public --source=. --push
```

## Récupérer l'APK

Le push déclenche automatiquement la construction.

1. Ouvrez votre dépôt sur GitHub, onglet **Actions** : attendez que le job « Construire l'APK » passe au vert (quelques minutes).
2. Allez dans l'onglet **Releases** : la dernière release contient le fichier **`.apk`**. Téléchargez-le sur votre téléphone.
3. Ouvrez le fichier ; Android demandera d'**autoriser l'installation depuis cette source** (Paramètres → Applications → Accès spécial). Acceptez, puis installez.

> L'APK est signé avec la **clé de debug** : parfait pour un usage personnel et le partage,
> mais pas destiné au Play Store. La signature de publication pourra être ajoutée plus tard.

## Version web (optionnel)

Dans les **Settings → Pages** du dépôt, choisissez la branche `main` (dossier `/root`).
Vous obtenez une URL ; ouverte dans Chrome Android, « Installer l'application » l'ajoute
en plein écran, et elle fonctionne ensuite hors connexion.

## Mettre à jour

Après toute modification, pensez à incrémenter la version du cache dans `sw.js`
(`fractales-v1` → `fractales-v2`, etc.) pour que la nouvelle version remplace l'ancienne.
