setTimeout(function() {
    const alertbox =document.querySelector(".alert");
    if (alertbox) {
        alertbox.style.display = 'none';

    }
},2000);


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