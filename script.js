// # OPERAZIONI DA FARE AD AVVIO PAGINA

// Recupero gli elementi di interesse dalla pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');


// Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__';

// Preparo una lista di attività
let activities = [];

// Controllo se per caso c'erano delle attività nel local storage
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
  activities = JSON.parse(storage);
}

// Chiedo a JS di decidere cosa mostrare
showContent();

// # OPERAZIONI DINAMICHE 
// Reagisco al Click bottone
button.addEventListener('click', function () {
  // Chiedo di aggiungere l'attività
  addActivity();
});

buttonreset.addEventListener('click', function () {
  deleteActivity();
})

themeSwitchBtn.addEventListener('click', switchTheme);

// # FUNZIONI 

// Funzione che decide cosa mostrare in pagina
function showContent() {
  // Innanzitutto pulisco tutto
  todoList.innerText = '';
  emptyListMessage.innerText = '';

  if (activities.length > 0) {
    // Se c'è almeno una attività...
    // per ciascuna attività...
    activities.forEach(function (activity) {
      // Crea un template HTML
      const template = createActivityTemplate(activity)

      // Inseriscilo in pagina
      todoList.innerHTML += template;
    
    });

    // Rendi cliccabili i check
    makeCheckClickable();

  } else {
    // ALTRIMENTI
    // Mostra il messaggio di lista vuota
    emptyListMessage.innerText = 'Sembra che la tua libreria sia ancora vuota';
  }

}

// Funzione per rendere i check cliccabili
function makeCheckClickable() {
  // Cercare tutti i check e fare sì che siano cliccabili
  const checks = document.querySelectorAll('.todo-check');

  // Per ognuno dei check
  checks.forEach(function (check, index) {
     // Aggiungi una reazione al click
     check.addEventListener('click', function () {
          // Mostrare una finestra di conferma
          const confirmed = window.confirm('Vuoi rimuovere questa attività?');

          if (confirmed) {
              // Rimuovi elemento dalla lista 
              activities.splice(index, 1);
              // Aggiorna storage
              localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
              // Aggiorna la lista in pagina
              showContent();
          }
      });
  });
}

// Funzione per aggiungere attività Click
function addActivity() {
  // Recupero il testo nel campo
  const newActivity = inputField.value.trim();

  // Se il campo non è vuoto... 
  if (newActivity.length > 0) {
    
    // Aggiungo l'attività alla lista
    activities.push(newActivity);
    
    // Aggiorna lo storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    
    // Ora, ridecidi cosa mostrare
    showContent();
    
    // svuoto il campo
    inputField.value = '';
  }
}

function deleteActivity() {
  if (activities.length > 0) {
      if (confirm("Vuoi cancellare tutta la tua libreria?") == true) {
          localStorage.clear(STORAGE_KEY, JSON.stringify(activities))
          activities = []
          showContent()
      }
  } else {
      alert("Non ci sono Manga da da buttare!")
  }
}

// Switch tema scuro
function switchTheme() {
  const currentTheme = document.getElementById('themeLink').getAttribute('href');
  const newTheme = currentTheme === 'light-style.css' ? 'dark-style.css' : 'light-style.css';
  document.getElementById('themeLink').setAttribute('href', newTheme);
}

// Funzione che crea un template HTML per un'attività
function createActivityTemplate(activity) {
  // Restituisci questo pezzo di HTML
  return `
   <li class="todo-item">
     <div class="todo-check">
       <img src="images/icon check1.jpg" alt="Check Icon">
     </div>
     <p class="todo-text">${activity}</p>
   </li>
   `;
}