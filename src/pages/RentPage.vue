<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md">ALUGUEL</div>
    <q-separator class="q-mb-lg bg-white opacity-3" style="height: 1px" />

    <div class="text-h6 text-weight-medium text-white q-mb-md">
      Gestão de aluguéis
    </div>

    <!-- Barra de busca e botões -->
    <div class="row q-col-gutter-md q-mb-lg items-center">
      <div class="col-12 col-md-8">
        <q-input
          filled
          bg-color="white"
          color="dark"
          v-model="search"
          placeholder="Procurar por nome do usuário..."
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
              <q-item
                clickable
                v-close-popup
                @click="filterStatus = 'Pendente'"
              >
                <q-item-section>Pendente</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="filterStatus = 'No horário'"
              >
                <q-item-section>No horário</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="filterStatus = 'Tarde'">
                <q-item-section>Tarde</q-item-section>
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

    <!-- Tabela de Aluguéis -->
    <q-card class="dashboard-card q-pa-md shadow-3">
      <q-markup-table flat bordered class="custom-table text-white">
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">Livro</th>
            <th class="text-center">Aluguel</th>
            <th class="text-center">Data de vencimento</th>
            <th class="text-center">Retornar</th>
            <th class="text-center">Status</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in alugueis" :key="index">
            <td class="text-weight-medium">{{ item.nome }}</td>
            <td>{{ item.livro }}</td>
            <td class="text-center">{{ item.aluguel }}</td>
            <td class="text-center">{{ item.vencimento }}</td>
            <td class="text-center">{{ item.retornar || "---" }}</td>
            <td class="text-center">
              <q-badge
                :color="getStatusColor(item.status)"
                text-color="dark"
                class="q-px-sm q-py-xs text-weight-bold"
              >
                {{ item.status }}
              </q-badge>
            </td>
            <td class="text-center">
              <q-btn flat round icon="edit" color="amber-2" size="sm" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- Modal Novo Aluguel -->
    <q-dialog v-model="isOpen">
      <q-card class="modal-card q-pa-lg text-white">
        <div class="q-mb-md">
          <q-btn flat round icon="arrow_back" color="white" v-close-popup />
        </div>

        <div class="text-h4 text-weight-bold text-center q-mb-xl">
          Novo Aluguel
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">Nome Completo</div>
            <q-input
              outlined
              v-model="form.nomeCompleto"
              placeholder="Nome Completo"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="badge" color="white" />
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
            <div class="text-subtitle2 q-mb-xs text-grey-2">CPF</div>
            <q-input
              outlined
              v-model="form.cpf"
              placeholder="--- --- --- --"
              dark
              dense
              class="rounded-input"
              mask="###.###.###-##"
            >
              <template v-slot:append>
                <q-icon name="subtitles" color="white" />
              </template>
            </q-input>
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
              mask="##/##/####"
            >
              <template v-slot:append>
                <q-icon name="event" color="white" />
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
            <div class="text-subtitle2 q-mb-xs text-grey-2">Endereço</div>
            <q-input
              outlined
              v-model="form.endereco"
              placeholder="Localização"
              dark
              dense
              class="rounded-input"
            >
              <template v-slot:append>
                <q-icon name="location_city" color="white" />
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
const filterStatus = ref("");

// Dados fictícios baseados na imagem
const alugueis = ref([
  {
    nome: "Caio Vinicius",
    livro: "O Cortiço",
    aluguel: "01/03/2025",
    vencimento: "11/03/2025",
    retornar: "",
    status: "Pendente"
  },
  {
    nome: "João Vitor",
    livro: "Uma Metamorfose",
    aluguel: "02/03/2025",
    vencimento: "12/03/2025",
    retornar: "10/03/2025",
    status: "No horário"
  },
  {
    nome: "Jéssica Emanuela",
    livro: "Dom Casmurro",
    aluguel: "03/03/2025",
    vencimento: "13/03/2025",
    retornar: "14/03/2025",
    status: "Tarde"
  },
  {
    nome: "Kaik Abraão",
    livro: "O Alquimista",
    aluguel: "04/03/2025",
    vencimento: "14/03/2025",
    retornar: "",
    status: "Pendente"
  },
  {
    nome: "Kauã Diego",
    livro: "Grande Sertão: Veredas",
    aluguel: "05/03/2025",
    vencimento: "15/03/2025",
    retornar: "",
    status: "Pendente"
  },
  {
    nome: "Conceição Paz",
    livro: "O Pequeno Príncipe",
    aluguel: "06/03/2025",
    vencimento: "16/03/2025",
    retornar: "",
    status: "Pendente"
  }
]);

const form = reactive({
  nomeCompleto: "",
  email: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  endereco: ""
});

function getStatusColor(status: string) {
  switch (status) {
    case "No horário":
      return "green-4";
    case "Tarde":
      return "red-4";
    case "Pendente":
      return "lime-4";
    default:
      return "grey";
  }
}

function onSubmit() {
  console.log("Aluguel salvo:", form);
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
