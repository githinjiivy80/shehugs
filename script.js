// ---------- DATA SETS ----------
const personalities = [
  "Pretty", "Strong", "Kind", "Brave", "Gentle",
  "Creative", "Wise", "Happy", "Calm", "Confident",
  "Loyal", "Smart", "Bold", "Dreamer", "Loving",
  "Peaceful", "Caring", "Unique", "Hopeful", "Cheerful"
];

const hobbies = [
  "Singer", "Artist", "Reader", "Dancer", "Traveler",
  "Writer", "Chef", "Gamer", "Photographer", "Athlete",
  "Gardener", "Painter", "Designer", "Poet", "Musician",
  "Actor", "Crafter", "Explorer", "Teacher", "Leader"
];

const styles = [
  "Gothic", "Chic", "Sporty", "Vintage", "Modern",
  "Minimalist", "Edgy", "Classic", "Romantic", "Trendy",
  "Casual", "Boho", "Elegant", "Retro", "Street",
  "Formal", "Artsy", "Punk", "Cute", "Luxury"
];

const initials = ["Incognito", "Anonymous", "Unknown"];

const emojiOptions = [
  "😊", "🥰", "😎", "🤩", "😇",
  "🤗", "🫶", "🙃", "✨", "🌸",
  "🌺", "🌼", "🌻", "🌹", "💐",
  "🍀", "🍒", "🍓", "🌙", "⭐"
];

// ---------- STORAGE KEYS ----------
const STORAGE_KEYS = {
  chosenUsername: "shehugs-username",
  chosenPassword: "shehugs-password"
};

// ---------- SIGNUP PAGE ----------
function handleSignupPage() {
  const generateBtn = document.getElementById("generate-username");
  if (!generateBtn) return;

  generateBtn.addEventListener("click", () => {
    const selectedPersonality = document.querySelector('input[name="personality"]:checked');
    const selectedHobby = document.querySelector('input[name="hobby"]:checked');
    const selectedStyle = document.querySelector('input[name="style"]:checked');
    const selectedEmoji = document.querySelector('input[name="emoji"]:checked');

    if (!selectedPersonality || !selectedHobby || !selectedStyle || !selectedEmoji) {
      alert("Please select one option from each section.");
      return;
    }

    // Choose random initializer
    const init = initials[Math.floor(Math.random() * initials.length)];
    const personality = selectedPersonality.value;
    const hobby = selectedHobby.value;
    const style = selectedStyle.value;
    const emoji = selectedEmoji.value;

    // Construct username
    const generatedName = `${init} ${personality} ${hobby} ${style} ${emoji}`;

    // Save username and redirect
    localStorage.setItem(STORAGE_KEYS.chosenUsername, generatedName);
    window.location.href = "username.html";
  });
}

// ---------- USERNAME PAGE ----------
function handleUsernamePage() {
  const usernameBox = document.getElementById("generated-username");
  if (!usernameBox) return;

  const savedName = localStorage.getItem(STORAGE_KEYS.chosenUsername);
  if (!savedName) {
    window.location.href = "signup.html";
    return;
  }

  usernameBox.textContent = savedName;

  const confirmBtn = document.getElementById("confirm-username");
  confirmBtn.addEventListener("click", () => {
    window.location.href = "password.html";
  });
}

// ---------- PASSWORD PAGE ----------
function handlePasswordPage() {
  const form = document.getElementById("password-form");
  if (!form) return;

  const usernameField = document.getElementById("final-username");
  usernameField.value = localStorage.getItem(STORAGE_KEYS.chosenUsername) || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMsg = document.getElementById("password-error");

    if (password !== confirmPassword) {
      errorMsg.style.display = "block";
      return;
    }

    errorMsg.style.display = "none";
    localStorage.setItem(STORAGE_KEYS.chosenPassword, password);

    alert("🎉 Account created successfully!");
    window.location.href = "login.html";
  });
}

// ---------- LOGIN PAGE ----------
function handleLoginPage() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const savedUsername = localStorage.getItem(STORAGE_KEYS.chosenUsername);
    const savedPassword = localStorage.getItem(STORAGE_KEYS.chosenPassword);

    if (username === savedUsername && password === savedPassword) {
      alert(`✅ Welcome back, ${username}!`);
      // TODO: Redirect to main user dashboard (home.html)
    } else {
      alert("❌ Invalid username or password.");
    }
  });
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  handleSignupPage();
  handleUsernamePage();
  handlePasswordPage();
  handleLoginPage();
});
