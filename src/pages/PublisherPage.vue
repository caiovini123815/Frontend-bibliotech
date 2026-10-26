<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold text-white q-mb-md"> EDITORA </div>

    <q-separator class="q-mb-lg bg-white opacity-3" style="height: 1px" />

    <div class="text-h6 text-weight-medium text-white q-mb-md">
      Gestão de Editoras
    </div>

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

      <div class="col-6 col-md-2">
        <q-btn
          color="white"
          text-color="dark"
          icon="filter_alt"
          :label="filtroLabel"
          class="full-width"
          unelevated
        >
          <q-menu>
            <q-list style="min-width: 180px">
              <q-item clickable v-close-popup @click="filtro = 'az'">
                <q-item-section avatar>
                  <q-icon name="arrow_downward" />
                </q-item-section>
                <q-item-section>Nome: A–Z</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="filtro = 'za'">
                <q-item-section avatar>
                  <q-icon name="arrow_upward" />
                </q-item-section>
                <q-item-section>Nome: Z–A</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="filtro = 'comSite'">
                <q-item-section avatar>
                  <q-icon name="globe" />
                </q-item-section>
                <q-item-section>Com site</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="filtro = 'semSite'">
                <q-item-section avatar>
                  <q-icon name="link_off" />
                </q-item-section>
                <q-item-section>Sem site</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="filtro = 'todos'">
                <q-item-section avatar>
                  <q-icon name="filter_alt_off" />
                </q-item-section>
                <q-item-section>Limpar filtro</q-item-section>
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

    <q-card class="dashboard-card q-pa-md shadow-3">
      <div v-if="loading" class="text-center q-pa-lg text-white">
        <q-spinner size="36px" color="white" />
        <div class="q-mt-sm">Carregando editoras...</div>
      </div>

      <q-markup-table v-else flat bordered class="custom-table text-white">
        <thead>
          <tr>
            <th class="text-left">Editora</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Telefone</th>
            <th class="text-left">Site</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="editora in editorasFiltradas" :key="editora.id">
            <td class="text-weight-medium">{{ editora.nome }}</td>
            <td>{{ editora.email }}</td>
            <td>{{ editora.telefone }}</td>
            <td>{{ editora.site }}</td>

            <td class="text-center">
              <q-btn flat round icon="edit" color="amber-2" size="sm" disable>
                <q-tooltip>Edição será integrada depois</q-tooltip>
              </q-btn>
            </td>
          </tr>

          <tr v-if="editorasFiltradas.length === 0">
            <td colspan="5" class="text-center q-pa-lg">
              {{
                search.trim()
                  ? "Nenhuma editora encontrada para essa pesquisa."
                  : "Nenhuma editora encontrada para esse filtro."
              }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <div class="row justify-end q-mt-sm text-white" v-if="totalEditoras > 0">
        <span>{{ totalEditoras }} editora(s) encontrada(s)</span>
      </div>
    </q-card>

    <q-dialog v-model="isOpen">
      <q-card class="modal-card q-pa-lg text-white">
        <div class="q-mb-md">
          <q-btn flat round icon="arrow_back" color="white" v-close-popup />
        </div>

        <div class="text-h4 text-weight-bold text-center q-mb-xl">
          Adicionar Editora
        </div>

        <q-form ref="formRef" @submit.prevent="onSubmit" class="q-gutter-md">
          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">
              Nome da editora
            </div>

            <q-input
              outlined
              v-model="form.nome"
              placeholder="Nome da editora"
              dark
              dense
              class="rounded-input"
              maxlength="100"
              lazy-rules
              :rules="[
                val => !!val?.trim() || 'Informe o nome da editora',
                val =>
                  (val?.trim().length >= 3 && val.trim().length <= 100) ||
                  'O nome deve ter entre 3 e 100 caracteres',
                val =>
                  /^[a-zA-ZáàâãéêíóôõúçÁÀÂÃÍÊÓÔÕÚÇ\s]+$/.test(
                    val?.trim() || ''
                  ) || 'Use apenas letras, acentos e espaços'
              ]"
            >
              <template v-slot:append>
                <q-icon name="business" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">CNPJ</div>

            <q-input
              outlined
              v-model="form.cnpj"
              placeholder="00.000.000/0000-00"
              dark
              dense
              class="rounded-input"
              mask="##.###.###/####-##"
              lazy-rules
              :rules="[
                val => !!val || 'Informe o CNPJ',
                val =>
                  val.replace(/\D/g, '').length === 14 ||
                  'O CNPJ deve conter 14 números'
              ]"
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
              placeholder="editora@exemplo.com"
              dark
              dense
              class="rounded-input"
              type="email"
              maxlength="100"
              lazy-rules
              :rules="[
                val => !!val?.trim() || 'Informe o e-mail',
                val =>
                  (val.trim().length >= 5 && val.trim().length <= 100) ||
                  'O e-mail deve ter entre 5 e 100 caracteres',
                val =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val || '') ||
                  'Digite um e-mail válido'
              ]"
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
                  'Informe o celular completo: (00) 00000-0000'
              ]"
            >
              <template v-slot:append>
                <q-icon name="phone" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">
              Site da editora
            </div>

            <q-input
              outlined
              v-model="form.site"
              placeholder="https://www.exemplo.com.br"
              dark
              dense
              class="rounded-input"
              maxlength="150"
              lazy-rules
              :rules="[
                val => !!val?.trim() || 'Informe o site',
                val =>
                  (val.trim().length >= 20 && val.trim().length <= 150) ||
                  'O site deve ter entre 20 e 150 caracteres',
                val =>
                  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/.*)?$/.test(
                    val?.trim() || ''
                  ) ||
                  'Informe um endereço válido começando com http:// ou https://'
              ]"
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

const search = ref("");
const isOpen = ref(false);
const loading = ref(false);
const salvando = ref(false);
const formRef = ref();

type TipoFiltro = "todos" | "az" | "za" | "comSite" | "semSite";

const filtro = ref<TipoFiltro>("todos");

const filtroLabel = computed(() => {
  const labels: Record<TipoFiltro, string> = {
    todos: "Filtro",
    az: "Nome: A–Z",
    za: "Nome: Z–A",
    comSite: "Com site",
    semSite: "Sem site"
  };

  return labels[filtro.value];
});

interface Editora {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  site: string;
}

const editoras = ref<Editora[]>([]);

const form = reactive({
  nome: "",
  cnpj: "",
  email: "",
  telefone: "",
  site: ""
});

const editorasFiltradas = computed(() => {
  const termo = search.value.trim().toLowerCase();

  let resultado = editoras.value.filter(editora =>
    editora.nome.toLowerCase().includes(termo)
  );

  if (filtro.value === "comSite") {
    resultado = resultado.filter(
      editora => editora.site.trim() !== "" && editora.site !== "—"
    );
  }

  if (filtro.value === "semSite") {
    resultado = resultado.filter(
      editora => editora.site.trim() === "" || editora.site === "—"
    );
  }

  if (filtro.value === "az") {
    resultado.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }

  if (filtro.value === "za") {
    resultado.sort((a, b) => b.nome.localeCompare(a.nome, "pt-BR"));
  }

  return resultado;
});

const totalEditoras = computed(() => editorasFiltradas.value.length);

async function carregarEditoras() {
  loading.value = true;

  try {
    const response = await api.get("/publishers");

    const dados = Array.isArray(response.data)
      ? response.data
      : response.data.content;

    if (!Array.isArray(dados)) {
      throw new Error("Formato inesperado na resposta de editoras.");
    }

    editoras.value = dados.map((editora: any) => ({
      id: editora.id,
      nome: editora.namePublisher ?? "",
      email: editora.email ?? "—",
      telefone: editora.phonePublisher ?? "—",
      site: editora.website ?? "—"
    }));

    console.log("Editoras carregadas:", editoras.value);
  } catch (error: any) {
    console.error(
      "Erro ao carregar as editoras:",
      error.response?.data ?? error
    );

    $q.notify({
      type: "negative",
      message:
        error.response?.status === 401
          ? "Sessão não autorizada. Faça login novamente."
          : "Não foi possível carregar as editoras.",
      position: "top",
      timeout: 4000
    });
  } finally {
    loading.value = false;
  }
}

function abrirCadastro() {
  form.nome = "";
  form.cnpj = "";
  form.email = "";
  form.telefone = "";
  form.site = "";

  formRef.value?.resetValidation();
  isOpen.value = true;
}

async function onSubmit() {
  if (salvando.value) return;

  salvando.value = true;

  try {
    const payload = {
      namePublisher: form.nome.trim(),
      cnpj: form.cnpj.replace(/\D/g, ""),
      email: form.email.trim(),
      phonePublisher: form.telefone,
      website: form.site.trim()
    };

    await api.post("/publishers", payload);

    $q.notify({
      type: "positive",
      message: "Editora cadastrada com sucesso!",
      position: "top",
      timeout: 3000
    });

    isOpen.value = false;

    form.nome = "";
    form.cnpj = "";
    form.email = "";
    form.telefone = "";
    form.site = "";

    await carregarEditoras();
  } catch (error: any) {
    console.error("Erro ao cadastrar editora:", error.response?.data ?? error);

    const dadosErro = error.response?.data;
    let mensagem =
      dadosErro?.message ||
      "Não foi possível cadastrar a editora. Verifique os dados e tente novamente.";

    if (error.response?.status === 409) {
      mensagem =
        dadosErro?.message || "Este e-mail ou CNPJ já está cadastrado.";
    } else if (error.response?.status === 400) {
      mensagem =
        dadosErro?.message ||
        "Os dados informados são inválidos. Confira os campos.";
    } else if (error.response?.status === 401) {
      mensagem = "Sua sessão expirou. Faça login novamente.";
    }

    $q.notify({
      type: "negative",
      message: mensagem,
      position: "top",
      timeout: 5000
    });
  } finally {
    salvando.value = false;
  }
}

onMounted(() => {
  carregarEditoras();
});
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
