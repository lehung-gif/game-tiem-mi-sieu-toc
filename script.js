let score = 0;
let health = 3;
let currentBowl = [];
let customers = [];
const ingredientList = ['🍜', '🥩', '🥬', '🥚'];

function addIngredient(ing) {
    if (currentBowl.length < 2) {
        currentBowl.push(ing);
        document.getElementById('bowl-content').innerText = currentBowl.join(' + ');
    }
}

function clearBowl() {
    currentBowl = [];
    document.getElementById('bowl-content').innerText = 'Trống';
}

function spawnCustomer() {
    if (customers.length >= 3) return;

    const id = Date.now();
    const order = [
        ingredientList[0], // Luôn có mì
        ingredientList[Math.floor(Math.random() * 3) + 1] // Ngẫu nhiên 1 món kèm
    ];
    
    const customer = {
        id: id,
        order: order.sort(),
        timeLeft: 100
    };

    customers.push(customer);
    renderCustomers();
}

function renderCustomers() {
    const container = document.getElementById('customers');
    container.innerHTML = '';
    
    customers.forEach(c => {
        const div = document.createElement('div');
        div.className = 'customer';
        div.innerHTML = `
            <div class="order-bubble">${c.order.join('+')}</div>
            <div style="font-size: 40px">🐱</div>
            <div class="timer-bar"><div class="timer-fill" style="width: ${c.timeLeft}%"></div></div>
        `;
        container.appendChild(div);
    });
}

function serveDish() {
    const bowlStr = [...currentBowl].sort().join('+');
    let foundIndex = customers.findIndex(c => c.order.join('+') === bowlStr);

    if (foundIndex !== -1) {
        score += 10;
        customers.splice(foundIndex, 1);
        document.getElementById('score').innerText = score;
        clearBowl();
    } else {
        alert("Sai món rồi!");
        clearBowl();
    }
    renderCustomers();
}

// Chạy vòng lặp game
setInterval(() => {
    if (health <= 0) return;
    
    customers.forEach((c, index) => {
        c.timeLeft -= 2; // Giảm thời gian
        if (c.timeLeft <= 0) {
            health--;
            document.getElementById('health').innerText = health;
            customers.splice(index, 1);
            if (health <= 0) alert("Cửa hàng phá sản! Điểm của bạn: " + score);
        }
    });
    
    if (Math.random() > 0.97) spawnCustomer(); // Ngẫu nhiên xuất hiện khách
    renderCustomers();
}, 500);

spawnCustomer();
