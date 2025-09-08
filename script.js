// Store taken usernames (for now, local simulation)
let takenUsernames = ["AnonymousBraveSinger🌸", "IncognitoFunnyArtist🔥"];

let selectedUsername = null;

// Generate Username Options
function generateUsernames() {
  const hobby = document.getElementById("hobby").value;
  const personality = document.getElementById("personality").value;
  const style = document.getElementById("style").value;
  const emoji = document.getElementById("emoji").value;

  const container = document.getElementById("username-options");
  container.innerHTML = ""; // clear old options
  selectedUsername = null;
  document.getElementById("next-btn").classList.add("hidden");

  // Validate all fields
  if (!hobby || !personality || !style || !emoji) {
    container.innerHTML = `<p class="error">⚠️ Please select one option in each category.</p>`;
    return;
  }

  const prefixes = ["Anonymous", "Unknown", "Incognito"];
  const generated = [];

  // Create 6 unique usernames
  while (generated.length < 6) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const combo = `${prefix}${personality}${hobby}${emoji}`;
    if (!generated.includes(combo)) {
      generated.push(combo);
    }
  }

  // Show usernames
  generated.forEach(name => {
    const div = document.createElement("div");
    div.classList.add("username-option");
    div.innerText = name;

    div.addEventListener("click", () => selectUsername(name, div));
    container.appendChild(div);
  });
}

// Select a Username
function selectUsername(name, element) {
  const options = document.querySelectorAll(".username-option");
  options.forEach(opt => opt.classList.remove("selected"));

  if (takenUsernames.includes(name)) {
    element.classList.add("taken");
    alert("❌ Username not available. Please choose another one.");
    selectedUsername = null;
    document.getElementById("next-btn").classList.add("hidden");
  } else {
    element.classList.add("selected");
    selectedUsername = name;
    document.getElementById("next-btn").classList.remove("hidden");
  }
}

// Go to Password Page
function goToPassword() {
  if (selectedUsername) {
    // Save username to localStorage
    localStorage.setItem("chosenUsername", selectedUsername);
    window.location.href = "password.html"; 
  } else {
    alert("⚠️ Please select a username before continuing.");
  }
}
