setTimeout(function() {
    const alertbox =document.querySelector(".alert");
    if (alertbox) {
        alertbox.style.display = 'none';

    }
},2000);
window.addEventListener("DOMContentLoaded", () => {
    const heading = document.getElementById("welcome-heading");
    const userName = heading?.dataset?.username || "stranger";
  
    const msg = new SpeechSynthesisUtterance("Welcome, " + userName + "You have crossed the line, The devil rides with you now.");
    msg.pitch = 0.3;       
    msg.rate = 0.65;      
    msg.volume = 2.0;      
    msg.lang = "en-US";  
    msg.voice = speechSynthesis.getVoices().find(
      voice =>
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
  