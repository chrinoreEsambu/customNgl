<template>
  <div>
    <textarea
      v-model="content"
      placeholder="Écris ton message ici..."
    ></textarea>
    <button @click="sendMessage">Envoyer</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const content = ref("");

const sendMessage = async () => {
  try {
    const getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          (err) => {
            console.warn("Localisation refusée");
            resolve({ latitude: null, longitude: null }); // continue sans bloquer
          }
        );
      });
    };

    const position = await getPosition();

    const payload = {
      content: content.value,
      browser: navigator.userAgent,
      os: navigator.platform,
      device: navigator.userAgentData?.mobile ? "Mobile" : "Desktop",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      latitude: position.latitude,
      longitude: position.longitude,
    };

    await axios.post("http://localhost:7000/api/sendmessage", payload);
    alert("Message envoyé !");
    content.value = "";
  } catch (error) {
    console.error("Erreur d'envoi :", error);
  }
};
</script>
