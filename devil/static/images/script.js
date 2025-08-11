setTimeout(() => {
  const alertbox = document.querySelector(".alert");
  if (alertbox) alertbox.style.display = 'none';
}, 2000);

window.addEventListener("DOMContentLoaded", () => {
  const heading = document.getElementById("welcome-heading");
  const userName = heading?.dataset?.username || "stranger";
  const path = window.location.pathname.toLowerCase();
  const sound = document.getElementById('devilSound');
  let message = "";

  speechSynthesis.cancel();

  if (path.includes("logout")) sessionStorage.removeItem("hasVisited");

  if (path.includes("register")) {
    message = "Welcome, stranger.";
    speakNow(message);
  } else if ((path.includes("login") && !userName) || userName === "stranger") {
    message = "Stranger, are you ready to reveal your identity?";
    speakNow(message);
  } else {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      message = `Hello, ${userName}, welcome to my dark world.`;
      speakNow(message);
    } else {
      sessionStorage.setItem("hasVisited", "true");
      if (sound) {
        sound.currentTime = 0;
        sound.play().then(() => {
          sound.addEventListener("ended", () => {
            speakNow(`Hello, ${userName}, welcome to my dark world.`);
          });
        }).catch(() => {
          setTimeout(() => speakNow(`Hello, ${userName}, welcome to my dark world.`), 2000);
        });
      } else {
        setTimeout(() => speakNow(`Hello, ${userName}, welcome to my dark world.`), 2000);
      }
    }
  }

  function speakNow(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 0.1;
    msg.rate = 0.65;
    msg.volume = 1.0;
    msg.lang = "en-US";

    const setVoice = () => {
      msg.voice = speechSynthesis.getVoices().find(
        v => v.name.includes("Google UK English Male") ||
             v.name.includes("Microsoft David") ||
             v.name.includes("Alex") ||
             v.name.includes("Fred") ||
             v.name.includes("Google")
      );
      speechSynthesis.speak(msg);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener("voiceschanged", setVoice);
    } else {
      setVoice();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("user-input");
    const sendBtn = document.getElementById("killer-send-button");
    const micBtn = document.querySelector(".chat-input-area img");
    const welcomeHeading = document.getElementById("welcome-heading");

    let chatArea = document.getElementById("chat-area");
    if (!chatArea) {
      chatArea = document.createElement("div");
      chatArea.id = "chat-area";
      document.body.appendChild(chatArea);
      chatArea.style.cssText = `
        position: absolute;
        top: 110px;
        bottom: 100px;
        width: 90%;
        max-width: 1300px;
        margin: auto;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        scrollbar-width: thin;
        scrollbar-color: crimson #1a0000;
      `;
    }

    const micPopup = document.createElement("div");
    micPopup.id = "mic-popup";
    micPopup.textContent = "🎙️ Speak now...";
    document.body.appendChild(micPopup);
    micPopup.style.cssText = `
      display: none;
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 15px 25px;
      border-radius: 10px;
      font-size: 18px;
      font-family: monospace;
      border: 2px solid crimson;
      z-index: 9999;
    `;

    function removeWelcome() {
      if (welcomeHeading) welcomeHeading.style.display = "none";
    }

    function speak(text) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = "en-US";
      msg.pitch = 0.1;
      msg.rate = 0.65;
      msg.volume = 2;
      const voices = speechSynthesis.getVoices();
      msg.voice = voices.find(v => v.name.includes("Alex") || v.name.includes("Google") || v.name.includes("Microsoft")) 
               || voices.find(v => v.lang.startsWith("en")) 
               || voices[0];
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        setTimeout(() => speechSynthesis.speak(msg), 100);
      } else {
        speechSynthesis.speak(msg);
      }
    }

    function createBubble(text, sender) {
      const bubble = document.createElement("div");
      bubble.className = `bubble ${sender}`;
      chatArea.appendChild(bubble);
      if (sender === "bot") {
        bubble.innerHTML = `
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="color: #a71818ff; font-size: 22px;">✦</span>
            <div style="background: #111; padding: 12px 18px; border-radius: 15px; color: white; font-family: 'Orbitron', sans-serif; font-size: 15px; white-space: pre-line;">
              ${text}
            </div>
          </div>`;
      } else {
        bubble.textContent = text;
        bubble.style.cssText = `
          background: #222;
          color: white;
          margin: 10px 0;
          padding: 12px 18px;
          border-radius: 15px;
          max-width: 80%;
          align-self: flex-end;
          white-space: pre-line;
          font-family: 'Orbitron', sans-serif;
          font-size: 15px;
        `;
      }
      setTimeout(() => chatArea.scrollTop = chatArea.scrollHeight, 100);
    }

    function normalizeCommand(command) {
      return command.toLowerCase().trim().replace(/[^\w\s]/gi, "");
    }

    const websiteCommands = {
      youtube: "https://www.youtube.com",
      google: "https://www.google.com",
      github: "https://github.com",
      linkedin: "https://www.linkedin.com",
      instagram: "https://www.instagram.com",
      twitter: "https://twitter.com",
      telegram: "https://web.telegram.org/k/",
      netflix: "https://www.netflix.com",
      stackoverflow: "https://stackoverflow.com",
      amazon: "https://www.amazon.in",
      flipkart: "https://www.flipkart.com",
      myntra: "https://www.myntra.com",
      ajio: "https://www.ajio.com",
      gmail: "https://mail.google.com",
      outlook: "https://outlook.live.com",
      yahoo: "https://mail.yahoo.com",
      facebook: "https://www.facebook.com",
      quora: "https://www.quora.com",
      zomato: "https://www.zomato.com",
      swiggy: "https://www.swiggy.com",
      ola: "https://www.olacabs.com",
      uber: "https://www.uber.com",
      hotstar: "https://www.hotstar.com",
      primevideo: "https://www.primevideo.com",
      spotify: "https://open.spotify.com",
      canva: "https://www.canva.com",
      notion: "https://www.notion.so",
      coursera: "https://www.coursera.org",
      udemy: "https://www.udemy.com",
      edx: "https://www.edx.org",
      khanacademy: "https://www.khanacademy.org",
      w3schools: "https://www.w3schools.com",
      hackerrank: "https://www.hackerrank.com",
      leetcode: "https://leetcode.com",
      geeksforgeeks: "https://www.geeksforgeeks.org"
    };

    function handleCommand(command, spoken = false) {
      const q = normalizeCommand(command);
      if (!q) return;
      removeWelcome();
      createBubble(command, "user");

      const match = (text, keywords) => keywords.some(kw => text.includes(kw));

      for (const key in websiteCommands) {
        if (q.includes(key)) {
          speakIf(true, `Opening ${key.charAt(0).toUpperCase() + key.slice(1)}...`);
          setTimeout(() => window.open(websiteCommands[key], "_blank"), 1000);
          return;
        }
      }

      if (match(q, ["who am i", "whats my name"])) {
        speakIf(spoken, `You are ${userName}, the one who dared summon me.`);
      } else if (match(q, ["bye", "goodbye"])) {
        speakIf(spoken, "Until we meet again in the shadows...");
      } else if (match(q, ["intro", "introduce yourself", "who are you"])) {
        speakIf(spoken, "I am the Devil's Assistant, born of silence and shadow, crafted to obey and haunt the digital void.");
      } else if (q.includes("time")) {
        speakIf(spoken, `The dark hour is ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`);
      } else {
        fetch("/gemini-api/", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-CSRFToken": getCookie("csrftoken")
          },
          body: `message=${encodeURIComponent(q)}`
        })
        .then(res => res.json())
        .then(data => {
          const reply = data.response;
          createBubble(reply, "bot");
          if (spoken) speak(reply);
        });
      }
    }

    function speakIf(spoken, msg) {
      createBubble(msg, "bot");
      if (spoken) speak(msg);
    }

    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          cookie = cookie.trim();
          if (cookie.startsWith(name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }

    inputBox.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const userText = inputBox.value.trim();
        handleCommand(userText, false);
        inputBox.value = "";
        inputBox.style.height = "auto";
      }
    });

    sendBtn.addEventListener("click", () => {
      const userText = inputBox.value.trim();
      handleCommand(userText, false);
      inputBox.value = "";
      inputBox.style.height = "auto";
    });

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    if (micBtn) {
      micBtn.addEventListener("click", () => {
        micPopup.style.display = "block";
        recognition.start();
      });
    }

    recognition.onresult = event => {
      micPopup.style.display = "none";
      const transcript = event.results[0][0].transcript;
      handleCommand(transcript, true);
    };

    recognition.onend = () => micPopup.style.display = "none";
  });
});
