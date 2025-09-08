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

    // Prefixes
    const prefixes = ["Anonymous", "Unknown", "Incognito"];

    // Generate 6 options (2 from each prefix)
    let usernames = [];
    prefixes.forEach(prefix => {
        usernames.push(`${prefix} ${personality} ${emoji}`);
        usernames.push(`${prefix} ${hobby} ${style} ${emoji}`);
    });

    // Show results
    usernames.forEach(name => {
        // If taken, show "not available"
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
                window.location.href = "password.html"; // redirect to password step
            };
            display.appendChild(btn);
        }
    });
}
