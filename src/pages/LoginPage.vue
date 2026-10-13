<template>
  <div class="login-page">
    <img
      src="../assets/image-bibliotech.png"
      class="background-image"
      alt="background"
    />
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs
      }"
      class="login-container"
    >
      <q-card class="login-input">
        <q-card-section>
          <h4 class="login-title">LOGIN</h4>
        </q-card-section>

        <q-card-section>
          <q-form class="label-inputs" @submit.prevent="submitForm">
            <q-input
              v-model="login.email"
              label="E-mail :"
              type="email"
              class="input-email"
            >
            </q-input>
            <q-input
              v-model="login.password"
              label="Password :"
              type="password"
              class="input-password"
            >
            </q-input>
            <q-card-section>
              <q-btn
                class="full-width"
                label="ENTRAR"
                rounded
                type="submit"
                alt="button-login"
              ></q-btn>
            </q-card-section>
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-checkbox
            v-model="rememberMe"
            label="Lembrar-se"
            class="checkbox-remember"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-center">
            <a href="#" class="link-register"> Registrar-se </a>
            <a
              href="#"
              class="link-forgotpassword"
              @click.prevent="enterforgotpassword"
            >
              Esqueceu a senha?
            </a>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();

const rememberMe = ref(false);

const login = ref({
  email: "",
  password: ""
});
function enter() {
  if (rememberMe.value) {
    console.log("Permanecer conectado");
  } else {
    console.log("Não permanecer conectado");
  }
}

onMounted(() => {
  console.log("Página de login carregada");
});

function submitForm() {
  if (!login.value.email.trim() || !login.value.password) {
    $q.notify({
      type: "negative",
      message: "Preencha todos os campos!",
      position: "top",
      timeout: 3000
    });
    return;
  }

  if (!/^[^\s@]+@gmail\.com$/i.test(login.value.email.trim())) {
    $q.notify({
      type: "negative",
      message: "O e-mail deve conter ao final @gmail.com!",
      position: "top",
      timeout: 3000
    });
    return;
  }

  if (login.value.password.length < 8) {
    $q.notify({
      type: "negative",
      message: "A senha deve ter no mínimo 8 caracteres!",
      position: "top",
      timeout: 3000
    });
    return;
  }

  $q.notify({
    type: "positive",
    message: "Informações corretas!",
    position: "top",
    timeout: 3000
  });
  console.log("E-mail:", login.value.email);

  enter();
}

const router = useRouter();

function enterforgotpassword() {
  router.push("/forgotpassword");
}
</script>

<style scoped>
.login-page {
  height: 70rem;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login-container {
  position: fixed;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 450px;
  padding: 15px;
  background: rgb(66, 15, 15);
  border-radius: 15px;
  box-shadow: 0 40px 50px black;
}
.login-title {
  margin: 2rem;
  transform: translate(35%, -40%);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.login-input {
  background-color: rgb(107, 48, 44);
  color: rgb(252, 249, 249);
}
.label-inputs {
  transform: translate(0, -0%);
}
.input-email {
  transform: translate(0, -60%);
}
.full-width {
  transform: translate(0, 70%);
  background-color: rgb(121, 68, 68);
}

.link-register {
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-decoration: underline;
  margin: 30px;
}
.link-forgotpassword {
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-decoration: underline;
  transform: translate(0, -110%);
  margin: 30px;
}
.checkbox-remember {
  transform: translate(0, -10%);
}
</style>
