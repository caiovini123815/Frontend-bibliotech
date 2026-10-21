<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md"> LIVROS </div>
    <q-separator class="q-mb-lg bg-white opacity-3" style="height: 1px" />

    <div class="text-h6 text-weight-medium text-white q-mb-md">
      Gestão de Livros
    </div>

    <div class="row q-col-gutter-md q-mb-lg items-center">
      <div class="col-12 col-md-8">
        <q-input
          filled
          bg-color="white"
          color="dark"
          v-model="search"
          placeholder="Procurar por nome do livro..."
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" color="dark" />
          </template>
        </q-input>
      </div>

      <div class="col-6 col-md-2">
        <q-btn
          color="white"
          text-color="dark"
          icon="filter_list"
          label="Filtro"
          class="full-width"
        >
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section>Mais aluguéis</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Menos aluguéis</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

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

    <q-card class="dashboard-card q-pa-md shadow-3">
      <q-markup-table flat bordered class="custom-table text-white">
        <thead>
          <tr>
            <th class="text-left">Livro</th>
            <th class="text-left">Autor</th>
            <th class="text-center">Alugado</th>
            <th class="text-center">Estoque</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-weight-medium">Dom Casmurro</td>
            <td>Machado de Assis</td>
            <td class="text-center">18</td>
            <td class="text-center">65</td>
            <td class="text-center">
              <q-btn flat round icon="edit" color="amber-2" size="sm" />
            </td>
          </tr>
          <tr>
            <td class="text-weight-medium">O Alquimista</td>
            <td>Paulo Coelho</td>
            <td class="text-center">24</td>
            <td class="text-center">80</td>
            <td class="text-center">
              <q-btn flat round icon="edit" color="amber-2" size="sm" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-dialog v-model="isOpen">
      <q-card class="modal-card q-pa-lg text-white">
        <div class="q-mb-md">
          <q-btn flat round icon="arrow_back" color="white" v-close-popup />
        </div>

        <div class="text-h4 text-weight-bold text-center q-mb-xl">
          Adicionar Livro
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Livro</div>
            <q-input
              outlined
              v-model="form.titulo"
              placeholder="Título"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="bi-chat-square-text" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Autor(a)</div>
            <q-input
              outlined
              v-model="form.autor"
              placeholder="Autoria"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="bi-person-fill" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"
              >Ano de lançamento</div
            >
            <q-input
              outlined
              v-model="form.lancamento"
              placeholder="Lançamento"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="event" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Quantidade</div>
            <q-input
              outlined
              v-model="form.quantidade"
              placeholder="Total"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="inventory_2" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Editora</div>
            <q-input
              outlined
              v-model="form.editora"
              placeholder="Nome"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="bi-stickies-fill" color="white" />
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

const form = reactive({
  titulo: "",
  autor: "",
  lancamento: "",
  quantidade: "",
  editora: ""
});

function onSubmit() {
  console.log("Livro salvo:", form);
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
