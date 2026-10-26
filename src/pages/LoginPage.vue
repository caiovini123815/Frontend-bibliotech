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
              dark
            >
            </q-input>
            <q-input
              v-model="login.password"
              label="Password :"
              :type="showPassword ? 'text' : 'password'"
              class="input-password"
              dark
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
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
            dark
          />
        </q-card-section>

        <q-card-section>
          <div class="text-center">
            <a href="#" class="link-register" @click.prevent="enterregister">
              Cadastrar-se
            </a>
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
import { api } from "@/boot/axios";

const $q = useQuasar();
const router = useRouter();

const rememberMe = ref(false);
const showPassword = ref(false);

const login = ref({
  email: "",
  password: ""
});

onMounted(() => {
  console.log("Página de login carregada");
});

async function submitForm() {
  if (!login.value.email.trim() || !login.value.password) {
    $q.notify({
      type: "negative",
      message: "Preencha todos os campos!",
      position: "top",
      timeout: 3000
    });
    return;
  }

  const email = login.value.email.trim().toLowerCase();

  if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
    $q.notify({
      type: "negative",
      message: "O e-mail deve terminar com @gmail.com!",
      position: "top",
      timeout: 3000
    });
    return;
  }

  if (login.value.password.length < 6) {
    $q.notify({
      type: "negative",
      message: "A senha deve ter no mínimo 6 caracteres!",
      position: "top",
      timeout: 3000
    });
    return;
  }

  try {
    // A rota do backend é POST /login
    const response = await api.post("/login", {
      email,
      password: login.value.password
    });

    console.log("Resposta do login:", response.data);

    const token = response.data.token;

    if (
      typeof token !== "string" ||
      !token.trim() ||
      token === "token-jwt-super-secreto-123456" ||
      token.split(".").length !== 3
    ) {
      console.error("O backend não retornou um JWT válido.", response.data);

      $q.notify({
        type: "negative",
        message:
          "O login não retornou um JWT válido. Verifique a resposta do backend.",
        position: "top",
        timeout: 4000
      });
      return;
    }

    // Salva o JWT real retornado pelo backend
    localStorage.setItem("token", token);

    console.log("JWT real salvo:", localStorage.getItem("token") === token);

    await router.push("/index");

    if (router.currentRoute.value.fullPath !== "/index") {
      console.error(
        "A navegação não chegou a /index:",
        router.currentRoute.value.fullPath
      );

      $q.notify({
        type: "warning",
        message:
          "Login realizado, mas a navegação foi redirecionada. Confira o Console.",
        position: "top",
        timeout: 4000
      });
      return;
    }

    $q.notify({
      type: "positive",
      message: "Login realizado com sucesso!",
      position: "top",
      timeout: 3000
    });
  } catch (error: any) {
    console.error(
      "Erro no login ou na navegação:",
      error.response?.data || error
    );

    $q.notify({
      type: "negative",
      message:
        error.response?.data?.message || "Não foi possível concluir o login.",
      position: "top",
      timeout: 3000
    });
  }
}

function enterforgotpassword() {
  router.push("/forgotpassword");
}

function enterregister() {
  router.push("/register");
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
  background: #420f0f;
  border-radius: 15px;
  box-shadow: 0 40px 50px black;
}
.login-title {
  margin: 2rem;
  transform: translate(35%, -40%);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.login-input {
  background-color: #6b302c;
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
