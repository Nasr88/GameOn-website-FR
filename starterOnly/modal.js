// DOM Elements
const modalInscription = document.getElementById("ModalInscription");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelectorAll(".close"); // Sélectionnez le bouton de fermeture
const confirmationBtnClose = document.getElementById("btnFermer");

//les fonctions:
// rendre navbar responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  /* if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  } */
  x.classList.toggle("responsive");//classe interrupteur
}
//vérifier si une personne a plus de 18 ans
function checkAge() {
  // Récupérer la valeur de la date de naissance depuis l'input
  const inputDate = document.getElementById('birthdate');
  const dateNaissance = new Date(inputDate.value);

  // Obtenir la date actuelle
  const dateActuelle = new Date();

  // Calculer la différence en années entre la date actuelle et la date de naissance
  const differenceAnnees = dateActuelle.getFullYear() - dateNaissance.getFullYear();

  // Vérifier si la personne a plus de 18 ans en tenant compte des mois et jours
  if (differenceAnnees > 18 || 
      (differenceAnnees === 18 && 
      (dateActuelle.getMonth() > dateNaissance.getMonth() || 
      (dateActuelle.getMonth() === dateNaissance.getMonth() && 
      dateActuelle.getDate() >= dateNaissance.getDate())))) {
    return true;
  } else {
    return false;
  }
}
//afficher Modale d'inscription
function launchModal() {
  modalInscription.style.display = "block";
}
//fermer les modales de classe bground
function closeModal(){
  this.closest('.bground').style.display = "none";//chercher le premier occurence de parent de classe bground
}

function submitData(event){
  let isValid=validateForm(event);
  if (isValid){
    const monDiv = document.getElementById('modalConfirmation');
    monDiv.style.display = "block";//afficher la modale de confirmation
    modalInscription.style.display = "none";//cacher la modale d'inscription
    event.preventDefault();//pour eviter le chargement de la page
    document.getElementById('inscriptionForm').reset();//pour effacer les données de formulaire une fois les données sont envoyées
  }
}

//Fermer avec la croix close
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));
//lancer Modale d'inscription
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//Fermer avec le bouton Fermer
confirmationBtnClose.addEventListener("click",closeModal);
//Pour réinitialiser les données de formulaire une fois validé
modalInscription.addEventListener("submit", function(event) {
  submitData(event);
});


//Valider le formulaire
function validateForm(event) {

  const formDataEntries = document.querySelectorAll(".formData");
  let formIsValid = true;

  formDataEntries.forEach((formDataEntry) => {
    const inputField = formDataEntry.querySelector(".text-control");
    //const errorDiv = formDataEntry.querySelector(".errorMessage");
    const errorType = formDataEntry.getAttribute("data-fieldtype");
    //console.log(errorType);
    if (inputField) {
      const inputValue = inputField.value.trim();
      if (errorType === "emailField") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputValue)) {
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      } else if (errorType === "nomField" || errorType === "prenomField") {
        if (!inputValue || inputValue.length < 2) {
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      } else if (errorType === "birthdateField") {
  
   // Vérifier l'âge en utilisant checkAge()
   const isOver18 = checkAge();
   // Si l'âge est inférieur à 18, afficher une erreur
   console.log(inputValue);
        if (inputValue===""){
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        }else if (!isOver18) {
          inputField.parentElement.setAttribute("data-error", "Vous devez avoir au minimun 18ans");
          formIsValid = false;
        } 
        else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      }
      else if (errorType === "tournoisField") {
        if (!inputValue) {
          inputField.parentElement.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          inputField.parentElement.setAttribute("data-error-visible", "false");
        }
      }
      
    }
    else{
       if (errorType === "locationField") {
        const locationField = document.querySelector('.formData[data-fieldtype="locationField"]');
        const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]');
        
        let radioButtonChecked = false;
      
        radioButtons.forEach(radio => {
          if (radio.checked) {
            radioButtonChecked = true;
          }
        });
      
        if (!radioButtonChecked) { 
          locationField.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          locationField.setAttribute("data-error-visible", "false");
        }
      }
     
     else if (errorType==="termesField"){
       
        const termesField = document.querySelector('.formData[data-fieldtype="termesField"]');
        const termsCheckbox = document.getElementById("checkbox1");
        if (!termsCheckbox.checked) {
          // Si la checkbox n'est pas cochée
          termesField.setAttribute("data-error-visible", "true");
          formIsValid = false;
        } else {
          termesField.setAttribute("data-error-visible", "false");
        }
          
        

        }
      
    }
  });




  if (!formIsValid) {
  

    event.preventDefault();
    return false;
  }
 
  return true;
 

}
