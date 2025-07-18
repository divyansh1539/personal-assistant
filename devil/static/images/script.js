setTimeout(function() {
    const alertbox =document.querySelector(".alert");
    if (alertbox) {
        alertbox.style.display = 'none';

    }
},2000);
<<<<<<< HEAD


window.addEventListener('DOMContentLoaded', () => {
    const userName = "{{ honey }}";
  
    function speakWelcomeMessage() {
      const msg = new SpeechSynthesisUtterance("Welcome , " + userName);
      msg.pitch = 0.4; // Deep voice
      msg.rate = 0.85;  // Slow
  
      // Get all available voices
      const voices = speechSynthesis.getVoices();
  
      // Try to pick a deep male-like voice
      msg.voice = voices.find(voice =>
        voice.name.includes("Daniel") ||
        voice.name.includes("Fred") ||
        voice.name.includes("Alex") ||
        voice.name.includes("Google") ||
        voice.name.includes("Microsoft")
      ) || voices[0]; // fallback to first voice if none match
  
      speechSynthesis.speak(msg);
    }
  
    // Make sure voices are loaded before speaking
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', speakWelcomeMessage);
    } else {
      speakWelcomeMessage();
    }
  });
=======
window.addEventListener("DOMContentLoaded", () => {
    const heading = document.getElementById("welcome-heading");
    const userName = heading?.dataset?.username || "stranger";
  
    const msg = new SpeechSynthesisUtterance("Welcome, " + userName + ". You’ve crossed the line... The devil rides with you now.");
    msg.pitch = 0.4;       
    msg.rate = 0.65;      
    msg.volume = 1.0;      
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
  
    // Wait for voices if not yet loaded
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener("voiceschanged", () => {
        speechSynthesis.speak(msg);
      });
    } else {
      speechSynthesis.speak(msg);
    }
  });
  
>>>>>>> 777087800edf2b055fc6848a3299f5c0bca31879
