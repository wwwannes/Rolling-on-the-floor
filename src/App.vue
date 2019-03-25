<template>
   <div class="container">
      <div id="app">
         <h1 id="quote-setup">{{setup}}</h1>
         <h1 id="quote-punchline">{{punchline}}</h1>
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
        quoteUtterance: "",
        personUtterance: "",
        setup: '',
        punchline: '',
        voice: '',
        buttonText: "Tell me a joke"
      }
    },
    methods:{
       tellJoke: function(){

         $("#quote-setup, #quote-punchline, button").fadeOut(function(){
           this.setup = "";
           this.punchline = "";
         });

         // GET THE FEMALE UK VOICE
         this.VOICES = this.SYNTHESIS.getVoices()
              .map(function (voice) {
                 $("button").fadeIn("slow");
                 return { voice: voice, name: voice.name, lang: voice.lang.toUpperCase() }
          });
         this.voice = this.VOICES[71];

         axios.get("http://localhost:3000/getJoke")
         .then((response => (
            this.setup = response.data.setup,
            this.punchline = response.data.punchline,
            this.quoteUtterance = new SpeechSynthesisUtterance(this.setup),
            this.personUtterance = new SpeechSynthesisUtterance(this.punchline),
            this.quoteUtterance.voice = this.voice.voice,
            this.personUtterance.voice = this.voice.voice,
            this.quoteUtterance.rate = this.personUtterance.rate = 0.85,
            //quoteUtterance.pitch = personUtterance.pitch = 1.1,
            this.SYNTHESIS.speak(this.quoteUtterance),
            this.SYNTHESIS.speak(this.personUtterance),
            this.buttonText = "Tell me another joke",
            this.quoteUtterance.onstart = function(){
              $("#quote-setup").fadeIn(750);
            },
            this.personUtterance.onstart = function(){
              $("#quote-punchline").fadeIn(750);
            },
            this.personUtterance.onend = function(){
              $("button").fadeIn(1000);
            }
           )
         ));
       }
     }
   }
</script>
<style lang="scss">

  *{
    margin: 0;
    padding: 0;
  }

  body{
    background: yellow;
    color: black;
    font-family: "Helvetica", sans-serif;
  }

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

      #quote-setup,
      #quote-punchline{
        text-transform: uppercase;
        margin: 0;
        font-weight: bold;
        display: none;
      }

      #quote-punchline{
        margin: 7px;
      }

      button{
        background: black;
        color: white;
        border-radius: 0;
        border: 1px solid black;
        padding: 7px 10px;
        margin-top: 25px;
        text-transform: uppercase;

        &:hover{
          background: yellow;
          color: black;
          cursor: pointer;
        }
      }
    }
  }
</style>
