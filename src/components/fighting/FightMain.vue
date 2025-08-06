<template>
    <div class="game-screen">
      <!-- Неоновые здания -->
      <div class="cyber-buildings"></div>

      <!-- Дорога с неоновой разметкой -->
      <div class="cyber-road"></div>

      <!-- Неоновые вывески -->
      <div class="neon-signs">
        <div class="neon-sign" style="left: 15%;">夜</div>
        <div class="neon-sign" style="left: 35%;">未来</div>
        <div class="neon-sign" style="left: 65%;">サイバー</div>
        <div class="neon-sign" style="left: 85%;">都市</div>
      </div>

      <!-- Sword points -->
      <div
        v-for="(point, index) in swordPoints"
        :key="index"
        class="sword-point"
        :style="{
          left: point.x + 'px',
          bottom: point.y + 'px',
          backgroundColor: point.color,
          display: point.visible ? 'block' : 'none'
        }"
      ></div>

      <!-- Balls -->
      <div
        v-for="(ball, index) in balls"
        :key="'ball-' + index"
        class="ball"
        :style="{
          left: ball.x + 'px',
          bottom: ball.y + 'px',
          backgroundColor: ball.color,
          display: ball.visible ? 'block' : 'none'
        }"
      ></div>

      <!-- Characters -->
      <div
        v-for="(player, index) in players"
        :key="index"
        class="character"
        :class="'player' + (index + 1)"
        :style="{
          left: player.bodyLeft + 'px',
          bottom: player.bodyBottom + 'px',
          transform: getCharacterTransform(index),
          filter: player.isRed ? 'hue-rotate(0deg) brightness(1.5) saturate(5)' : 'none',
          backgroundImage: getCharacterSprite(index),
          width: getCharacterWidth(index) + 'px',
          height: getCharacterHeight(index) + 'px'
        }"
      ></div>

      <div class="floor"></div>
    </div>
</template>


<script>

import blockSprite from '@/assets/sonya/block.png';
import preThrowSprite from '@/assets/sonya/pre-throw.png';
import throwSprite from '@/assets/sonya/thwrow.png';
import upperAttackSprite from '@/assets/sonya/upper-attack.png';

// Import attack sprites
import attack1 from '@/assets/main-attack/attack1.png';
import attack2 from '@/assets/main-attack/attack2.png';
import attack3 from '@/assets/main-attack/attack3.png';
import attack4 from '@/assets/main-attack/attack4.png';
import attack5 from '@/assets/main-attack/attack5.png';
import attack6 from '@/assets/main-attack/attack6.png';
import attack7 from '@/assets/main-attack/attack7.png';
import attack8 from '@/assets/main-attack/attack8.png';
import attack9 from '@/assets/main-attack/attack9.png';

// Import stay animation sprites
import stay1 from '@/assets/stay/stay1.png';
import stay2 from '@/assets/stay/stay2.png';
import stay3 from '@/assets/stay/stay3.png';
import stay4 from '@/assets/stay/stay4.png';

export default {
  name: 'HomeView',
  data() {
    return {
      // Game constants
      FLOOR_HEIGHT: 80,
      POINT_LIFETIME: 50,
      POINT_SPACING: 5,
      BALL_SPEED: 3,
      BALL_SIZE: 20,
      JUMP_STRENGTH: 90,
      JUMP_DURATION: 500,
      ATTACK_DURATION: 400,
      UPPERCUT_DURATION: 400,
      RED_EFFECT_DURATION: 100,
      ATTACK_COOLDOWN: 1000,
      UPPERCUT_COOLDOWN: 1500,
      THROW_COOLDOWN: 1000,
      THROW_DELAY: 200,
      ACTION_LOCK_DURATION: 300,
      BLOCK_DURATION: 500,
      BLOCK_COOLDOWN: 1000,
      STUN_DURATION: 1000,
      
      // Sprite dimensions
      SPRITE_WIDTH: 160,
      SPRITE_HEIGHT: 240,
      
      // Attack sprites array
      ATTACK_SPRITES: [
        attack1, attack2, attack3, attack4, attack5, 
        attack6, attack7, attack8, attack9
      ],
      
      // Stay animation sprites
      STAY_SPRITES: [stay1, stay2, stay3, stay4],
      STAY_ANIMATION_DURATION: 1050,
      STAY_ANIMATION_FORWARD_DURATION: 600,
      
      // Players array
      players: [
        {
          bodyLeft: 200, 
          bodyBottom: 80, 
          movementSpeed: 2, 
          facingLeft: false, 
          movementDirection: 0,
          isJumping: false, 
          isAttacking: false,
          isUppercutting: false,
          isBlocking: false, 
          isStunned: false,
          isDead: false, 
          isThrowing: false,
          jumpProgress: 0,
          attackProgress: 0, 
          uppercutProgress: 0,
          stunTimer: 0,
          blockProgress: 0, 
          attackCooldown: 0,
          uppercutCooldown: 0,
          throwCooldown: 0, 
          throwDelay: 0,
          blockCooldown: 0,
          isRed: false,
          lastStayAnimationUpdate: 0,
          currentStayFrame: 0,
        },
        {
          bodyLeft: 600, 
          bodyBottom: 80, 
          movementSpeed: 2, 
          facingLeft: true, 
          movementDirection: 0,
          isJumping: false, 
          isAttacking: false,
          isUppercutting: false,
          isBlocking: false, 
          isStunned: false,
          isDead: false, 
          isThrowing: false,
          jumpProgress: 0,
          attackProgress: 0, 
          uppercutProgress: 0,
          stunTimer: 0,
          blockProgress: 0, 
          attackCooldown: 0,
          uppercutCooldown: 0,
          throwCooldown: 0, 
          throwDelay: 0,
          blockCooldown: 0,
          isRed: false,
          lastStayAnimationUpdate: 0,
          currentStayFrame: 0,
        }
      ],
      
      swordPoints: [],
      balls: [],
      lastTimestamp: 0,
      animationFrameId: null
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.lastTimestamp = performance.now();
    this.gameLoop();
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  },
  methods: {
    /** === Key controls === **/
    handleKeyDown(event) {
      switch (event.key.toLowerCase()) {
        case 'a': this.startMovement(0, -1); break;
        case 'd': this.startMovement(0, 1); break;
        case 'w': this.initiateJump(0); break;
        case ' ': this.initiateAttack(0); break;
        case 'e': this.initiateUppercut(0); break;
        case 'q': this.initiateThrow(0); break;
        case 's': this.initateBlock(0); break;
        case 'arrowleft': this.startMovement(1, -1); break;
        case 'arrowright': this.startMovement(1, 1); break;
        case 'arrowup': this.initiateJump(1); break;
        case 'enter': this.initiateAttack(1); break;
        case 'control': this.initiateUppercut(1); break;
        case 'shift': this.initiateThrow(1); break;
        case 'arrowdown': this.initateBlock(1); break;
      }
    },
    
    handleKeyUp(event) {
      const key = event.key.toLowerCase();
      if (key === 'a' || key === 'd') this.stopMovement(0);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') this.stopMovement(1);
    },
    
    // Start movement
    startMovement(playerIndex, direction) {
      if (!this.canPerformAction(playerIndex)) return;
      this.players[playerIndex].movementDirection = direction;
      this.players[playerIndex].facingLeft = (direction === -1);
    },
    
    // Stop movement
    stopMovement(playerIndex) {
      this.players[playerIndex].movementDirection = 0;
    },
    
    // Check if player can perform actions
    canPerformAction(playerIndex) {
      const player = this.players[playerIndex];
      return !player.isDead && !player.isStunned && !player.isAttacking && 
            !player.isUppercutting && !player.isBlocking && !player.isThrowing;
    },
    
    initiateJump(playerIndex) {
      const player = this.players[playerIndex];
      if (player.isDead || player.isStunned) return;
      if (player.isJumping) return;
      
      player.isJumping = true;
      player.jumpProgress = 0;
    },
    
    initiateAttack(playerIndex) {
      const player = this.players[playerIndex];
      if (player.isDead || player.isStunned || player.attackCooldown > 0) return;
      if (player.isJumping) {
        // Can attack while jumping
        player.isAttacking = true;
        player.attackProgress = 0;
        player.attackCooldown = this.ATTACK_COOLDOWN;
        player.isRed = true;
        setTimeout(() => (player.isRed = false), this.RED_EFFECT_DURATION);
      } else if (!player.isAttacking && !player.isUppercutting && !player.isBlocking && !player.isThrowing) {
        player.isAttacking = true;
        player.attackProgress = 0;
        player.attackCooldown = this.ATTACK_COOLDOWN;
        player.isRed = true;
        setTimeout(() => (player.isRed = false), this.RED_EFFECT_DURATION);
      }
    },
    
    // Initiate uppercut attack
    initiateUppercut(playerIndex) {
      const player = this.players[playerIndex];
      if (player.isDead || player.isStunned || player.uppercutCooldown > 0) return;
      if (player.isJumping) {
        // Can uppercut while jumping
        player.isUppercutting = true;
        player.uppercutProgress = 0;
        player.uppercutCooldown = this.UPPERCUT_COOLDOWN;
        player.isRed = true;
        setTimeout(() => (player.isRed = false), this.RED_EFFECT_DURATION);
      } else if (!player.isAttacking && !player.isUppercutting && !player.isBlocking && !player.isThrowing) {
        player.isUppercutting = true;
        player.uppercutProgress = 0;
        player.uppercutCooldown = this.UPPERCUT_COOLDOWN;
        player.isRed = true;
        setTimeout(() => (player.isRed = false), this.RED_EFFECT_DURATION);
      }
    },
    
    initateBlock(playerIndex) {
      const player = this.players[playerIndex];
      if (player.isDead || player.isStunned || player.blockCooldown > 0) return;
      if (player.isJumping) {
        // Can block while jumping
        player.isBlocking = true;
        player.blockProgress = 0;
      } else if (!player.isAttacking && !player.isUppercutting && !player.isBlocking && !player.isThrowing) {
        player.isBlocking = true;
        player.blockProgress = 0;
      }
    },
    
    // Initiate throw (with delay)
    initiateThrow(playerIndex) {
      const player = this.players[playerIndex];
      if (player.isDead || player.isStunned || player.throwCooldown > 0) return;
      if (player.isJumping) {
        // Can throw immediately while jumping
        this.executeThrow(playerIndex);
      } else if (!player.isAttacking && !player.isUppercutting && !player.isBlocking && !player.isThrowing) {
        player.isThrowing = true;
        player.throwDelay = this.THROW_DELAY;
      }
    },
    
    // Execute throw
    executeThrow(playerIndex) {
      const player = this.players[playerIndex];
      const direction = player.facingLeft ? -1 : 1;
      this.balls.push({
        x: player.bodyLeft + (direction === -1 ? 100 : 100),
        y: player.bodyBottom + 130,
        playerIndex: playerIndex,
        color: playerIndex === 0 ? 'red' : 'purple',
        visible: true,
        speed: this.BALL_SPEED,
        direction
      });
      player.throwCooldown = this.THROW_COOLDOWN;
      player.isThrowing = false;
    },
    
    /** === Game loop === **/
    gameLoop(timestamp = 0) {
      const deltaTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;
      this.updateGameState(deltaTime);
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    },
    
    updateGameState(deltaTime) {
      this.players.forEach((player, index) => {
        // Movement
        if (player.movementDirection !== 0 && !player.isDead && !player.isStunned) {
          player.bodyLeft = Math.max(0, Math.min(980, player.bodyLeft + player.movementSpeed * player.movementDirection));
        }

        // Jump
        if (player.isJumping) {
          player.jumpProgress += deltaTime;
          const progressFraction = Math.min(player.jumpProgress / this.JUMP_DURATION, 1);
          player.bodyBottom = this.FLOOR_HEIGHT + this.JUMP_STRENGTH * Math.sin(progressFraction * Math.PI);
          if (progressFraction >= 1) {
            player.isJumping = false;
            player.bodyBottom = this.FLOOR_HEIGHT;
          }
        }

        // Normal attack
        if (player.isAttacking) {
          player.attackProgress += deltaTime;
          this.generateSwordPoints(index, false);
          if (player.attackProgress >= this.ATTACK_DURATION) {
            player.isAttacking = false;
          }
        }

        // Uppercut attack
        if (player.isUppercutting) {
          player.uppercutProgress += deltaTime;
          this.generateSwordPoints(index, true);
          if (player.uppercutProgress >= this.UPPERCUT_DURATION) {
            player.isUppercutting = false;
          }
        }

        // Throw preparation
        if (player.isThrowing) {
          player.throwDelay -= deltaTime;
          if (player.throwDelay <= 0) {
            this.executeThrow(index);
          }
        }
        
        // If player is dead, reset all actions
        if (player.isDead) {
          player.isJumping = false;
          player.isAttacking = false;
          player.isUppercutting = false;
          player.isBlocking = false;
          player.isThrowing = false;
          player.movementDirection = 0;
          return; // Don't continue updating this player
        }

        // Update cooldowns
        player.attackCooldown = Math.max(0, player.attackCooldown - deltaTime);
        player.uppercutCooldown = Math.max(0, player.uppercutCooldown - deltaTime);
        player.throwCooldown = Math.max(0, player.throwCooldown - deltaTime);
        player.blockCooldown = Math.max(0, player.blockCooldown - deltaTime);

        // Block
        if (player.isBlocking) {
          player.blockProgress += deltaTime;
          if (player.blockProgress >= this.BLOCK_DURATION) {
            player.isBlocking = false;
            player.blockCooldown = this.BLOCK_COOLDOWN;
          }
        }

        // Stun
        if (player.isStunned) {
          player.stunTimer -= deltaTime;
          if (player.stunTimer <= 0) player.isStunned = false;
        }
      });

      // Players face each other
      if (!this.players[0].isDead && !this.players[1].isDead) {
        this.players[0].facingLeft = this.players[0].bodyLeft + 10 > this.players[1].bodyLeft;
        this.players[1].facingLeft = this.players[1].bodyLeft + 10 > this.players[0].bodyLeft;
      }

      // Update sword points and balls
      this.updateSwordPoints(deltaTime);
      this.checkCollisions();
      this.updateEnergyBalls();
    },
    
    // Stay animation
    getStayAnimationSprite(playerIndex) {
      const player = this.players[playerIndex];
      const now = performance.now();
      
      if (now - player.lastStayAnimationUpdate > 50) {
        const cycleTime = now % this.STAY_ANIMATION_DURATION;
        const frameCount = this.STAY_SPRITES.length;
        
        if (cycleTime < this.STAY_ANIMATION_FORWARD_DURATION) {
          const progress = cycleTime / this.STAY_ANIMATION_FORWARD_DURATION;
          player.currentStayFrame = Math.min(Math.floor(progress * frameCount), frameCount - 1);
        } else {
          const reverseProgress = (cycleTime - this.STAY_ANIMATION_FORWARD_DURATION) / 
                                (this.STAY_ANIMATION_DURATION - this.STAY_ANIMATION_FORWARD_DURATION);
          player.currentStayFrame = frameCount - 2 - Math.floor(reverseProgress * (frameCount - 2));
        }
        
        player.currentStayFrame = Math.max(0, Math.min(player.currentStayFrame, frameCount - 1));
        player.lastStayAnimationUpdate = now;
      }
      
      return `url(${this.STAY_SPRITES[player.currentStayFrame]})`;
    },
    
    // Get character sprite
    getCharacterSprite(playerIndex) {
      const player = this.players[playerIndex];
      
      if (player.isDead) return `url(${this.STAY_SPRITES[0]})`;
      if (player.isStunned) return `url(${this.STAY_SPRITES[0]})`;
      if (player.isAttacking) {
        const frameCount = this.ATTACK_SPRITES.length;
        const progressFraction = Math.min(player.attackProgress / this.ATTACK_DURATION, 1);
        const frameIndex = Math.min(
          Math.floor(progressFraction * frameCount), 
          frameCount - 1
        );
        return `url(${this.ATTACK_SPRITES[frameIndex]})`;
      }
      if (player.isUppercutting) return `url(${upperAttackSprite})`;
      if (player.isBlocking) return `url(${blockSprite})`;
      if (player.isThrowing) {
        return player.throwDelay > 0 ? `url(${preThrowSprite})` : `url(${throwSprite})`;
      }
      
      // Use new stay animation
      return this.getStayAnimationSprite(playerIndex);
    },
    
    // Get character width
    getCharacterWidth(playerIndex) {
      return this.SPRITE_WIDTH;
    },
    
    // Get character height
    getCharacterHeight(playerIndex) {
      return this.SPRITE_HEIGHT;
    },
    
    // Character transform
    getCharacterTransform(playerIndex) {
      const player = this.players[playerIndex];
      let transform = player.facingLeft ? 'scaleX(-1)' : 'scaleX(1)';
      if (player.isDead) transform += ' rotate(90deg)';
      else if (player.isStunned) transform += ' rotate(10deg)';
      return transform;
    },
    
    // Generate sword points during attack
    generateSwordPoints(playerIndex, isUppercut) {
      const player = this.players[playerIndex];
      let progressFraction, angle;
      
      if (isUppercut) {
        progressFraction = Math.min(player.uppercutProgress / this.UPPERCUT_DURATION, 1);
        angle = (player.facingLeft ? 300 : -300) * progressFraction;
      } else {
        progressFraction = Math.min(player.attackProgress / this.ATTACK_DURATION, 1);
        angle = (player.facingLeft ? -300 : 300) * progressFraction;
      }
      
      const angleRadians = (angle * Math.PI) / 180;
      const baseX = player.bodyLeft + (player.facingLeft ? -10 : this.SPRITE_WIDTH - 10);
      const baseY = player.bodyBottom + this.SPRITE_HEIGHT / 2;
      const pointCount = Math.floor(80 / this.POINT_SPACING);
      
      for (let i = 0; i <= pointCount; i++) {
        const fraction = i / pointCount;
        this.swordPoints.push({
          x: baseX + 80 * fraction * Math.sin(angleRadians),
          y: baseY + 80 * fraction * Math.cos(angleRadians),
          playerIndex: playerIndex,
          color: playerIndex === 0 ? 'red' : 'purple',
          visible: true,
          lifetime: this.POINT_LIFETIME,
          isUppercut: isUppercut
        });
      }
    },
    
    // Remove old sword points
    updateSwordPoints(deltaTime) {
      this.swordPoints = this.swordPoints.filter(point => {
        point.lifetime -= deltaTime;
        return point.lifetime > 0 && point.visible;
      });
    },
    
    // Update ball positions
    updateEnergyBalls() {
      const stepSize = 2;
      const updatedBalls = [];

      for (const ball of this.balls) {
        let steps = Math.ceil(Math.abs(ball.speed * ball.direction) / stepSize);
        let stepDx = (ball.speed * ball.direction) / steps;

        let destroyed = false;

        for (let i = 0; i < steps; i++) {
          ball.x += stepDx;

          // Check out of bounds
          if (ball.x < -this.BALL_SIZE || ball.x > 1000 + this.BALL_SIZE) {
            destroyed = true;
            break;
          }

          // Check collision with other ball
          for (const otherBall of this.balls) {
            if (ball === otherBall) continue;
            if (ball.playerIndex === otherBall.playerIndex) continue;

            const dx = ball.x - otherBall.x;
            const dy = ball.y - otherBall.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.BALL_SIZE) {
              destroyed = true;
              otherBall.visible = false;
              break;
            }
          }

          if (destroyed) break;

          // Check hit on player
          const targetPlayer = this.players[1 - ball.playerIndex];
          if (!targetPlayer.isDead && this.isColliding(ball.x, ball.y, 1 - ball.playerIndex, this.BALL_SIZE / 2)) {
            this.applyHitEffect(ball.playerIndex, 1 - ball.playerIndex, false);
            destroyed = true;
            break;
          }
        }

        if (!destroyed && ball.visible !== false) {
          updatedBalls.push(ball);
        }
      }

      this.balls = updatedBalls;
    },
    
    // Check collisions
    checkCollisions() {
      // Sword point hitting player
      this.swordPoints.forEach(point => {
        if (!point.visible) return;
        const targetPlayer = this.players[1 - point.playerIndex];
        if (targetPlayer.isDead) return;

        if (this.isColliding(point.x, point.y, 1 - point.playerIndex, this.POINT_SPACING / 2)) {
          if (point.isUppercut || !targetPlayer.isBlocking) {
            this.applyHitEffect(point.playerIndex, 1 - point.playerIndex, point.isUppercut);
          } else {
            this.stunAttacker(point.playerIndex);
          }
          point.visible = false;
        }
      });

      // Sword hitting ball
      this.swordPoints.forEach(point => {
        if (!point.visible) return;
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i];
          if (ball.playerIndex === point.playerIndex) continue;

          if (this.isPointCollidingWithBall(point, ball)) {
            ball.visible = false;
            point.visible = false;
            break;
          }
        }
      });

      // Ball hitting player (ignoring block)
      this.balls = this.balls.filter(ball => {
        const targetPlayer = this.players[1 - ball.playerIndex];
        if (targetPlayer.isDead) return true;

        if (this.isColliding(ball.x, ball.y, 1 - ball.playerIndex, this.BALL_SIZE / 2)) {
          this.applyHitEffect(ball.playerIndex, 1 - ball.playerIndex, false);
          return false;
        }

        return true;
      });

      // Ball-to-ball collisions
      const survivingBalls = [];

      for (let i = 0; i < this.balls.length; i++) {
        const ballA = this.balls[i];
        let destroyed = false;

        for (let j = 0; j < this.balls.length; j++) {
          if (i === j) continue;
          const ballB = this.balls[j];

          // Only enemy balls can destroy each other
          if (ballA.playerIndex === ballB.playerIndex) continue;

          const dx = ballA.x - ballB.x;
          const dy = ballA.y - ballB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.BALL_SIZE) {
            destroyed = true;
            // Also remove ballB
            this.balls[j].visible = false;
            break;
          }
        }

        if (!destroyed && ballA.visible !== false) {
          survivingBalls.push(ballA);
        }
      }

      this.balls = survivingBalls.filter(ball => ball.visible !== false);
    },
    
    isPointCollidingWithBall(point, ball) {
      const dx = point.x - ball.x;
      const dy = point.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= this.BALL_SIZE * 1.5;
    },
    
    // Check collision with body or head
    isColliding(x, y, playerIndex, radius) {
      const player = this.players[playerIndex];
      const left = player.bodyLeft, bottom = player.bodyBottom;
      const bodyCollision = x >= left - radius && x <= left + this.SPRITE_WIDTH + radius && 
                          y >= bottom - radius && y <= bottom + this.SPRITE_HEIGHT + radius;
      return bodyCollision;
    },
    
    // Apply hit effect: death or stun
    applyHitEffect(attackerIndex, targetIndex, isUppercut) {
      const targetPlayer = this.players[targetIndex];
      // Uppercut ignores block
      if (isUppercut || !targetPlayer.isBlocking) {
        targetPlayer.isDead = true;
      } else {
        this.stunAttacker(attackerIndex);
      }
    },
    
    // Stun attacker after block
    stunAttacker(playerIndex) {
      const player = this.players[playerIndex];
      player.isStunned = true;
      player.stunTimer = this.STUN_DURATION;
      player.isAttacking = false;
      player.isUppercutting = false;
      player.isBlocking = false;
      player.isThrowing = false;
      player.movementDirection = 0;
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000010; /* Общий фон страницы */
  height: 100vh;
  margin: 0;
  padding: 0;
}

.game-screen {
  position: relative;
  width: 1000px;
  height: 600px;
  background-color: #050510;
  background-image:
    radial-gradient(circle at 25% 30%, #6a00ffcc, transparent 70%),
    radial-gradient(circle at 75% 70%, #00fffacc, transparent 60%),
    repeating-radial-gradient(circle at 50% 50%, #33006610 0 10px, transparent 10px 20px),
    repeating-linear-gradient(to right, rgba(255, 0, 255, 0.08) 0 2px, transparent 2px 12px),
    repeating-linear-gradient(to bottom, rgba(0, 255, 255, 0.07) 0 2px, transparent 2px 12px),
    linear-gradient(180deg, rgba(106, 0, 255, 0.2) 0%, transparent 80%),

    repeating-linear-gradient(
      45deg,
      rgba(255, 0, 255, 0.1),
      rgba(255, 0, 255, 0.1) 1px,
      transparent 1px,
      transparent 6px
    );

  background-blend-mode: screen;
  background-size: cover;
  border: 3px solid #6a00ff;
  box-shadow: 
    0 0 30px #8a2fffcc, 
    0 0 60px #00fffacc,
    inset 0 0 30px #6a00ff88;
  overflow: hidden;
}

.cyber-buildings {
  position: absolute;
  bottom: 35%;
  left: 0;
  width: 100%;
  height: 65%;
  background:
    linear-gradient(to right, transparent 8%, #2b0055cc 8%, #2b0055cc 17%, transparent 17%),
    linear-gradient(to right, transparent 83%, #3b0088cc 83%, #3b0088cc 92%, transparent 92%),
    linear-gradient(to right, transparent 44%, #250055cc 44%, #250055cc 56%, transparent 56%);
  box-shadow:
    0 0 10px #440088aa inset,
    0 0 25px #8800ffaa inset;
}

.cyber-buildings::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background:
    linear-gradient(45deg, transparent 48%, #00f0ffcc 48%, #00f0ffcc 52%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, #00f0ffcc 48%, #00f0ffcc 52%, transparent 52%),
    linear-gradient(45deg, transparent 83%, #ff33ccaa 83%, #ff33ccaa 87%, transparent 87%),
    linear-gradient(-45deg, transparent 83%, #ff33ccaa 83%, #ff33ccaa 87%, transparent 87%),
    linear-gradient(45deg, transparent 43%, #00ffaa99 43%, #00ffaa99 47%, transparent 47%),
    linear-gradient(-45deg, transparent 43%, #00ffaa99 43%, #00ffaa99 47%, transparent 47%);
  background-size: 45px 45px;
  opacity: 0.35;
  animation: windows-flicker 3s infinite alternate ease-in-out;
}

@keyframes windows-flicker {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.1; }
}

.cyber-road {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35%;
  background:
    linear-gradient(to bottom, #050510 0%, #0a0a1a 70%, #1a0044 100%),
    repeating-linear-gradient(to bottom,
      transparent 0 28px,
      #6a00ffcc 28px 30px),
    linear-gradient(to right,
      transparent 40%,
      rgba(106, 0, 255, 0.3) 40%,
      rgba(106, 0, 255, 0.3) 60%,
      transparent 60%);
  box-shadow: inset 0 5px 20px #8a2fffbb;
}

.cyber-road::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background:
    linear-gradient(
      135deg,
      transparent 0%,
      rgba(106, 0, 255, 0.12) 40%,
      transparent 100%
    );
  pointer-events: none;
}


.neon-signs {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 60px;
  pointer-events: none;
}

.neon-sign {
  position: absolute;
  color: #ff33cc;
  font-size: 2.2rem;
  font-weight: 900;
  text-shadow:
    0 0 8px #ff33ccaa,
    0 0 15px #ff33ccbb,
    0 0 25px #ff33ccdd,
    0 0 40px #ff33ccff;
  animation: neon-flicker 2.5s infinite alternate;
  transform: translateX(-50%);
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.05em;
}


@keyframes neon-flicker {
  0%, 18%, 22%, 55%, 70%, 100% {
    text-shadow:
      0 0 8px #ff33ccaa,
      0 0 15px #ff33ccbb,
      0 0 25px #ff33ccdd,
      0 0 40px #ff33ccff;
    opacity: 1;
  }
  20%, 54%, 68% {
    text-shadow: none;
    opacity: 0.6;
  }
}

.floor {
  display: none;
}

.character {
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform-origin: center bottom;
  z-index: 10;
}

.player1 {
  filter: hue-rotate(0deg);
}

.player2 {
  filter: hue-rotate(120deg);
}

.sword-point,
.ball {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, 50%);
  z-index: 30;
  box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.7);
}

.ball {
  width: 20px;
  height: 20px;
  z-index: 25;
  box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.7);
}
</style>