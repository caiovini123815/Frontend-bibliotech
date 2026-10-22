<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md">EDITORA</div>
    <q-separator class="q-mb-lg bg-white opacity-3" style="height: 1px" />

    <div class="text-h6 text-weight-medium text-white q-mb-md">
      Gestão de Editoras
    </div>

    <!-- Barra de busca e botões -->
    <div class="row q-col-gutter-md q-mb-lg items-center">
      <div class="col-12 col-md-8">
        <q-input
          filled
          bg-color="white"
          color="dark"
          v-model="search"
          placeholder="Procurar por nome da editora..."
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" color="dark" />
          </template>
        </q-input>
      </div>

      <!-- Filtro com menu pop-up -->
      <div class="col-6 col-md-2">
        <q-btn
          color="white"
          text-color="dark"
          icon="filter_alt"
          label="Filtro"
          class="full-width"
          unelevated
        >
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section>Mais livros</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Menos livros</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <!-- Botão Adicionar -->
      <div class="col-6 col-md-2">
        <q-btn
          color="primary"
          icon="add"
          label="Adicionar"
          class="full-width btn-adicionar"
          unelevated
          @click="isOpen = true"
        />
      </div>
    </div>

    <!-- Tabela de Editoras -->
    <q-card class="dashboard-card q-pa-md shadow-3">
      <q-markup-table flat bordered class="custom-table text-white">
        <thead>
          <tr>
            <th class="text-left">Editor</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Telefone</th>
            <th class="text-left">Site</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(editora, index) in editoras" :key="index">
            <td class="text-weight-medium">{{ editora.nome }}</td>
            <td>{{ editora.email }}</td>
            <td>{{ editora.telefone }}</td>
            <td>{{ editora.site }}</td>
            <td class="text-center">
              <q-btn flat round icon="edit" color="amber-2" size="sm" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- Modal Adicionar Editora -->
    <q-dialog v-model="isOpen">
      <q-card class="modal-card q-pa-lg text-white">
        <div class="q-mb-md">
          <q-btn flat round icon="arrow_back" color="white" v-close-popup />
        </div>

        <div class="text-h4 text-weight-bold text-center q-mb-xl">
          Adicionar Editora
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Nome editora</div>
            <q-input
              outlined
              v-model="form.nome"
              placeholder="Editora"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="business" color="white" />
              </template>
            </q-input>
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
            >
              <template v-slot:append>
                <q-icon name="email" color="white" />
              </template>
            </q-input>
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
              mask="(##) #####-####"
            >
              <template v-slot:append>
                <q-icon name="phone" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Site editora</div>
            <q-input
              outlined
              v-model="form.site"
              placeholder="www..."
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="link" color="white" />
              </template>
            </q-input>
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

const search = ref("");
const isOpen = ref(false);

// Dados fictícios baseados na imagem de listagem
const editoras = ref([
  {
    nome: "Aleph",
    email: "editoraaleph@gmail.com",
    telefone: "(85) 9 9999 9999",
    site: "www.editoraaleph.com"
  },
  {
    nome: "Pinguim",
    email: "editorapenguin@gmail.com",
    telefone: "(85) 8 8888 8888",
    site: "www.editorapenguin.com"
  },
  {
    nome: "Hachette",
    email: "editorahachette@gmail.com",
    telefone: "(85) 7 7777 7777",
    site: "www.editorahachette.com"
  },
  {
    nome: "Thomson",
    email: "editotathomson@gmail.com",
    telefone: "(85) 6 6666 6666",
    site: "www.editorathomson.com"
  }
]);

const form = reactive({
  nome: "",
  email: "",
  telefone: "",
  site: ""
});

function onSubmit() {
  console.log("Editora salva:", form);
}
</script>

<style lang="scss" scoped>
.q-page {
  background-color: #c89f7a;
  font-family: "Poppins", sans-serif;
}

.dashboard-card {
  background-color: #6b302c;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-adicionar {
  background-color: #6b302c !important;
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

.custom-table {
  background-color: transparent !important;

  thead th {
    background-color: rgba(0, 0, 0, 0.15);
    font-weight: 600;
    font-size: 0.95rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  tbody td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.95rem;
  }
}
</style>
