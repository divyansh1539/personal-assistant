setTimeout(function() {
    const alertbox =document.querySelector(".alert");
    if (alertbox) {
        alertbox.style.display = 'none';

    }
},2000);




window.addEventListener("DOMContentLoaded", () => {

  const heading = document.getElementById("welcome-heading");
  const userName = heading?.dataset?.username || "stranger";
  const path = window.location.pathname.toLowerCase();

  let message = "";

  if (path.includes("register")) {
    message = "Welcome, stranger.";
  } else if (path.includes("login") && !userName || userName === "stranger") {
    message = "Stranger, are you ready to reveal your identity?";
  } else {
    message = `Hello, ${userName}, welcome to my dark world.`;
  }

  const msg = new SpeechSynthesisUtterance(message);
  msg.pitch = 0.1;
  msg.rate = 0.65;
  msg.volume = 2.0;
  msg.lang = "en-US";

  msg.voice = speechSynthesis.getVoices().find(
    voice =>

        voice.name.includes("Google UK English Male") ||
        voice.name.includes("Microsoft David") ||
        voice.name.includes("Fred") || 
        voice.name.includes("Alex") ||
        voice.name.includes("Google")


    );
    
  
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener("voiceschanged", () => {
        speechSynthesis.speak(msg);
      });
    } else {
      speechSynthesis.speak(msg);
    }
  });

  const logo = document.getElementById('devilLogo');
    const sound = document.getElementById('devilSound');

    if (logo && sound) {
        logo.addEventListener('mouseenter', () => {
            sound.currentTime = 0;
            sound.play().catch(err => {
                console.log("Audio play failed:", err);
            });
        });

        logo.addEventListener('mouseleave', () => {
            sound.pause();
            sound.currentTime = 0;
        });
    } else {
        console.log("Logo or Sound element not found.");
    }



document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("user-input");
  const sendBtn = document.getElementById("killer-send-button");
  const micBtn = document.querySelector(".chat-input-area img");
  const welcomeHeading = document.getElementById("welcome-heading");

  inputBox.addEventListener("input", () => {
  inputBox.style.height = "auto";
  inputBox.style.height = inputBox.scrollHeight + "px";

  // Hide scrollbar if empty
  if (!inputBox.value.trim()) {
    inputBox.style.overflowY = "hidden";
  } else {
    inputBox.style.overflowY = "auto";
  }
});




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
    msg.pitch = 0.3;
    msg.rate = 0.65;
    msg.volume = 1;
    const voices = speechSynthesis.getVoices();
    msg.voice = voices.find(v => v.name.includes("Google") || v.name.includes("Microsoft")) || voices[0];
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    if (voices.length === 0) {
      speechSynthesis.addEventListener("voiceschanged", () => speechSynthesis.speak(msg));
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

    setTimeout(() => {
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 100);
  }

  function handleCommand(command, spoken = false) {
  const q = command.toLowerCase().trim();
  if (!q) return;
  removeWelcome();
  createBubble(command, "user");

  const speakOnly = (msg) => {
    createBubble(msg, "bot");
    if (spoken) speak(msg);
  };

  const speakAlways = (msg) => {
    createBubble(msg, "bot");
    speak(msg);
  };

  if (q.includes("open youtube")) {
    speakAlways("Opening YouTube...");
    setTimeout(() => window.open("https://www.youtube.com", "_blank"), 1000);
  } else if (q.includes("open google")) {
    speakAlways("Heading to Google...");
    setTimeout(() => window.open("https://www.google.com", "_blank"), 1000);
  } else if (q.includes("open github")) {
    speakAlways("Unleashing the code... GitHub awaits.");
    setTimeout(() => window.open("https://github.com", "_blank"), 1000);
  } else if (q.includes("open stackoverflow")) {
    speakAlways("Summoning Stack Overflow...");
    setTimeout(() => window.open("https://stackoverflow.com", "_blank"), 1000);
  } else if (q.includes("open instagram")) {
    speakAlways("Opening Instagram...");
    setTimeout(() => window.open("https://www.instagram.com", "_blank"), 1000);
  } else if (q.includes("open linkedin")) {
    speakAlways("Opening LinkedIn...");
    setTimeout(() => window.open("https://www.linkedin.com", "_blank"), 1000);
  } else if (q.includes("open netflix")) {
    speakAlways("Entering the dark realm of Netflix...");
    setTimeout(() => window.open("https://www.netflix.com", "_blank"), 1000);
  } else if (q.includes("open twitter")) {
    speakAlways("Flying over to Twitter...");
    setTimeout(() => window.open("https://twitter.com", "_blank"), 1000);

  } else if (q.includes("your name") || q.includes("who are you")) {
    speakOnly("I'm the devil's assistant, a voice from the abyss.");

  } else if (q.includes("time") || q.includes("live time")) {
    const time = new Date().toLocaleTimeString();
    speakOnly(`The dark hour is ${time}`);

  } else if (q.includes("weather")) {
    const weatherMsg = "Weather feature coming soon...";
    speakOnly(weatherMsg);
    console.log("Trigger weather UI/API here");

  } else if (q.includes("joke") || q.includes("funny")) {
    const jokes = [
      "Why don't demons eat fast food? They prefer soul food.",
      "Why did the ghost get promoted? He was super natural.",
      "Even the shadows fear my jokes.",
      "Why did the skeleton run? He had no body to stop him."
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    speakOnly(joke);

  } else {
    speakOnly("That is unknown to even the shadows.");
  }
}


  inputBox.addEventListener("keydown", (e) => {
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

  recognition.onresult = (event) => {
    micPopup.style.display = "none";
    const transcript = event.results[0][0].transcript;
    handleCommand(transcript, true);
  };

  recognition.onend = () => micPopup.style.display = "none";
});
