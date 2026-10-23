<template>
  <div class="register-page">
    <img
      src="../assets/image-bibliotech.png"
      class="background-image"
      alt="background"
    />
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs
      }"
      class="register-container"
    >
      <q-card class="register-input">
        <q-card-section>
          <h4 class="register-title">Cadastrar-se</h4>
        </q-card-section>

        <q-card-section>
          <q-card-section>
            <q-form class="label-inputs" @submit="submitForm">
              <q-input
                v-model="register.full_name"
                label="Nome Completo :"
                type="text"
                class="input-full_name"
                dark
              />

              <q-input
                v-model="register.email"
                label="E-mail :"
                type="email"
                class="input-email"
                dark
              />

              <q-input
                v-model="register.telephone"
                label="Telefone :"
                type="tel"
                class="input-telephone"
                dark
              />

              <q-input
                v-model="register.date_birth"
                label="Data de Nascimento :"
                type="date"
                class="input-date_birth"
                dark
              />

              <q-input
                v-model="register.cpf"
                label="CPF :"
                type="text"
                class="input-cpf"
                mask="###.###.###-##"
                dark
              />

              <q-input
                v-model="register.adress"
                label="Endereço :"
                type="text"
                class="input-adress"
                dark
              />

              <q-card-section class="btns-register-cancel">
                <q-btn
                  class="btn-cancel"
                  label="CANCELAR"
                  rounded
                  type="button"
                  @click="cancelregister"
                />

                <q-btn
                  class="btn-register"
                  label="CADASTRAR"
                  rounded
                  type="submit"
                />
              </q-card-section>
            </q-form>
          </q-card-section>
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

const register = ref({
  full_name: "",
  email: "",
  date_birth: "",
  telephone: "",
  cpf: "",
  adress: ""
});
onMounted(() => {
  console.log("Página de recuperação de sregistro carregada");
});

function submitForm() {
  if (
    !register.value.full_name.trim() ||
    !register.value.email.trim() ||
    !register.value.date_birth.trim() ||
    !register.value.telephone.trim() ||
    !register.value.cpf.trim() ||
    !register.value.adress.trim()
  ) {
    $q.notify({
      type: "negative",
      message: "Preencha todos os campos!",
      position: "top",
      timeout: 3000
    });
    return;
  }
}
const router = useRouter();

function cancelregister() {
  register.value.full_name = "";
  register.value.email = "";
  register.value.date_birth = "";
  register.value.telephone = "";
  register.value.cpf = "";
  register.value.adress = "";

  router.push("/login");
}
</script>

<style scoped>
.register-page {
  height: 70rem;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.register-container {
  position: fixed;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  height: 600px;

  width: 450px;
  padding: 12px;
  background: rgb(66, 15, 15);
  border-radius: 20px;
  box-shadow: 0 40px 50px black;
}
.register-title {
  margin: 4rem;
  transform: translate(10%, -150%);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.register-input {
  background-color: rgb(107, 48, 44);
  color: rgb(252, 249, 249);
  height: 575px;
}
.label-inputs {
  transform: translate(0, -30%);
}
.btn-cancel {
  margin: 3rem;
  transform: translate(-70%, 0);
}
.btn-register {
  transform: translate(40%, 0);
}
.input-confirm_password {
  transform: translate(0, 40%);
}
.input-new_password {
  transform: translate(0, -50%);
}
.btns-register-cancel {
  transform: translate(0, 0%);
}
</style>
