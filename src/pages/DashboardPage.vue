<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md"> DASHBOARD </div>
    <q-separator class="q-mb-lg bg-white opacity-3" style="height: 1px" />

    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-12 col-md-4">
        <q-card class="dashboard-card q-pa-md shadow-2">
          <div class="text-subtitle2 text-weight-medium text-amber-2 q-mb-sm">
            Livro mais alugado no mês
          </div>
          <div class="text-h5 text-weight-bold text-white q-mb-xs">
            Dom Casmurro
          </div>
          <div class="text-caption text-grey-3"> 42 aluguéis </div>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="dashboard-card q-pa-md shadow-2">
          <div class="text-subtitle2 text-weight-medium text-amber-2 q-mb-sm">
            Aluguéis no mês
          </div>
          <div class="text-h4 text-weight-bold text-white q-mb-xs"> 128 </div>
          <div class="text-caption text-grey-3"> Total aluguéis </div>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="dashboard-card q-pa-md shadow-2">
          <div class="text-subtitle2 text-weight-medium text-amber-2 q-mb-sm">
            Usuários logados
          </div>
          <div class="text-h4 text-weight-bold text-white q-mb-xs"> 15 </div>
          <div class="text-caption text-grey-3"> Ativos no momento </div>
        </q-card>
      </div>
    </div>

    <q-card class="dashboard-card q-pa-md shadow-3">
      <div class="text-h6 text-weight-medium text-white q-mb-md">
        Últimos alugueis
      </div>

      <q-markup-table flat bordered class="custom-table text-white">
        <thead>
          <tr>
            <th class="text-left">Usuário</th>
            <th class="text-left">Livro alugado</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Caio Vinícius</td>
            <td>O Alquimista</td>
            <td class="text-center">
              <q-badge
                rounded
                color="green-4"
                text-color="black"
                class="q-px-md q-py-xs text-weight-medium"
              >
                Retornado N/P
              </q-badge>
            </td>
          </tr>
          <tr>
            <td>João Vitor</td>
            <td>1984</td>
            <td class="text-center">
              <q-badge
                rounded
                color="amber-2"
                text-color="black"
                class="q-px-md q-py-xs text-weight-medium"
              >
                Retornado C/A
              </q-badge>
            </td>
          </tr>
          <tr>
            <td>Jéssica</td>
            <td>O Pequeno Príncipe</td>
            <td class="text-center">
              <q-badge
                rounded
                color="pink-2"
                text-color="black"
                class="q-px-md q-py-xs text-weight-medium"
              >
                Pendente
              </q-badge>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </q-page>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.dashboard-card {
  background-color: #6b302c;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
