<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md">
      CONFIGURAÇÕES
    </div>
    <q-separator class="q-mb-xl bg-white opacity-3" style="height: 1px" />

    <!-- Card de Configurações -->
    <q-card class="settings-card q-pa-xl shadow-3">
      <div class="column q-gutter-y-lg">
        <!-- Opção: Alterar Tema -->
        <div class="row items-center justify-between">
          <div
            class="row items-center q-gutter-x-sm text-white text-subtitle1 text-weight-medium"
          >
            <q-icon name="colorize" size="sm" />
            <span>Alterar tema</span>
          </div>

          <div class="row items-center q-gutter-x-md">
            <q-radio v-model="tema" val="luz" label="Luz" dark color="white" />
            <q-radio
              v-model="tema"
              val="escuro"
              label="Escuro"
              dark
              color="white"
            />
          </div>
        </div>

        <q-separator class="bg-white opacity-2" style="height: 1px" />

        <!-- Opção: Alterar Idioma -->
        <div class="row items-center justify-between">
          <div
            class="row items-center q-gutter-x-sm text-white text-subtitle1 text-weight-medium"
          >
            <q-icon name="translate" size="sm" />
            <span>Alterar idioma</span>
          </div>

          <div class="row items-center q-gutter-x-md">
            <q-radio
              v-model="idioma"
              val="portugues"
              label="Português"
              dark
              color="white"
            />
            <q-radio
              v-model="idioma"
              val="ingles"
              label="Inglês"
              dark
              color="white"
            />
            <q-radio
              v-model="idioma"
              val="espanhol"
              label="Espanhol"
              dark
              color="white"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Valores iniciais selecionados com base no layout
const tema = ref("escuro");
const idioma = ref("portugues");
</script>

<style lang="scss" scoped>
.q-page {
  background-color: #c89f7a;
  font-family: "Poppins", sans-serif;
}

.settings-card {
  background-color: #6b302c;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  max-width: 900px;
  margin: 0 auto;
}

:deep(.q-radio__label) {
  color: #ffffff;
  font-size: 0.95rem;
}
</style>
