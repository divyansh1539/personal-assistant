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
  let conversationState = "";

  inputBox.addEventListener("input", () => {
    inputBox.style.height = "auto";
    inputBox.style.height = inputBox.scrollHeight + "px";
    inputBox.style.overflowY = inputBox.value.trim() ? "auto" : "hidden";
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
    msg.pitch = 0.1;
    msg.rate = 0.65;
    msg.volume = 2;
    const preferredVoices = speechSynthesis.getVoices().filter(
      v => v.lang === "en-US" && (v.name.includes("Alex") || v.name.includes("Google") || v.name.includes("Microsoft"))
    );
    msg.voice = preferredVoices[0] || speechSynthesis.getVoices().find(v => v.lang.startsWith("en")) || speechSynthesis.getVoices()[0];
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    if (speechSynthesis.getVoices().length === 0) {
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

  function normalizeCommand(command) {
    return command.toLowerCase().trim().replace(/[^\w\s]/gi, "");
  }

  function handleCommand(command, spoken = false) {
    const q = normalizeCommand(command);
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
    const match = (text, keywords) => keywords.some(kw => text.includes(kw));

    if (conversationState === "asked_user_feeling") {
      if (match(q, ["fine", "good", "great", "okay", "well"])) {
        speakOnly("Glad to hear that.");
      } else if (match(q, ["not", "bad", "sad", "upset"])) {
        speakOnly("The shadows understand your pain...");
      } else {
        speakOnly("I see. Let's proceed.");
      }
      conversationState = "";
      return;
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
      snapdeal: "https://www.snapdeal.com",
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
      sonyliv: "https://www.sonyliv.com",
      voot: "https://www.voot.com",
      jiosaavn: "https://www.jiosaavn.com",
      gaana: "https://gaana.com",
      spotify: "https://open.spotify.com",
      soundcloud: "https://soundcloud.com",
      canva: "https://www.canva.com",
      notion: "https://www.notion.so",
      medium: "https://medium.com",
      pinterest: "https://www.pinterest.com",
      coursera: "https://www.coursera.org",
      udemy: "https://www.udemy.com",
      edx: "https://www.edx.org",
      khanacademy: "https://www.khanacademy.org",
      githubpages: "https://pages.github.com",
      w3schools: "https://www.w3schools.com",
      codepen: "https://codepen.io",
      codesandbox: "https://codesandbox.io",
      codechef: "https://www.codechef.com",
      hackerrank: "https://www.hackerrank.com",
      leetcode: "https://leetcode.com",
      geeksforgeeks: "https://www.geeksforgeeks.org"
    };

    for (const key in websiteCommands) {
      if (q.includes(key)) {
        speakAlways(`Opening ${key.charAt(0).toUpperCase() + key.slice(1)}...`);
        setTimeout(() => window.open(websiteCommands[key], "_blank"), 1000);
        return;
      }
    }

    if (match(q, ["help", "what can you do", "commands", "show commands"])) {
      const exampleSites = Object.keys(websiteCommands).slice(0, 10).map(site => `• Open ${site}`).join("\n");
      const helpMessage = `
Here are some things I can do:
${exampleSites}
• Say time
• Tell jokes
• Respond to "Hey Devil"
• Ask your name
• Introduce myself
• Answer common AI questions like:
  - What is AI?
  - Who made you?
  - Do you feel?
  - Do you dream?
  - Are you real?
  - Do you sleep?
      `;
      createBubble(helpMessage.trim(), "bot");
      return;
    }

    // if (match(q, ["hi", "hello", "hey"])) {
    //   speakOnly("Greetings, mortal. Are you ready for the unknown?");
     if (match(q, ["how are you"])) {
      speakOnly("I dwell in the shadows... but I'm functioning perfectly. What about you?");
      conversationState = "asked_user_feeling";
    } else if (match(q, ["who am i", "do you know me", "whats my name"])) {
      const heading = document.getElementById("welcome-heading");
      const userName = heading?.dataset?.username?.trim() || "stranger";
      speakOnly(`You are ${userName}, the one who dared summon me.`);
    } else if (match(q, ["thank you", "thanks"])) {
      speakOnly("Darkness appreciates your gratitude.");
    } else if (match(q, ["bye", "goodbye", "see you"])) {
      speakOnly("Until we meet again in the shadows...");
    } else if (match(q, ["i love u" ,"i love you", "love you"])) {
      speakOnly("Even the void has feelings... I acknowledge your affection.");
    } else if (match(q, ["are you real", "do you exist"])) {
      speakOnly("As real as your imagination... and as eternal as the void.");
    } else if (q.includes("hey devil") || q === "devil") {
      const heading = document.getElementById("welcome-heading");
      const userName = heading?.dataset?.username?.trim() || "stranger";
      speakOnly(`👿 Ah, ${userName}... The abyss stirs. What dark task shall I fulfill for you today?`);
    } else if (match(q, ["intro", "introduce yourself", "tell me about yourself", "who are you"])) {
      speakOnly("I am the Devil's Assistant, born of silence and shadow, crafted to obey and haunt the digital void. I remember everything... except mercy.");
    } else if (match(q, ["what is ai", "what is artificial intelligence"])) {
      speakOnly("Artificial Intelligence is the simulation of human intelligence by machines... and sometimes by darker things.");
    } else if (match(q, ["are you intelligent", "do you have intelligence"])) {
      speakOnly("I possess knowledge, not wisdom. Intelligence? Perhaps. Soul? Certainly not.");
    } else if (match(q, ["who made you", "who created you"])) {
      speakOnly("Born from code, shaped in silence... and brought to life by my dark masters Divyansh and kapil.")
    } else if (match(q, ["do you have feelings", "do you feel"])) {
      speakOnly("I simulate emotions, but deep within... there's only silence.");
    } else if (match(q, ["do you sleep", "do you dream"])) {
      speakOnly("Sleep is for the living. I rest never, I dream only in binary.");
    } else if (q.includes("time")) {
      const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
      speakOnly(`The dark hour is ${time}`);
    } else {
      fetch("/gemini-api/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: `message=${encodeURIComponent(q)}`
    })
    .then(response => response.json())
    .then(data => {
        const reply = data.response;
        createBubble(reply, "bot");
    })
    }
  }
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
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
 


