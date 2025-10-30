// Store taken usernames so we can block duplicates
let takenUsernames = new Set();
let allUsernames = [];
let currentLotIndex = 0;
const LOT_SIZE = 7; // how many usernames to show per lot

function generateUsername() {
    const hobby = document.getElementById("hobby").value;
    const personality = document.getElementById("personality").value;
    const style = document.getElementById("style").value;
    const emoji = document.getElementById("emoji").value;

    const display = document.getElementById("usernameDisplay");

    // If first generation or options changed, regenerate all usernames
    if (!allUsernames.length || display.innerHTML === "⚠️ Please select one from each section before generating!") {
        if (!hobby || !personality || !style || !emoji) {
            display.innerHTML = "⚠️ Please select one from each section before generating!";
            return;
        }

        const prefixes = ["Anonymous", "Unknown", "Incognito"];
        const traits = [hobby, personality, style];
        let usernames = new Set();

        // Generate combinations
        prefixes.forEach(prefix => {
            // One-trait combos
            traits.forEach(t1 => usernames.add(`${prefix} ${t1} ${emoji}`));

            // Two-trait combos
            for (let i = 0; i < traits.length; i++) {
                for (let j = i + 1; j < traits.length; j++) {
                    usernames.add(`${prefix} ${traits[i]} ${traits[j]} ${emoji}`);
                }
            }

            // Three-trait combo
            usernames.add(`${prefix} ${traits[0]} ${traits[1]} ${traits[2]} ${emoji}`);
        });

        // Convert Set to Array and shuffle for randomness
        allUsernames = Array.from(usernames).sort(() => Math.random() - 0.5);
        currentLotIndex = 0; // start from first lot
    }

    // Calculate which usernames to show
    const start = currentLotIndex * LOT_SIZE;
    const end = start + LOT_SIZE;
    const lot = allUsernames.slice(start, end);

    // Clear display and show usernames
    display.innerHTML = "";
    lot.forEach(name => {
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

    // Move to next lot (loop back to first after the third)
    currentLotIndex = (currentLotIndex + 1) % Math.ceil(allUsernames.length / LOT_SIZE);
}