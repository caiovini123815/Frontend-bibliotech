<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md">PERFIL</div>
    <q-separator class="q-mb-xl bg-white opacity-3" style="height: 1px" />

    <!-- Card de Perfil -->
    <q-card class="profile-card q-pa-lg shadow-3">
      <div class="row items-center justify-between q-mb-lg">
        <div class="row items-center q-gutter-x-md text-white">
          <q-icon name="account_circle" size="48px" />
          <span class="text-h5 text-weight-bold">ADMINISTRADOR SUPREMO</span>
        </div>

        <q-btn
          color="black"
          icon="edit"
          label="Editar"
          class="btn-editar rounded-btn"
          unelevated
          @click="isOpen = true"
        />
      </div>

      <div class="profile-details q-pa-lg">
        <div class="column q-gutter-y-md text-white text-subtitle1">
          <div>
            <span class="text-weight-bold">Nome: </span>
            <span>{{ perfil.nome }}</span>
          </div>
          <div>
            <span class="text-weight-bold">E-mail: </span>
            <span>{{ perfil.email }}</span>
          </div>
          <div>
            <span class="text-weight-bold">CPF: </span>
            <span>{{ perfil.cpf }}</span>
          </div>
          <div>
            <span class="text-weight-bold">Data de Nascimento: </span>
            <span>{{ perfil.dataNascimento }}</span>
          </div>
          <div>
            <span class="text-weight-bold">Telefone: </span>
            <span>{{ perfil.telefone }}</span>
          </div>
          <div>
            <span class="text-weight-bold">Endereço: </span>
            <span>{{ perfil.endereco }}</span>
          </div>
        </div>
      </div>
    </q-card>

    <!-- Modal Editar Perfil -->
    <q-dialog v-model="isOpen">
      <q-card class="modal-card q-pa-lg text-white">
        <div class="q-mb-md">
          <q-btn flat round icon="arrow_back" color="white" v-close-popup />
        </div>

        <div class="text-h4 text-weight-bold text-center q-mb-xl">
          Editar Perfil
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Nome Completo</div>
            <q-input
              outlined
              v-model="form.nome"
              placeholder="Nome Completo"
              dark
              dense
              class="rounded-input"
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">E-mail</div>
            <q-input
              outlined
              v-model="form.email"
              placeholder="...@gmail.com"
              dark
              dense
              class="rounded-input"
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">CPF</div>
            <q-input
              outlined
              v-model="form.cpf"
              placeholder="--- --- --- --"
              dark
              dense
              class="rounded-input"
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"
              >Data de Nascimento</div
            >
            <q-input
              outlined
              v-model="form.dataNascimento"
              placeholder="dd/mm/aaaa"
              dark
              dense
              class="rounded-input"
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Telefone</div>
            <q-input
              outlined
              v-model="form.telefone"
              placeholder="(--) ----- ----"
              dark
              dense
              class="rounded-input"
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Endereço</div>
            <q-input
              outlined
              v-model="form.endereco"
              placeholder="Localização"
              dark
              dense
              class="rounded-input"
            />
          </div>

          <div class="q-mt-xl">
            <q-btn
              label="Salvar"
              type="submit"
              color="white"
              text-color="dark"
              class="full-width text-weight-bold q-py-sm rounded-btn"
              unelevated
              v-close-popup
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const isOpen = ref(false);

const perfil = reactive({
  nome: "Administrador supremo",
  email: "adminsupremo@gmail.com",
  cpf: "444.444.444 - 44",
  dataNascimento: "21/02/2000",
  telefone: "(44) 4 4444 4444",
  endereco: "Rua Jacarecanga, 444 - Fortaleza"
});

const form = reactive({ ...perfil });

function onSubmit() {
  Object.assign(perfil, form);
}
</script>

<style lang="scss" scoped>
.q-page {
  background-color: #c89f7a;
  font-family: "Poppins", sans-serif;
}

.profile-card {
  background-color: #6b302c;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  max-width: 800px;
  margin: 0 auto;
}

.profile-details {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}

.btn-editar {
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.modal-card {
  background-color: #6b302c;
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.rounded-input :deep(.q-field__control) {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.15);
}

.rounded-btn {
  border-radius: 24px;
}
</style>
