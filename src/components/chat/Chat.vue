<template>
    <div :class="['chat-container', { minimized: isMinimized }]">
      <div class="chat-header" @click="toggleMinimize">
        <h3>Чат</h3>
        <button class="toggle-btn" @click.stop="toggleMinimize">
          {{ isMinimized ? '▲' : '▼' }}
        </button>
      </div>
  
      <transition name="slide-fade">
        <div v-if="!isMinimized" class="chat-body">
          <div class="chat-messages" ref="messagesContainer">
            <div v-for="(msg, index) in messages" :key="index" class="message">
              <div class="username">{{ msg.user }}</div>
              <div class="text">{{ msg.text }}</div>
            </div>
          </div>
          <div class="chat-input">
            <input
              type="text"
              placeholder="Введите сообщение..."
              v-model="input"
              @keyup.enter="sendMessage"
            />
            <button @click="sendMessage">➤</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        input: '',
        messages: [],
        history: [],
        isMinimized: true,
      };
    },
    methods: {
      toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.$nextTick(() => {
          if (!this.isMinimized) {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
          }
        });
      },
  
      async sendMessage() {
        if (!this.input.trim()) return;
  
        const userMessage = this.input.trim();
        this.messages.push({ user: 'Вы', text: userMessage });
        this.history.push({ role: 'user', parts: [{ text: userMessage }] });
        this.input = '';
  
        // Показать индикатор "Печатает..."
        this.messages.push({ user: 'Ассистент', text: 'Печатает...' });
        const typingIndex = this.messages.length - 1;
  
        try {
          const response = await fetch('https://api.ramil.shop/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
          });
  
          const data = await response.json();
          console.log('Ответ от сервера:', data);
  
          if (data.reply) {
            this.$set(this.messages, typingIndex, {
              user: 'Ассистент',
              text: data.reply,
            });
  
            this.history.push({ role: 'model', parts: [{ text: data.reply }] });
          } else {
            this.$set(this.messages, typingIndex, {
              user: 'Ассистент',
              text: 'Ошибка: ответ от сервера отсутствует.',
            });
          }
  
          this.$nextTick(() => {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
          });
        } catch (error) {
          console.error('Ошибка обращения к backend API:', error);
          this.$set(this.messages, typingIndex, {
            user: 'Ассистент',
            text: 'Произошла ошибка при обращении к серверу.',
          });
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  .chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 320px;
    max-height: 500px;
    background-color: #121212;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 8888;
    font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
  }
  
  .chat-container.minimized {
    height: 40px;
    max-height: none;
    cursor: pointer;
  }
  
  .chat-header {
    padding: 10px 15px;
    background-color: #1b1b1b;
    border-bottom: 1px solid #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }
  
  .chat-header h3 {
    margin: 0;
    font-size: 16px;
    color: #eee;
  }
  
  .toggle-btn {
    background: transparent;
    border: none;
    color: #eee;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    user-select: none;
  }
  
  .chat-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #181818;
    max-height: 460px;
  }
  
  .chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .message {
    background-color: #282828;
    padding: 10px 15px;
    border-radius: 6px;
    max-width: 80%;
    word-break: break-word;
  }
  
  .username {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
  }
  
  .text {
    font-size: 14px;
  }
  
  .chat-input {
    display: flex;
    padding: 10px 15px;
    background-color: #1b1b1b;
    border-top: 1px solid #333;
  }
  
  .chat-input input {
    flex: 1;
    background-color: #222;
    border: none;
    color: #eee;
    padding: 10px 12px;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
  }
  
  .chat-input input::placeholder {
    color: #777;
  }
  
  .chat-input button {
    margin-left: 10px;
    background-color: #444;
    color: #eee;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }
  
  .chat-input button:hover {
    background-color: #666;
  }
  
  /* Анимация появления и скрытия */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>
  