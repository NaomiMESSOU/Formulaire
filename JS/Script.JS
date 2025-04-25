// ========== INSCRIPTION ==========
const registerForm = document.querySelector('form');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nom = document.querySelector("input[placeholder='Entrer votre nom']").value;
        const prenom = document.querySelector("input[placeholder='Entrer votre prénom']").value;
        const email = document.querySelector("input[placeholder='Entrer votre E-mail']").value;
        const password = document.querySelector("input[placeholder='Entrer votre de mot de passe']").value;
        const confirmPassword = document.querySelector("input[placeholder='Confirme mot de passe']").value;

        if (password !== confirmPassword) {
            alert("⚠ Les mots de passe ne correspondent pas.");
            return;
        }

        const newUser = { nom, prenom, email, password };

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Vérifier si l'email existe déjà
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            alert("⚠ Un utilisateur avec cet email existe déjà.");
            return;
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("✅ Inscription réussie !");
        window.location.href = "Connexion.html";
    });
}

// ========== CONNEXION ==========
const loginForm = document.querySelector("#login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nomInput = document.getElementById("login-nom").value;
        const prenomInput = document.getElementById("login-prenom").value;
        const passwordInput = document.getElementById("login-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const matchingUser = users.find(u =>
            u.nom === nomInput &&
            u.prenom === prenomInput &&
            u.password === passwordInput
        );

        if (matchingUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(matchingUser));
            alert("✅ Connexion réussie !");
            setTimeout(() => {
                window.location.href = "accueil.html";
            }, Math.floor(Math.random() * (10000 - 5000) + 5000)); // 5 à 10 secondes
        } else {
            alert("❌ Identifiants incorrects. Redirection vers l'inscription...");
            setTimeout(() => {
                window.location.href = "inscription.html";
            }, 3000);
        }
    });
}

// ========== PAGE D'ACCUEIL ==========
window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const dashboard = document.getElementById("dashboard");
  
    if (user && dashboard) {
      dashboard.innerHTML = `
        <h2>Tableau de bord</h2>
        <p>👤 Nom : ${user.nom}</p>
        <p>👤 Prénom : ${user.prenom}</p>
        <p>📧 Email : ${user.email}</p>
      `;
    } else if (!user && window.location.pathname.includes("accueil.html")) {
      window.location.href = "Connexion.html";
    }
  });
  
  // ========= TO DO LIST ============
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
  
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      if (task.done) li.classList.add("done");
  
      li.innerHTML = `
        <div class="task-text" onclick="toggleDone(${index})">
          ${task.done ? "✅" : "⬜"} <span>${task.text}</span>
        </div>
        <button onclick="deleteTask(${index})">Supprimer</button>
      `;
      taskList.appendChild(li);
    });
  }
  
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
  
    if (taskText !== "") {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, done: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = "";
      loadTasks();
    }
  }
  
  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
  
  function toggleDone(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
  
  function logout() {
    // Optionnel : vide le localStorage ou redirige
    alert("Déconnexion !");
  }
  
  // Charger les tâches dès que la page est prête
  window.addEventListener("DOMContentLoaded", loadTasks);
  
  
  // ========== DECONNEXION ==========
  function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Déconnexion réussie !");
    window.location.href = "Connexion.html";
  }
  
  
  