// Récupération des élémnets HTML5
const imcForm = document.querySelector("#imcForm");
const clearHistoryBtn = document.querySelector("#clearHistoryBtn");
const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const errorBox = document.querySelector("#error");
const resultBox = document.querySelector("#resultBox");
const resultBoxTitle = document.querySelector(".result-box h2");
const imcValueDisplay = document.querySelector("#imcValue");
const imcStatusDisplay = document.querySelector("#imcStatus");
const adviceCardText = document.querySelector(".advice-card p");
const adviceText = document.querySelector("#adviceText");
const historyList = document.querySelector("#historyList");
const copyrightYear = document.querySelector(".year");

// Initialisation de l'historique grâce au localStorage : récupère les données ou crée un tableau vide
let dataHistory = JSON.parse(localStorage.getItem("imcHistory")) || [];

// Déclaration de la constante advicesTemplates qui va servir de base de données de conseils de santé
const adviceTemplates = {
  maigreur:
    "Vos apports énergétiques sont peut-être inférieurs à vos besoins gastriques et métaboliques. Nous vous conseillons de privilégier des repas denses en nutriments et de consulter un nutritionniste pour un accompagnement adapté.",
  normal:
    "Félicitations ! Votre corpulence est équilibrée. Continuez à maintenir une alimentation variée et à pratiquer au moins 150 minutes d'activité physique modérée par semaine conformément aux recommandations de l'OMS.",
  surpoids:
    "Votre IMC indique un léger excès de poids. Pour prévenir l'apparition de facteurs de risques cardiovasculaires, il est recommandé de limiter les aliments ultra-transformés et d'intégrer une marche quotidienne active.",
  obesite:
    "Votre indicateur de masse se situe dans le seuil de l'obésité. Cette situation peut impacter vos articulations et votre système cardiovasculaire. Nous vous suggérons vivement de faire un bilan complet auprès d'un professionnel de santé.",
};

// Déclaration de la fonction showError ayant comme paramètre message qui va permettre l'affichage des erreurs
const showError = (message) => {
  errorBox.textContent = message;
  errorBox.style.display = "block";
};

// Déclaration de la fonction displayDataHistory qui va permettre la mise à jour de l'affichage de la liste de l'historique avec Date & Heure
const displayDataHistory = () => {
  historyList.innerHTML = "";

  // Condition if
  if (dataHistory.length === 0) {
    historyList.innerHTML =
      '<li class="empty-history">Aucun calcul enregistré pour le moment.</li>';
    return;
  }

  // Affichage du plus récent en premier
  dataHistory
    .slice()
    .reverse()
    .forEach((item) => {
      // Création d'un élément HTML <li>
      const li = document.createElement("li");
      li.className = "history-item";
      // Mise en place de la structure HTML
      li.innerHTML = `
            <div class="history-left-group">
                <span class="history-date">${item.date}</span>
                <span class="history-details">${item.weight} kg / ${item.height} cm</span>
            </div>
            <span class="history-badge ${item.colorClass}">IMC : ${item.imc}</span>
        `;
      // Ajout de l'élément <li> créé dans le DOM
      historyList.appendChild(li);
      // console.table(historyData);
    });
};

// Fonction principale de calcul
const calculateIMC = () => {
  // Disparition de errorBox
  errorBox.style.display = "none";
  resultBox.className = "card result-box";

  const weight = parseFloat(weightInput.value); // Récupération du poids
  const heightCm = parseFloat(heightInput.value); // Récupération de la taille

  // Condition if
  if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
    // Appel de la fonction showError
    showError("Veuillez entrer des valeurs positives et valides.");
    imcValueDisplay.textContent = "";
    imcStatusDisplay.textContent = "";
    adviceCardText.textContent = "";
    resultBoxTitle.style.color = "#0f172a";
    return;
  }
  // condition if
  if (weight > 500 || heightCm > 250 || heightCm < 50) {
    // Appel de la fonction showError
    showError(
      "Veuillez entrer des valeurs cohérentes (Taille entre 50 et 250 cm, Poids max 500 kg)."
    );
    imcValueDisplay.textContent = "";
    imcStatusDisplay.textContent = "";
    adviceCardText.textContent = "";
    resultBoxTitle.style.color = "#0f172a";
    return;
  }

  const heightMeters = heightCm / 100; // taille en mètre
  const imc = weight / (heightMeters * heightMeters); // Formule pour calculer l'imc
  const imcRounded = imc.toFixed(1); // un chiffre après la virgule

  // Création des variables
  let statusText = "";
  let colorClass = "";
  let adviceKey = "";

  // Condition if... else if... else
  if (imc < 18.5) {
    statusText = "Insuffisance pondérale (maigreur)";
    colorClass = "bg-maigreur";
    adviceKey = "maigreur";
    resultBoxTitle.style.color = "var(--maigreur)";
  } else if (imc >= 18.5 && imc < 25) {
    statusText = "Corpulence normale";
    colorClass = "bg-normal";
    adviceKey = "normal";
    resultBoxTitle.style.color = "var(--normal)";
  } else if (imc >= 25 && imc < 30) {
    statusText = "Surpoids";
    colorClass = "bg-surpoids";
    adviceKey = "surpoids";
    resultBoxTitle.style.color = "var(--surpoids)";
  } else {
    statusText = "Obésité";
    colorClass = "bg-obesite";
    adviceKey = "obesite";
    resultBoxTitle.style.color = "var(--obesite)";
  }

  // Affichage immédiat des résultats
  imcValueDisplay.textContent = `${imcRounded}`;
  imcStatusDisplay.textContent = `${statusText}`;
  // Ajout de la classe "colorClass" en fonction de l'imc calculé
  resultBox.classList.add(colorClass);
  adviceText.textContent = `${adviceTemplates[adviceKey]}`;

  // Génération automatique de la date et de l'heure au format local français
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(now)
    .replace(",", " à");

  // Ajout des données dans le localStorage
  dataHistory.push({
    date: formattedDate,
    weight: weight,
    height: heightCm,
    imc: imcRounded,
    colorClass: colorClass,
  });
  localStorage.setItem("imcHistory", JSON.stringify(dataHistory));
  // Appel de la fonction displayDataHistory()
  displayDataHistory();
};

// Appel de la fonction displayDataHistory()
displayDataHistory();

// Ecoute de l'événement "submit" sur le formulaire
imcForm.addEventListener("submit", (e) => {
  // Suppression du comportement par défaut
  e.preventDefault();
  // Appel de la fonction calculateIMC()
  calculateIMC();
});

// Ecoute de l'événement "click" sur le bouton pour effacer l'historique
clearHistoryBtn.addEventListener("click", () => {
  // Tableau vide
  dataHistory = [];
  localStorage.removeItem("imcHistory");
  // Appel de la fonction displayDataHistory()
  displayDataHistory();
});

// Déclaration de la fonction getCurrentYear qui va permettre l'affiche de l'année dans le footer
const getCurrentYear = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  copyrightYear.textContent = `${currentYear}`;
};

// Appel de la fonction getCurrentYear()
getCurrentYear();
