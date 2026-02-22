
class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const number = this.getAttribute('number');
        const colorIndex = this.getAttribute('color-index');

        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
                background: conic-gradient(from 120deg at 50% 50%, #555, #333, #555);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5), inset 0 -5px 10px rgba(0,0,0,0.5), 0 0 50px rgba(255,255,255,0.2);
                text-shadow: 0 0 5px rgba(255,255,255,0.7);
                background-color: var(--ball-color-${colorIndex}); /* Fallback */
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoDisplay = document.querySelector('.lotto-display');
const historyList = document.getElementById('history-list');

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    displayNumbers(sortedNumbers);
    updateHistory(sortedNumbers);
}

function displayNumbers(numbers) {
    lottoDisplay.innerHTML = '';
    numbers.forEach((number, index) => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoBall.setAttribute('color-index', (index % 6) + 1);
        lottoDisplay.appendChild(lottoBall);
    });
}

function updateHistory(numbers) {
    const li = document.createElement('li');
    li.textContent = numbers.join(', ');
    historyList.prepend(li);
}

generateBtn.addEventListener('click', generateNumbers);

// Initial generation
generateNumbers();
