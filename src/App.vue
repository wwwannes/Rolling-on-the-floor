<template>
   <div class="container">
      <div id="app">
         <h1 id="quote-text">{{setup}}</h1>
         <h2 id="quote-person">{{punchline}}</h2>
         <button @click="tellJoke">{{buttonText}}</button>
      </div>
   </div>
</template>
<script>
   import axios from "axios";

   export default {
    name: 'App',
    data () {
      return {
        SYNTHESIS: window.speechSynthesis,
        VOICES: null,
        setup: '',
        punchline: '',
        voice: '',
        buttonText: "Tell me a joke"
      }
    },
    created: function(){
      // GET THE FEMALE UK VOICE
      this.VOICES = this.SYNTHESIS.getVoices()
              .map(function (voice) {
                return { voice: voice, name: voice.name, lang: voice.lang.toUpperCase() }
              });

      this.voice = this.VOICES[71];
    },
    watch:{
      setup: function(){
        // SPEAK
        let quoteUtterance = new SpeechSynthesisUtterance(this.setup);
        let personUtterance = new SpeechSynthesisUtterance(this.punchline);

        quoteUtterance.voice = this.voice.voice;
        personUtterance.voice = this.voice.voice;
        quoteUtterance.rate = personUtterance.rate = 0.85;
        //quoteUtterance.pitch = personUtterance.pitch = 1.1;

        this.SYNTHESIS.speak(quoteUtterance);
        this.SYNTHESIS.speak(personUtterance);

        this.buttonText = "Tell me another joke";
      }
    },
    methods:{
       tellJoke: function(){
         axios.get("http://localhost:3000/getJoke")
         .then((response => (
            this.setup = response.data.setup,
            this.punchline = response.data.punchline
           )
         ));
       }
     }
   }
</script>
<style lang="scss">
  .container{

    position: relative;
    width: 100vw;
    height: 100vh;

    #app{
      width: 100%;
      text-align: center;
      display: block;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
