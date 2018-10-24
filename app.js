// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    this.y = (Math.floor(Math.random() * 3) + 1) * 83;
    
    this.speed = (Math.floor(Math.random() * 5) + 1);
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Moves one column to the right each dt
    if(this.speed === 1) {this.x += (101 * dt);}
    if(this.speed === 2) {this.x += (202 * dt);}
    if(this.speed === 3) {this.x += (303 * dt);}
    if(this.speed === 4) {this.x += (404 * dt);}
    if(this.speed === 5) {this.x += (505 * dt);}
    
    // Removes this enemy from allEnemies array after it has
    // passed from view so a new enemy can be instantiated
    if(this.x > 505)
    {
      let tempIndex = allEnemies.indexOf(this);
      if(tempIndex > -1)
      {
        allEnemies.splice(tempIndex, 1);
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
    
    // Currently only used under the hood to ensure functionality
    // for the future and to further confirm sound collision logic
    this.score = 0;
};

// Update the player's position, required method for game
// Parameters: dx, change in x; dy, change in y
Player.prototype.update = function(dx, dy) {
  
  // If player has moved into the water,
  // reset their position and score 100 points
  if(this.y === -11)
  {
    this.y = 404;
    this.score += 100;
  }
  
  // Applies changes to x and y
  else
  {
    this.x += dx;
    this.y += dy;
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Ensures the player can not move off-screen
// Parameter: key, a string indicating the key pressed
Player.prototype.handleInput = function(key) {
    
    // Check if player is on left edge
    if(key === 'left')
     {
        if((this.x - 101) >= 0)
        {
          this.update(-101, 0);
        }
        else
          return;
     }
     
     // Check if Player is on right edge
     if(key === 'right')
     {
       if((this.x + 101) <= 404)
        {
          this.update(101, 0);
        }
        else
          return;
     }
     
     // Check if player is on bottom edge
     if(key === 'down')
     {
       if((this.y + 83) <= 404)
        {
          this.update(0, 83);
        }
        else
          return;
     }
     
     // Check if player is on top edge
     if(key === 'up')
     {
       if((this.y - 83) >= -11)
        {
          this.update(0, -83);
        }
        else
          return;
     }
};

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
var player = new Player();
  
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
