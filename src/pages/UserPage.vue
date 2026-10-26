<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md"> USUÁRIOS </div>

    <q-separator class="q-mb-lg bg-white opacity-3" style="height: 1px" />

    <div class="text-h6 text-weight-medium text-white q-mb-md">
      Gerenciamento de usuários
    </div>

    <!-- Busca, filtro e cadastro -->
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
            <q-list style="min-width: 180px">
              <q-item clickable v-close-popup @click="filtro = 'nome'">
                <q-item-section>Ordem alfabética</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="filtro = 'ativos'">
                <q-item-section>Usuários ativos</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="filtro = 'inativos'">
                <q-item-section>Usuários inativos</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="filtro = 'todos'">
                <q-item-section>Todos os usuários</q-item-section>
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
          @click="abrirCadastro"
        />
      </div>
    </div>

    <!-- Tabela de usuários -->
    <q-card class="dashboard-card q-pa-md shadow-3">
      <div v-if="loading" class="text-center q-pa-lg text-white">
        <q-spinner color="white" size="32px" />
        <div class="q-mt-sm">Carregando usuários...</div>
      </div>

      <q-markup-table v-else flat bordered class="custom-table text-white">
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Telefone</th>
            <th class="text-center">Aluguéis</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
            <td class="text-weight-medium">
              {{ usuario.nameFull }}
            </td>

            <td>{{ usuario.email || "—" }}</td>

            <td>{{ usuario.phone || "—" }}</td>

            <td class="text-center">—</td>

            <td class="text-center">
              <q-badge
                :color="usuario.isDisable ? 'red-3' : 'green-4'"
                text-color="dark"
                class="q-px-md q-py-xs text-weight-bold"
              >
                {{ usuario.isDisable ? "Inativo" : "Ativo" }}
              </q-badge>
            </td>
          </tr>

          <tr v-if="usuariosFiltrados.length === 0">
            <td colspan="5" class="text-center q-pa-lg">
              Nenhum usuário encontrado.
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- Modal de cadastro -->
    <q-dialog v-model="isOpen">
      <q-card class="modal-card q-pa-lg text-white">
        <div class="q-mb-md">
          <q-btn
            flat
            round
            icon="arrow_back"
            color="white"
            @click="isOpen = false"
          />
        </div>

        <div class="text-h4 text-weight-bold text-center q-mb-xl">
          Cadastrar Usuário
        </div>

        <q-form ref="formRef" @submit.prevent="onSubmit" class="q-gutter-md">
          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">
              Nome Completo
            </div>

            <q-input
              outlined
              v-model="form.nomeCompleto"
              placeholder="Nome completo"
              dark
              dense
              class="rounded-input"
              lazy-rules
              :rules="[
                val => !!val?.trim() || 'Informe o nome completo',
                val =>
                  val?.trim().length >= 3 ||
                  'O nome deve ter pelo menos 3 caracteres',
                val =>
                  val?.trim().length <= 100 ||
                  'O nome deve ter no máximo 100 caracteres'
              ]"
            >
              <template v-slot:append>
                <q-icon name="badge" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> E-mail </div>

            <q-input
              outlined
              v-model="form.email"
              type="email"
              placeholder="seuemail@gmail.com"
              dark
              dense
              class="rounded-input"
              lazy-rules
              :rules="[
                val => !!val?.trim() || 'Informe o e-mail',
                val =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val || '') ||
                  'Informe um e-mail válido'
              ]"
            >
              <template v-slot:append>
                <q-icon name="email" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> Senha </div>

            <q-input
              outlined
              v-model="form.senha"
              :type="mostrarSenha ? 'text' : 'password'"
              placeholder="Mínimo de 8 caracteres"
              dark
              dense
              class="rounded-input"
              lazy-rules
              :rules="[
                val => !!val || 'Informe a senha',
                val =>
                  val?.length >= 8 ||
                  'A senha deve ter pelo menos 8 caracteres',
                val =>
                  val?.length <= 100 ||
                  'A senha deve ter no máximo 100 caracteres'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="mostrarSenha ? 'visibility_off' : 'visibility'"
                  color="white"
                  class="cursor-pointer"
                  @click="mostrarSenha = !mostrarSenha"
                />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> CPF </div>

            <q-input
              outlined
              v-model="form.cpf"
              placeholder="000.000.000-00"
              dark
              dense
              class="rounded-input"
              mask="###.###.###-##"
              lazy-rules
              :rules="[
                val => !!val || 'Informe o CPF',
                val =>
                  val?.replace(/\D/g, '').length === 11 ||
                  'Informe os 11 dígitos do CPF'
              ]"
            >
              <template v-slot:append>
                <q-icon name="subtitles" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">
              Data de Nascimento
            </div>

            <q-input
              outlined
              v-model="form.dataNascimento"
              type="date"
              dark
              dense
              class="rounded-input"
              lazy-rules
              :rules="[
                val => !!val || 'Informe a data de nascimento',
                val => !val || val <= dataHoje || 'A data não pode ser futura'
              ]"
            >
              <template v-slot:append>
                <q-icon name="event" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> Telefone </div>

            <q-input
              outlined
              v-model="form.telefone"
              placeholder="(85) 99999-9999"
              dark
              dense
              class="rounded-input"
              mask="(##) #####-####"
              lazy-rules
              :rules="[
                val => !!val || 'Informe o telefone',
                val =>
                  /^\(\d{2}\)\s\d{5}-\d{4}$/.test(val || '') ||
                  'Informe o celular completo'
              ]"
            >
              <template v-slot:append>
                <q-icon name="phone" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> Endereço </div>

            <q-input
              outlined
              v-model="form.endereco"
              placeholder="Rua, número, bairro..."
              dark
              dense
              class="rounded-input"
              lazy-rules
              :rules="[
                val => !!val?.trim() || 'Informe o endereço',
                val => val?.trim().length <= 255 || 'O endereço é muito longo'
              ]"
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
              :loading="salvando"
              :disable="salvando"
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "@/boot/axios";

const $q = useQuasar();

interface Usuario {
  id: number;
  nameFull: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  dateBirth?: string;
  address?: string;
  isAdmin?: boolean;
  isDisable?: boolean;
}

const search = ref("");
const isOpen = ref(false);
const loading = ref(false);
const salvando = ref(false);
const mostrarSenha = ref(false);
const formRef = ref();
const filtro = ref("todos");
const usuarios = ref<Usuario[]>([]);

const dataHoje = new Date().toISOString().slice(0, 10);

const form = reactive({
  nomeCompleto: "",
  email: "",
  senha: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  endereco: ""
});

const usuariosFiltrados = computed(() => {
  let resultado = usuarios.value.filter(usuario =>
    (usuario.nameFull || "")
      .toLowerCase()
      .includes(search.value.trim().toLowerCase())
  );

  if (filtro.value === "ativos") {
    resultado = resultado.filter(usuario => !usuario.isDisable);
  } else if (filtro.value === "inativos") {
    resultado = resultado.filter(usuario => usuario.isDisable);
  }

  if (filtro.value === "nome") {
    resultado = [...resultado].sort((a, b) =>
      a.nameFull.localeCompare(b.nameFull, "pt-BR")
    );
  }

  return resultado;
});

function abrirCadastro() {
  resetarFormulario();
  isOpen.value = true;
}

function resetarFormulario() {
  form.nomeCompleto = "";
  form.email = "";
  form.senha = "";
  form.cpf = "";
  form.dataNascimento = "";
  form.telefone = "";
  form.endereco = "";
  mostrarSenha.value = false;
  formRef.value?.resetValidation();
}

function mostrarErro(mensagem: string) {
  $q.notify({
    type: "negative",
    message: mensagem,
    position: "top",
    timeout: 4000
  });
}

async function carregarUsuarios() {
  loading.value = true;

  try {
    const response = await api.get("/users");
    const dados = response.data;

    usuarios.value = Array.isArray(dados)
      ? dados
      : Array.isArray(dados?.content)
        ? dados.content
        : [];
  } catch (error: any) {
    console.error("Erro ao carregar usuários:", error);

    mostrarErro(
      error.response?.status === 401
        ? "Sua sessão expirou. Faça login novamente."
        : "Não foi possível carregar os usuários. Verifique o backend."
    );
  } finally {
    loading.value = false;
  }
}

async function onSubmit() {
  const valido = await formRef.value?.validate();

  if (!valido) return;

  salvando.value = true;

  const payload = {
    nameFull: form.nomeCompleto.trim(),
    email: form.email.trim(),
    cpf: form.cpf.replace(/\D/g, ""),
    phone: form.telefone,
    birthDate: form.dataNascimento,
    address: form.endereco.trim(),
    password: form.senha
  };

  try {
    await api.post("/users", payload);

    $q.notify({
      type: "positive",
      message: "Usuário cadastrado com sucesso!",
      position: "top",
      timeout: 3000
    });

    isOpen.value = false;
    resetarFormulario();

    await carregarUsuarios();
  } catch (error: any) {
    console.error("Erro ao cadastrar usuário:", error);

    const status = error.response?.status;
    const resposta = error.response?.data;

    console.log("Status:", status);
    console.log(
      "Resposta completa do backend:",
      JSON.stringify(resposta, null, 2)
    );
    console.log("Dados enviados:", JSON.stringify(payload, null, 2));

    if (status === 409) {
      mostrarErro("Este e-mail ou CPF já está cadastrado.");
    } else if (status === 400) {
      const mensagem = resposta?.detail || resposta?.message || resposta?.error;

      mostrarErro(
        typeof mensagem === "string"
          ? mensagem
          : "Dados inválidos. Confira os campos e tente novamente."
      );
    } else if (status === 401 || status === 403) {
      mostrarErro("Você não tem autorização para realizar esse cadastro.");
    } else {
      mostrarErro(
        "Não foi possível cadastrar o usuário. Verifique os dados e o backend."
      );
    }
  } finally {
    salvando.value = false;
  }
}

onMounted(carregarUsuarios);
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
