import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpI_Pn4l7UOxzULaA9O9r5SdWrtPq9Vq0",
  authDomain: "yorumlar-databse.firebaseapp.com",
  databaseURL: "https://yorumlar-databse-default-rtdb.firebaseio.com",
  projectId: "yorumlar-databse",
  storageBucket: "yorumlar-databse.appspot.com",
  messagingSenderId: "1058969629677",
  appId: "1:1058969629677:web:9824f1c4893d7f85ea6de4",
  measurementId: "G-F1TJCEFDE5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



const pageId = window.location.pathname.split("/").pop().split(".")[0];
const yorumRef = ref(db, "comments/" + pageId);

// Listeleme
onValue(yorumRef, (snapshot) => {
  const container = document.getElementById("yorumListesi");
  if (!container) return;
  container.innerHTML = "";
  snapshot.forEach((child) => {
    const veri = child.val();
    const tarihsaat= new Date(veri.zaman).toLocaleString();
    const p = document.createElement("p");
    p.className = "bg-white p-3 rounded border border-green-300 shadow-sm";
    p.innerHTML = `<strong>${veri.ad}</strong>: ${veri.yorum} <br><span class="text-sm text-gray-500">${tarihsaat}</span>`;
    container.appendChild(p);
  });
});

// Gönderme
document.getElementById("yorumForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const ad = document.getElementById("yorumYazan").value;
  const yorum = document.getElementById("yorumMetni").value;
  const zaman = Date.now();
  push(yorumRef, { ad, yorum, zaman });
  this.reset();
});