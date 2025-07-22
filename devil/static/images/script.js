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
    message = `Hello, ${userName}, welcome to my dark, world.`;
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
        voice.name.includes("Daniel") ||
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
  
