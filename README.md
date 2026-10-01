## ⚖️ CALCULATEUR D'IMC (INDICE DE MASSE CORPORELLE)

## 🚀 Le challenge

Création d'une application simple, intuitive et réactive qui permet aux utilisateurs de calculer leur Indice de Masse Corporelle (IMC) en quelques clics, d'obtenir une interprétation immédiate de leur résultat selon les critères de l'OMS et de recevoir des conseils personnalisés.

Ce projet dispose de plusieurs fonctionnalités :

- **Calcul instantané** : Évaluation de l'IMC à partir du poids (en kg) et de la taille (en cm ou mètres).
- **Interprétation officielle** : Classification automatique du résultat selon les barèmes de l'Organisation Mondiale de la Santé (OMS) :
  - Maigreur
  - Corpulence normale
  - Surpoids
  - Obésité
- **Indicateurs visuels** : Code couleur dynamique associé au résultat pour une meilleure lisibilité.
- **Gestion des erreurs** : Empêche la validation si les champs sont vides, négatifs ou si les valeurs saisies sont irréalistes (ex: taille de 10 cm ou poids de 800 kg) et affichage d'un message d'erreur clair.
- **Historique des calculs** : Sauvegarde locale des anciennes mesures pour suivre son évolution.
- **Design Responsive** : Interface optimisée pour une utilisation fluide sur smartphones, tablettes et ordinateurs.

## 🧮 Formule mathématique utilisée

L'indice de masse corporelle est calculé à l'aide de la formule standard suivante :
IMC = poids / (taille_en_metres \* taille_en_metres)

## 📊 Grille d'interprétation (OMS)

| IMC (kg/m²)        | Classification         |
| :----------------- | :--------------------- |
| - de 18.5          | Maigreur               |
| **de 18.5 à 24.9** | **Corpulence normale** |
| 25 à 29.9          | Surpoids               |
| 30 et +            | Obésité                |

## ⚠️ Avertissement médical

Cette application est un outil d’information et ne remplace en aucun cas un avis médical professionnel. L'IMC est un indicateur général qui ne prend pas en compte la masse musculaire, la densité osseuse ou la répartition des graisses. Pour un bilan de santé complet, consultez un médecin ou un nutritionniste.

## 📸 Démonstration

Lien vers le projet :

## 🛠️ Projet développé avec

- Utilisation des balises sémantiques HTML5
- CSS3
- Flexbox
- Animations css (transition)
- Page web responsive
- Mobile first
- Commentaires HTML
- Commentaires CSS
- Importation d'un normaliseur : le fichier normalize
- Importation des polices "Quicksand" et 'Nunito"
- JavaScript (ES6)
- Code JavaScript commenté
- Manipulation dynamique du DOM.
- Gestionnaires d'événements (`click`)
- localStorage pour l'historique des données
- Condition if... else if... else...

## 📂 Structure du projet

```text
├── index.html          # Structure HTML5 sémantique
├── style.css           # Styles de la grille et de la lightbox
└── script.js           # Logique JavaScript notammnet pour le calcul de l'imc et la sauvegarde des données dans le localStorage
```

---

## 📄 Licence

Ce projet est sous licence MIT.
