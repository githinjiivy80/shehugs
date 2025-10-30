// Store taken usernames so we can block duplicates
let takenUsernames = new Set();

function generateUsername() {
    const hobby = document.getElementById("hobby").value;
    const personality = document.getElementById("personality").value;
    const style = document.getElementById("style").value;
    const emoji = document.getElementById("emoji").value;

    const display = document.getElementById("usernameDisplay");
    display.innerHTML = ""; // Clear previous results

    if (!hobby || !personality || !style || !emoji) {
        display.innerHTML = "⚠️ Please select one from each section before generating!";
        return;
    }

    // Prefixes and reader variations
    const prefixes = ["Anonymous", "Unknown", "Incognito"];
    const readerAddons = ["Reader", "Soul", "Heart"];

    // Generate 8–10 creative options
    let usernames = [];

    prefixes.forEach(prefix => {
        usernames.push(`${prefix} ${personality} ${emoji}`);
        usernames.push(`${prefix} ${hobby} ${style} ${emoji}`);
        usernames.push(`${prefix} ${personality} ${readerAddons[Math.floor(Math.random() * readerAddons.length)]} ${emoji}`);
    });

    // Add a few purely creative mixes
    usernames.push(`Gentle ${personality} ${readerAddons[Math.floor(Math.random() * readerAddons.length)]} ${emoji}`);
    usernames.push(`${prefixes[Math.floor(Math.random() * prefixes.length)]} ${style} ${readerAddons[Math.floor(Math.random() * readerAddons.length)]} ${emoji}`);

    // Remove duplicates
    usernames = [...new Set(usernames)].slice(0, 10);

    // Show results
    usernames.forEach(name => {
        if (takenUsernames.has(name)) {
            let p = document.createElement("p");
            p.textContent = `${name} ❌ (Not available)`;
            display.appendChild(p);
        } else {
            let btn = document.createElement("button");
            btn.textContent = name;
            btn.onclick = function () {
                takenUsernames.add(name);
                localStorage.setItem("chosenUsername", name);
                alert(`✅ You chose: ${name}`);
                window.location.href = "password.html";
            };
            display.appendChild(btn);
        }
    });
}