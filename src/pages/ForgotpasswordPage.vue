<template>
  <div class="forgotpassword-page">
    <img
      src="../assets/image-bibliotech.png"
      class="background-image"
      alt="background"
    />
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs
      }"
      class="forgotpassword-container"
    >
      <q-card class="forgotpassword-input">
        <q-card-section>
          <h4 class="forgotpassword-title">Recuperar Senha</h4>
        </q-card-section>

        <q-card-section>
          <q-form class="label-inputs" @submit.prevent="submitForm">
            <q-input
              v-model="forgotpassword.new_password"
              label="Nova Senha :"
              type="password"
              class="input-new_password"
              dark
            >
            </q-input>
            <q-input
              v-model="forgotpassword.confirm_password"
              label="Confirmar Senha :"
              type="password"
              class="input-confirm_password"
              dark
            >
            </q-input>
            <q-card-section class="btns-confirm-cancel">
              <q-btn
                class="btn-cancel"
                label="CANCELAR"
                rounded
                type="button"
                alt="button-cancel"
                @click="cancelforgotpassword"
              ></q-btn>
              <q-btn
                class="btn-corfirm"
                label="CONFIRMAR"
                rounded
                type="submit"
                alt="button-confirm"
              ></q-btn>
            </q-card-section>
          </q-form>
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

const forgotpassword = ref({
  new_password: "",
  confirm_password: ""
});
onMounted(() => {
  console.log("Página de recuperação de senha carregada");
});

function submitForm() {
  if (
    !forgotpassword.value.new_password.trim() ||
    !forgotpassword.value.confirm_password
  ) {
    $q.notify({
      type: "negative",
      message: "Preencha todos os campos!",
      position: "top",
      timeout: 3000
    });
    return;
  }

  if (forgotpassword.value.new_password.length < 6) {
    $q.notify({
      type: "negative",
      message: "A nova senha deve ter no mínimo 6 caracteres!",
      position: "top",
      timeout: 3000
    });
    return;
  }
  if (
    forgotpassword.value.new_password !== forgotpassword.value.confirm_password
  ) {
    $q.notify({
      type: "negative",
      message: "As senhas não coincidem!",
      position: "top",
      timeout: 3000
    });
    return;
  }
  $q.notify({
    type: "positive",
    message: "As senhas coincidem!",
    position: "top",
    timeout: 3000
  });
  $q.notify({
    type: "positive",
    message: "Informações corretas!",
    position: "top",
    timeout: 3000
  });
}
const router = useRouter();

function cancelforgotpassword() {
  forgotpassword.value.new_password = "";
  forgotpassword.value.confirm_password = "";

  router.push("/login");
}
</script>

<style scoped>
.forgotpassword-page {
  height: 70rem;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.forgotpassword-container {
  position: fixed;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 450px;
  padding: 15px;
  background: rgb(66, 15, 15);
  border-radius: 20px;
  box-shadow: 0 40px 50px black;
}
.forgotpassword-title {
  margin: 2rem;
  transform: translate(10%, -10%);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.forgotpassword-input {
  background-color: rgb(107, 48, 44);
  color: rgb(252, 249, 249);
}
.label-inputs {
  transform: translate(0, 0%);
}
.btn-cancel {
  margin: 4rem;
  transform: translate(-70%, 0);
}
.btn-confirm {
  transform: translate(80%, 0);
}
.input-confirm_password {
  transform: translate(0, 40%);
}
.input-new_password {
  transform: translate(0, -50%);
}
.btns-confirm-cancel {
  transform: translate(0, 20%);
}
</style>
