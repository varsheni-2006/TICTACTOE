class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.scores = { X: 0, O: 0 };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.gameBoard = document.getElementById('gameBoard');
        this.currentPlayerElement = document.getElementById('current-player');
        this.scoreXElement = document.getElementById('score-x');
        this.scoreOElement = document.getElementById('score-o');
        this.winnerMessage = document.getElementById('winnerMessage');
        this.winnerText = document.getElementById('winnerText');
        this.sparklesContainer = document.getElementById('sparklesContainer');
        
        this.resetBtn = document.getElementById('resetBtn');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        this.bindEvents();
        this.updateDisplay();
    }
    
    bindEvents() {
        // Cell clicks
        this.gameBoard.addEventListener('click', (e) => {
            if (e.target.classList.contains('cell') && !this.gameOver) {
                const index = parseInt(e.target.dataset.index);
                this.makeMove(index);
            }
        });
        
        // Button clicks
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.newGameBtn.addEventListener('click', () => this.newMatch());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9' && !this.gameOver) {
                const index = parseInt(e.key) - 1;
                this.makeMove(index);
            }
            if (e.key === 'r' || e.key === 'R') {
                this.resetGame();
            }
        });
    }
    
    makeMove(index) {
        if (this.board[index] !== '' || this.gameOver) return;
        
        this.board[index] = this.currentPlayer;
        this.updateCell(index);
        
        const winner = this.checkWinner();
        if (winner) {
            this.handleWin(winner);
        } else if (this.board.every(cell => cell !== '')) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    updateCell(index) {
        const cell = this.gameBoard.children[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add('taken', this.currentPlayer.toLowerCase());
        
        // Add entrance animation
        cell.style.animation = 'none';
        cell.offsetHeight; // Trigger reflow
        cell.style.animation = 'popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    checkWinner() {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return { player: this.board[a], combination };
            }
        }
        return null;
    }
    
    handleWin(winner) {
        this.gameOver = true;
        this.scores[winner.player]++;
        
        // Highlight winning cells with enhanced 3D effect
        winner.combination.forEach((index, i) => {
            setTimeout(() => {
                this.gameBoard.children[index].classList.add('winning');
            }, i * 200);
        });
        
        // Show winner message with delay for dramatic effect
        setTimeout(() => {
            this.showWinnerMessage(`Player ${winner.player} Wins!`);
            this.createMegaSparkleEffect();
            this.createColorfulExplosion();
        }, 1000);
        
        this.updateDisplay();
    }
    
    handleDraw() {
        this.gameOver = true;
        setTimeout(() => {
            this.showWinnerMessage("It's a Draw!");
            this.createDrawSparkleEffect();
        }, 500);
    }
    
    showWinnerMessage(message) {
        this.winnerText.textContent = message;
        this.winnerMessage.classList.add('show');
    }
    
    hideWinnerMessage() {
        this.winnerMessage.classList.remove('show');
    }
    
    createMegaSparkleEffect() {
        const colors = ['cyan', 'magenta', 'gold', 'red', 'green', 'purple', 'orange', 'pink', 'blue', 'lime'];
        const sparkleCount = 150; // Increased from 50
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = `sparkle ${colors[Math.floor(Math.random() * colors.length)]}`;
                
                // Random position across entire screen
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = window.innerHeight + Math.random() * 100 + 'px';
                
                // Varied sizes for more visual interest
                const size = Math.random() * 15 + 6; // Increased size range
                sparkle.style.width = size + 'px';
                sparkle.style.height = size + 'px';
                
                // Varied animation duration
                const duration = Math.random() * 2 + 2; // Longer duration
                sparkle.style.animationDuration = duration + 's';
                
                // Add random rotation
                sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                this.sparklesContainer.appendChild(sparkle);
                
                // Remove sparkle after animation
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, duration * 1000);
            }, Math.random() * 1000); // Spread over 1 second
        }
        
        // Enhanced screen effects
        this.createScreenEffects();
    }
    
    createColorfulExplosion() {
        const colors = ['cyan', 'magenta', 'gold', 'red', 'green', 'purple', 'orange', 'pink', 'blue', 'lime'];
        const explosionCount = 80;
        
        // Create explosion from center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < explosionCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = `sparkle ${colors[Math.floor(Math.random() * colors.length)]}`;
                
                // Start from center and explode outward
                const angle = (Math.PI * 2 * i) / explosionCount;
                const distance = Math.random() * 300 + 100;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                
                const size = Math.random() * 12 + 8;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Custom explosion animation
                particle.style.animation = 'none';
                particle.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                this.sparklesContainer.appendChild(particle);
                
                // Animate to final position
                setTimeout(() => {
                    particle.style.left = endX + 'px';
                    particle.style.top = endY + 'px';
                    particle.style.opacity = '0';
                    particle.style.transform = `scale(0) rotate(720deg)`;
                }, 50);
                
                // Remove particle
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1600);
            }, Math.random() * 300);
        }
    }
    
    createDrawSparkleEffect() {
        const colors = ['cyan', 'magenta', 'gold'];
        const sparkleCount = 60;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = `sparkle ${colors[Math.floor(Math.random() * colors.length)]}`;
                
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = window.innerHeight + 'px';
                
                const size = Math.random() * 10 + 5;
                sparkle.style.width = size + 'px';
                sparkle.style.height = size + 'px';
                
                const duration = Math.random() * 1.5 + 1.5;
                sparkle.style.animationDuration = duration + 's';
                
                this.sparklesContainer.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, duration * 1000);
            }, Math.random() * 800);
        }
    }
    
    createScreenEffects() {
        // Enhanced screen shake
        document.body.style.animation = 'screenShake 0.8s ease-in-out';
        
        // Color flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, 
                rgba(255, 215, 0, 0.3) 0%, 
                rgba(255, 0, 255, 0.2) 30%, 
                rgba(0, 255, 255, 0.1) 60%, 
                transparent 100%);
            pointer-events: none;
            z-index: 998;
            animation: flashEffect 1s ease-out;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            document.body.style.animation = '';
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        }, 1000);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
        this.currentPlayerElement.style.color = this.currentPlayer === 'X' ? '#ff00ff' : '#ffd700';
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameOver = false;
        
        // Clear all cells with staggered animation
        Array.from(this.gameBoard.children).forEach((cell, index) => {
            setTimeout(() => {
                cell.textContent = '';
                cell.className = 'cell';
                cell.style.animation = 'popIn 0.3s ease-out reverse';
            }, index * 50);
        });
        
        this.hideWinnerMessage();
        this.updateDisplay();
    }
    
    newMatch() {
        this.resetGame();
        this.scores = { X: 0, O: 0 };
        this.updateDisplay();
    }
    
    playAgain() {
        this.resetGame();
    }
}

// Enhanced screen shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
        10% { transform: translateX(-15px) translateY(-10px) rotate(-1deg); }
        20% { transform: translateX(15px) translateY(10px) rotate(1deg); }
        30% { transform: translateX(-15px) translateY(-10px) rotate(-1deg); }
        40% { transform: translateX(15px) translateY(10px) rotate(1deg); }
        50% { transform: translateX(-10px) translateY(-5px) rotate(-0.5deg); }
        60% { transform: translateX(10px) translateY(5px) rotate(0.5deg); }
        70% { transform: translateX(-10px) translateY(-5px) rotate(-0.5deg); }
        80% { transform: translateX(10px) translateY(5px) rotate(0.5deg); }
        90% { transform: translateX(-5px) translateY(-2px) rotate(-0.2deg); }
    }
    
    @keyframes flashEffect {
        0% { opacity: 0; }
        20% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Enhanced cursor trail with multiple colors
document.addEventListener('mousemove', (e) => {
    const colors = [
        'rgba(0, 255, 255, 0.8)',
        'rgba(255, 0, 255, 0.8)',
        'rgba(255, 215, 0, 0.8)',
        'rgba(255, 107, 107, 0.8)',
        'rgba(46, 213, 115, 0.8)'
    ];
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
    }, 1000);
});

// Enhanced cursor trail fade animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorFade {
        0% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0) rotate(180deg); 
        }
    }
`;
document.head.appendChild(cursorStyle);