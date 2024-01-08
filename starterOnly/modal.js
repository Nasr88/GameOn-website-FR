function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
function checkAge() {
  // Récupérer la valeur de la date de naissance depuis l'input
  const inputDate = document.getElementById('birthdate');
  const dateNaissance = new Date(inputDate.value);//la chager en date

  // Obtenir la date actuelle
  const dateActuelle = new Date();

  // Calculer la différence entre les années
  const differenceAnnees = dateActuelle.getFullYear() - dateNaissance.getFullYear();

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

// DOM Elements
//const modalbg = document.querySelector(".bground");
const modalInscription = document.getElementById("ModalInscription");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelectorAll(".close"); // Sélectionnez le bouton de fermeture
//const radios = document.getElementsByName('location');//radio botton


modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalInscription.style.display = "block";
}

//attach event
//modalBtnClose.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  this.parentElement.style.display = "none";
}

function submitData(event){
  let isValid=validateForm(event);
  if (isValid){
    const monDiv = document.getElementById('modalConfirmation');
    monDiv.style.display = "block";
    modalInscription.style.display = "none";
    //closeModal();
    event.preventDefault();
  }
}
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

       // const birthdateField = document.getElementById('birthdate');// Récupérer le champ de date de naissance
  
       // const birthdateValue = new Date(birthdateField.value); // Récupération de la date de naissance
        
  
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
