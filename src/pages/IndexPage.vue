<template>
  <q-page class="flex flex-center relative-position container-init">
    <q-card class="welcome-card q-pa-lg text-center shadow-10">
      <q-card-section>
        <div class="text-h4 text-weight-bold text-primary q-mb-md">
          Bem-vindo a BIBLIOTECH
        </div>
        <div class="text-h7 q-mb-md">
          O seu sistema moderno de gerenciamento de biblioteca.
        </div>
      </q-card-section>

      <q-card-actions align="center" class="btn-explorer">
        <q-btn color="primary" label="Explorar" to="/dashboard" unelevated />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped>
.container-init {
  background-image: url("../assets/image-bibliotech.png");
  background-size: cover;
  background-position: center;
}

.welcome-card {
  background: rgba(177, 125, 125, 0.9);
  backdrop-filter: blur(7px);
  border-radius: 20px;
  width: 45%;
  height: 270px;
}
.btn-explorer {
  transform: translate(0, 10%);
}
.text-2 {
  color: black;
}
</style>
