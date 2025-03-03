        // Game elements
        const game = document.getElementById('game');
        const character = document.getElementById('character');
        const scoreElement = document.getElementById('score');
        const finalScoreElement = document.getElementById('final-score');
        const gameOverScreen = document.getElementById('game-over');
        const restartButton = document.getElementById('restart');
        
        // Game state
        let isJumping = false;
        let isGameOver = false;
        let score = 0;
        let gameSpeed = 3;
        let jumpHeight = 150;
        let jumpCount = 0;
        let obstacles = [];
        let coins = [];
        let obstacleInterval = 2000; // Time between obstacles in ms
        let coinInterval = 1500; // Time between coins in ms
        
        // Start character running animation
        character.classList.add('running');
        
        // Jump function
        function jump() {
            if (isJumping || isGameOver) return;
            
            isJumping = true;
            jumpCount = 0;
            
            // Jump animation using requestAnimationFrame for smooth motion
            function jumpAnimation() {
                const maxJumpFrames = 30;
                
                if (jumpCount < maxJumpFrames / 2) {
                    // Going up
                    character.style.bottom = (50 + jumpCount * (jumpHeight / (maxJumpFrames/2))) + 'px';
                } else if (jumpCount < maxJumpFrames) {
                    // Going down
                    character.style.bottom = (50 + jumpHeight - (jumpCount - maxJumpFrames/2) * (jumpHeight / (maxJumpFrames/2))) + 'px';
                } else {
                    // Landed
                    character.style.bottom = '50px';
                    isJumping = false;
                    return;
                }
                
                jumpCount++;
                requestAnimationFrame(jumpAnimation);
            }
            
            requestAnimationFrame(jumpAnimation);
        }
        
        // Create obstacle
        function createObstacle() {
            if (isGameOver) return;
            
            const obstacle = document.createElement('div');
            obstacle.classList.add('obstacle');
            obstacle.style.left = game.offsetWidth + 'px';
            
            // Random height for obstacles
            const height = Math.floor(Math.random() * 20) + 30;
            obstacle.style.height = height + 'px';
            
            game.appendChild(obstacle);
            obstacles.push(obstacle);
            
            // Schedule next obstacle with random timing
            const randomDelay = Math.floor(Math.random() * 1000) + obstacleInterval;
            setTimeout(createObstacle, randomDelay);
        }
        
        // Create coin
        function createCoin() {
            if (isGameOver) return;
            
            const coin = document.createElement('div');
            coin.classList.add('coin');
            coin.style.left = game.offsetWidth + 'px';
            
            // Random height for coins
            const height = Math.floor(Math.random() * 100) + 80;
            coin.style.bottom = height + 'px';
            
            game.appendChild(coin);
            coins.push(coin);
            
            // Schedule next coin with random timing
            const randomDelay = Math.floor(Math.random() * 1000) + coinInterval;
            setTimeout(createCoin, randomDelay);
        }
        
        // Move obstacles and coins
        function moveElements() {
            if (isGameOver) return;
            
            // Move obstacles
            for (let i = 0; i < obstacles.length; i++) {
                const obstacle = obstacles[i];
                const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
                
                // Move obstacle
                obstacle.style.left = (obstacleLeft - gameSpeed) + 'px';
                
                // Remove if off screen
                if (obstacleLeft < -50) {
                    obstacle.remove();
                    obstacles.splice(i, 1);
                    i--;
                    continue;
                }
                
                // Check collision
                if (isColliding(character, obstacle)) {
                    gameOver();
                }
            }
            
            // Move coins
            for (let i = 0; i < coins.length; i++) {
                const coin = coins[i];
                const coinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue('left'));
                
                // Move coin
                coin.style.left = (coinLeft - gameSpeed) + 'px';
                
                // Remove if off screen
                if (coinLeft < -50) {
                    coin.remove();
                    coins.splice(i, 1);
                    i--;
                    continue;
                }
                
                // Check collection
                if (isColliding(character, coin)) {
                    coin.remove();
                    coins.splice(i, 1);
                    i--;
                    
                    // Increase score
                    score += 10;
                    scoreElement.textContent = score;
                    
                    // Increase game speed slightly
                    if (score % 50 === 0) {
                        gameSpeed += 0.5;
                    }
                }
            }
            
            requestAnimationFrame(moveElements);
        }
        
        // Collision detection
        function isColliding(element1, element2) {
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();
            
            return !(
                rect1.bottom < rect2.top + 10 || 
                rect1.top > rect2.bottom - 10 || 
                rect1.right < rect2.left + 10 || 
                rect1.left > rect2.right - 10
            );
        }
        
        // Game over
        function gameOver() {
            isGameOver = true;
            character.classList.remove('running');
            finalScoreElement.textContent = score;
            gameOverScreen.style.display = 'flex';
        }
        
        // Restart game
        function restartGame() {
            // Reset game state
            isGameOver = false;
            score = 0;
            gameSpeed = 3;
            scoreElement.textContent = score;
            
            // Clear obstacles and coins
            obstacles.forEach(obstacle => obstacle.remove());
            coins.forEach(coin => coin.remove());
            obstacles = [];
            coins = [];
            
            // Reset character
            character.style.bottom = '50px';
            character.classList.add('running');
            
            // Hide game over screen
            gameOverScreen.style.display = 'none';
            
            // Start game
            setTimeout(createObstacle, obstacleInterval);
            setTimeout(createCoin, coinInterval);
            moveElements();
        }
        
        // Event listeners
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                jump();
                event.preventDefault(); // Prevent space from scrolling page
            }
        });
        
        // Touch support for mobile
        game.addEventListener('touchstart', function(event) {
            jump();
            event.preventDefault();
        });
        
        restartButton.addEventListener('click', restartGame);
        
        // Start game
        setTimeout(createObstacle, obstacleInterval);
        setTimeout(createCoin, coinInterval);
        moveElements();
