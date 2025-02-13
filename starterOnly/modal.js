// DOM Elements
const modalInscription = document.getElementById("ModalInscription");
const modalBtns = document.querySelectorAll(".modal-btn");
const modalBtnsClose = document.querySelectorAll(".close"); // Sélectionnez le bouton de fermeture
const confirmationBtnClose = document.getElementById("btnFermer");
const formDataEntries = document.querySelectorAll(".formData");
const conditionsCheckbox = document.getElementById("checkbox1");

//lancer Modale d'inscription
modalBtns.forEach((btn) => btn.addEventListener("click", launchModal));
//Fermer avec la croix close
modalBtnsClose.forEach((btn) => btn.addEventListener("click", closeModal));
//Fermer avec le bouton Fermer
confirmationBtnClose.addEventListener("click", closeModal);
//Pour réinitialiser les données de formulaire une fois validé
modalInscription.addEventListener("submit", function (event) {
  submitData(event);
});
//afficher et cacher le message d'erreur pour la case à cocher des conditions
conditionsCheckbox.addEventListener("change", checkIfConditionsAccepted);

//Vérifier si les conditions sont acceptées
function checkIfConditionsAccepted() {
  const termesField = document.querySelector(
    '.formData[data-fieldtype="termesField"]'
  );
  if (!this.checked) {
    // Si la case n'est pas cochée
    termesField.setAttribute("data-error-visible", "true");
    termesField.setAttribute(
      "data-error",
      "Vous devez accepter les conditions d'utilisation"
    );
  } else {
    termesField.setAttribute("data-error-visible", "false");
    termesField.removeAttribute("data-error");
  }
}

//les fonctions:
// rendre navbar responsive
function editNav() {
  const x = document.getElementById("myTopnav");
  /* if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  } */
  x.classList.toggle("responsive"); //classe interrupteur
}
//afficher Modale d'inscription
function launchModal() {
  modalInscription.style.display = "block";
}
//fermer les modales de classe bground
function closeModal() {
  this.closest(".bground").style.display = "none"; //chercher le premier occurence de parent de classe bground
  //Effacer les messages d'erreur déjà affichés si on ferme avec la croix
  formDataEntries.forEach((element) => {
    element.setAttribute("data-error-visible", "false");
  });
}
//vérifier si une personne a plus de 18 ans
function checkAge() {
  // Récupérer la valeur de la date de naissance depuis l'input
  const inputDate = document.getElementById("birthdate");
  const dateNaissance = new Date(inputDate.value); //la changer en date

  // Obtenir la date actuelle
  const dateActuelle = new Date();

  // Calculer la différence entre les années
  const differenceAnnees =
    dateActuelle.getFullYear() - dateNaissance.getFullYear();

  // Vérifier si la personne a plus de 18 ans
  if (differenceAnnees > 18) {
    return true;
  } else if (differenceAnnees === 18) {
    // Vérifier également les mois si la personne a exactement 18 ans
    const moisActuel = dateActuelle.getMonth();
    const moisNaissance = dateNaissance.getMonth();
    if (moisActuel > moisNaissance) {
      return true;
    } else if (moisActuel === moisNaissance) {
      const jourActuel = dateActuelle.getDate();
      const jourNaissance = dateNaissance.getDate();
      if (jourActuel >= jourNaissance) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//soumettre le formulaire
function submitData(event) {
  let isValid = validateForm(event);
  if (isValid) {
    // récupérer les données de formulaire
    const prenom = document.getElementById("first").value;
    const nom = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const birthdate = document.getElementById("birthdate").value;
    const tournois = document.getElementById("quantity").value;
    const location = document.querySelector(
      'input[name="location"]:checked'
    ).value;
    const conditions = document.getElementById("checkbox1").checked;
    const notification = document.getElementById("checkbox2").checked;
    // Afficher les données de formulaire introduites
    console.log(
      "Prénom:",
      prenom,
      "\nNom:",
      nom,
      "\nE-mail:",
      email,
      "\nDate de naissance:",
      birthdate,
      "\nNombre de tournois:",
      tournois,
      "\nLieu choisi:",
      location,
      "\nAcceptation des conditions:",
      conditions,
      "\nNotification des évènements:",
      notification
    );
    const modalConfirmation = document.getElementById("modalConfirmation");
    modalConfirmation.style.display = "block"; //afficher la modale de confirmation
    modalInscription.style.display = "none"; //cacher la modale d'inscription
    event.preventDefault(); //pour eviter le chargement de la page sinon la modale confirmation se ferme
    document.getElementById("inscriptionForm").reset(); //pour effacer les données de formulaire une fois les données sont envoyées
  }
}

//Valider le formulaire
function validateForm(event) {
  let formIsValid = true; //pour suivre si le formulaire est valide ou non
  formDataEntries.forEach((formDataEntry) => {
    const inputField = formDataEntry.querySelector(".text-control");
    //const errorDiv = formDataEntry.querySelector(".errorMessage");
    const fieldType = formDataEntry.getAttribute("data-fieldtype");
    //console.log(fieldType);
    if (inputField) {
      const inputValue = inputField.value.trim(); //enlever les espaces
      if (fieldType === "emailField") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputValue)) {
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false; //la fonction appelle event.preventDefault() pour enpecher la soumission de formulaire
        } else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      } else if (fieldType === "nomField" || fieldType === "prenomField") {
        const namePattern = /^[a-zA-Z\u00C0-\u00FF ]+$/u; //regex langue française sans carectères spéciaux
        if (!inputValue || inputValue.length < 2) {
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else if (!namePattern.test(inputValue)) {
          inputField.parentElement.setAttribute(
            "data-error",
            "Vous devez entrer des caractères valides"
          );
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      } else if (fieldType === "birthdateField") {
        // Vérifier l'âge en utilisant checkAge()
        const isOver18 = checkAge();
        // Si l'âge est inférieur à 18, afficher une erreur
        // console.log(inputValue);
        if (inputValue === "") {
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else if (!isOver18) {
          inputField.parentElement.setAttribute(
            "data-error",
            "Vous devez avoir au minimun 18ans"
          );
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      } else if (fieldType === "tournoisField") {
        if (!inputValue) {
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else if (parseInt(inputValue) >= 100 || parseInt(inputValue) < 0) {
          inputField.parentElement.setAttribute(
            "data-error",
            "Vous devez entrer un chiffre compris entre 0 et 99"
          );
          inputField.parentElement.setAttribute("data-error-visible", "true");
        } else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      }
    } else {
      if (fieldType === "locationField") {
        const locationField = document.querySelector(
          '.formData[data-fieldtype="locationField"]'
        );
        const radioButtons = document.querySelectorAll(
          'input[type="radio"][name="location"]'
        );

        let IsRadioButtonChecked = false;

        radioButtons.forEach((radio) => {
          if (radio.checked) {
            IsRadioButtonChecked = true;
          }
        });

        if (!IsRadioButtonChecked) {
          locationField.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          locationField.setAttribute("data-error-visible", "false");
        }
      } else if (fieldType === "termesField") {
        const termesField = document.querySelector(
          '.formData[data-fieldtype="termesField"]'
        );
        const termsCheckbox = document.getElementById("checkbox1");
        if (!termsCheckbox.checked) {
          // Si la case n'est pas cochée
          termesField.setAttribute("data-error-visible", "true");
          termesField.setAttribute(
            "data-error",
            "Vous devez accepter les conditions d'utilisation"
          );
          formIsValid = false;
        } else {
          termesField.setAttribute("data-error-visible", "false");
        }
      }
    }
  });
  //validation de formulaire est echoué
  if (!formIsValid) {
    event.preventDefault(); //pour empecher le rechargement de la page
    return false;
  }
  return true;
}
