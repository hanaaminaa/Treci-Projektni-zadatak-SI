import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
const firebaseConfig = {
 apiKey: "AIzaSyAgptBvWAhA-wS7kRxkss_UFoSFyfseoA0",
 authDomain: "si-todolista.firebaseapp.com",
 // ⚠️ OVO MORA BITI URL NJENE (si-todolista) REALTIME DATABASE!
 // U Firebase Console → Build → Realtime Database → Data (gore ima link/URL baze)
 // Primjer format-a: https://si-todolista-default-rtdb.europe-west1.firebasedatabase.app
 databaseURL: "https://si-todolista-default-rtdb.europe-west1.firebasedatabase.app",
 projectId: "si-todolista",
 storageBucket: "si-todolista.appspot.com",
 messagingSenderId: "801025289554",
 appId: "1:801025289554:web:895e7a2d30fc7d5ac5de8b"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const tasksRef = ref(db, "tasks");
const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
btn.addEventListener("click", () => {
 const text = input.value.trim();
 if (!text) return;
 push(tasksRef, { text })
   .then(() => {
     input.value = "";
     input.focus();
   })
   .catch((err) => {
     console.error(err);
     alert("Greška: " + err.message);
   });
});
onValue(tasksRef, (snapshot) => {
 list.innerHTML = "";
 snapshot.forEach((child) => {
   const task = child.val();
   const li = document.createElement("li");
   li.textContent = task.text;
   list.appendChild(li);
 });
});