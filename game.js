// Karakter oluşturma ve saklama
function createCharacter() {
    const name = document.getElementById('name').value;
    if (name.trim() === "") {
        alert("Lütfen bir karakter ismi girin.");
        return;
    }

    localStorage.setItem('characterName', name);
    alert(`Karakter oluşturuldu: ${name}`);
    document.getElementById('character-creation').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}

// Oyuncunun karakter ismini yerel depolamadan al
document.addEventListener('DOMContentLoaded', (event) => {
    const characterName = localStorage.getItem('characterName');
    if (characterName) {
        document.getElementById('character-creation').style.display = 'none';
        document.getElementById('map').style.display = 'block';
    }
});

// Savaş Sistemi
let playerHealth = 100;
let monsterHealth = 50;

function startBattle() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('battle').style.display = 'block';
    monsterHealth = 50;
    updateBattleLog();
}

function updateBattleLog() {
    document.getElementById('battle-log').textContent = `Senin Sağlığın: ${playerHealth}, Canavarın Sağlığı: ${monsterHealth}`;
}

function attack() {
    const damage = Math.floor(Math.random() * 10) + 1;
    monsterHealth -= damage;
    if (monsterHealth <= 0) {
        alert('Canavarı yendin!');
        document.getElementById('battle').style.display = 'none';
        document.getElementById('map').style.display = 'block';
        return;
    }

    const monsterDamage = Math.floor(Math.random() * 10) + 1;
    playerHealth -= monsterDamage;
    if (playerHealth <= 0) {
        alert('Öldün! Oyun bitti.');
        resetGame();
        return;
    }

    updateBattleLog();
}

function run() {
    alert('Kaçtın!');
    document.getElementById('battle').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}

function resetGame() {
    playerHealth = 100;
    document.getElementById('battle').style.display = 'none';
    document.getElementById('character-creation').style.display = 'block';
    localStorage.removeItem('characterName');
}

// Envanter Sistemi
let inventory = [];

function showInventory() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('inventory').style.display = 'block';
    updateInventoryList();
}

function updateInventoryList() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        inventoryList.appendChild(listItem);
    });
}

function closeInventory() {
    document.getElementById('inventory').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}

// Görev Sistemi
let quests = [
    { name: "İlk Görev", description: "Başlangıç görevini tamamla.", completed: false }
];

function showQuests() {
    document.getElementById('map').style.display = 'none';
    document.getElementById('quests').style.display = 'block';
    updateQuestList();
}

function updateQuestList() {
    const questList = document.getElementById('quest-list');
    questList.innerHTML = '';
    quests.forEach(quest => {
        const listItem = document.createElement('li');
        listItem.textContent = quest.name + (quest.completed ? " (Tamamlandı)" : "");
        questList.appendChild(listItem);
    });
}

function closeQuests() {
    document.getElementById('quests').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}
