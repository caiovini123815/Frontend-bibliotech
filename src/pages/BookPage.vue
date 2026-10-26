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
          v-model="search"
          filled
          bg-color="white"
          color="dark"
          placeholder="Procurar por nome do livro..."
          dense
        >
          <template #prepend>
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
        >
          <q-menu>
            <q-list style="min-width: 190px">
              <q-item clickable v-close-popup @click="ordenacao = 'desc'">
                <q-item-section avatar>
                  <q-icon name="trending_up" />
                </q-item-section>
                <q-item-section> Mais quantidade </q-item-section>
                <q-item-section side>
                  <q-icon
                    v-if="ordenacao === 'desc'"
                    name="check"
                    color="positive"
                  />
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="ordenacao = 'asc'">
                <q-item-section avatar>
                  <q-icon name="trending_down" />
                </q-item-section>
                <q-item-section> Menos quantidade </q-item-section>
                <q-item-section side>
                  <q-icon
                    v-if="ordenacao === 'asc'"
                    name="check"
                    color="positive"
                  />
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="ordenacao = 'az'">
                <q-item-section avatar>
                  <q-icon name="sort_by_alpha" />
                </q-item-section>
                <q-item-section> Nome: A–Z </q-item-section>
                <q-item-section side>
                  <q-icon
                    v-if="ordenacao === 'az'"
                    name="check"
                    color="positive"
                  />
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="ordenacao = 'za'">
                <q-item-section avatar>
                  <q-icon name="sort_by_alpha" />
                </q-item-section>
                <q-item-section> Nome: Z–A </q-item-section>
                <q-item-section side>
                  <q-icon
                    v-if="ordenacao === 'za'"
                    name="check"
                    color="positive"
                  />
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="ordenacao = 'nenhum'">
                <q-item-section avatar>
                  <q-icon name="filter_alt_off" />
                </q-item-section>
                <q-item-section> Limpar filtro </q-item-section>
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
          @click="abrirFormulario"
        />
      </div>
    </div>

    <div class="text-white text-caption q-mb-sm">
      {{ livrosFiltrados.length }}
      {{
        livrosFiltrados.length === 1 ? "livro encontrado" : "livros encontrados"
      }}
    </div>

    <q-card class="dashboard-card q-pa-md shadow-3">
      <q-markup-table flat bordered class="custom-table text-white">
        <thead>
          <tr>
            <th class="text-left">Livro</th>
            <th class="text-left">Autor</th>
            <th class="text-center">Lançamento</th>
            <th class="text-center">Quantidade</th>
            <th class="text-center">Editora</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="livro in livrosFiltrados" :key="livro.id">
            <td class="text-weight-medium">
              {{ livro.titulo }}
            </td>

            <td>{{ livro.autor }}</td>

            <td class="text-center">
              {{ formatarData(livro.lancamento) }}
            </td>

            <td class="text-center">
              {{ livro.quantidade }}
            </td>

            <td class="text-center">
              {{ livro.editora }}
            </td>

            <td class="text-center">
              <q-btn
                flat
                round
                icon="edit"
                color="amber-2"
                size="sm"
                :disable="true"
              >
                <q-tooltip>
                  Edição será conectada em uma próxima etapa
                </q-tooltip>
              </q-btn>
            </td>
          </tr>

          <tr v-if="!carregando && livrosFiltrados.length === 0">
            <td colspan="6" class="text-center text-grey-4 q-py-md">
              Nenhum livro encontrado.
            </td>
          </tr>

          <tr v-if="carregando">
            <td colspan="6" class="text-center text-grey-4 q-py-md">
              Carregando livros...
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

        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> Livro </div>

            <q-input
              v-model="form.title"
              outlined
              placeholder="Título"
              dark
              dense
              class="rounded-input"
              :rules="[
                val => !!val?.trim() || 'Informe o título',
                val => val.trim().length >= 3 || 'Use pelo menos 3 caracteres',
                val =>
                  /^[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ\s]+$/.test(val) ||
                  'Use apenas letras e espaços'
              ]"
              lazy-rules
            >
              <template #append>
                <q-icon name="bi-chat-square-text" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> ISBN </div>

            <q-input
              v-model="form.isbn"
              outlined
              placeholder="Ex.: 9789875342536"
              dark
              dense
              maxlength="13"
              class="rounded-input"
              :rules="[
                val =>
                  /^(978|979)\d{10}$/.test(val) ||
                  'Informe um ISBN válido de 13 dígitos'
              ]"
              lazy-rules
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> Gênero </div>

            <q-input
              v-model="form.genre"
              outlined
              placeholder="Ex.: Romance"
              dark
              dense
              class="rounded-input"
              :rules="[
                val => !!val?.trim() || 'Informe o gênero',
                val => val.trim().length >= 3 || 'Use pelo menos 3 caracteres',
                val =>
                  /^[a-zA-ZáàâãéêíóôõúçÁÀÂÃÍÓÔÕÚÇ\s]+$/.test(val) ||
                  'Use apenas letras e espaços'
              ]"
              lazy-rules
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2">
              Número de páginas
            </div>

            <q-input
              v-model.number="form.numberPages"
              type="number"
              min="1"
              outlined
              placeholder="Total de páginas"
              dark
              dense
              class="rounded-input"
              :rules="[
                val =>
                  (Number.isInteger(val) && val > 0) ||
                  'Informe um número de páginas válido'
              ]"
              lazy-rules
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> Quantidade </div>

            <q-input
              v-model.number="form.quantity"
              type="number"
              min="1"
              outlined
              placeholder="Total de exemplares"
              dark
              dense
              class="rounded-input"
              :rules="[
                val =>
                  (Number.isInteger(val) && val > 0) ||
                  'A quantidade deve ser pelo menos 1'
              ]"
              lazy-rules
            >
              <template #append>
                <q-icon name="inventory_2" color="white" />
              </template>
            </q-input>
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs text-grey-2"> Editora </div>

            <q-select
              v-model="form.publisherId"
              :options="editoras"
              option-label="namePublisher"
              option-value="id"
              emit-value
              map-options
              outlined
              label="Selecione a editora"
              dark
              dense
              class="rounded-input"
              :loading="carregandoEditoras"
              :rules="[val => !!val || 'Selecione uma editora']"
              lazy-rules
            >
              <template #append>
                <q-icon name="bi-stickies-fill" color="white" />
              </template>
            </q-select>

            <div
              v-if="!carregandoEditoras && editoras.length === 0"
              class="text-caption text-amber-3 q-mt-sm"
            >
              Nenhuma editora disponível. Cadastre uma editora antes de
              adicionar livros.
            </div>
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
              :disable="carregandoEditoras || editoras.length === 0"
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { api } from "@/boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  lancamento: string;
  quantidade: number;
  editora: string;
}

interface Editora {
  id: number;
  namePublisher: string;
}

type TipoOrdenacao = "desc" | "asc" | "az" | "za" | "nenhum";
const livros = ref<Livro[]>([]);
const editoras = ref<Editora[]>([]);
const search = ref("");
const isOpen = ref(false);
const carregando = ref(false);
const carregandoEditoras = ref(false);
const salvando = ref(false);

const ordenacao = ref<TipoOrdenacao>("nenhum");
const filtroLabel = computed(() => {
  switch (ordenacao.value) {
    case "desc":
      return "Mais quantidade";
    case "asc":
      return "Menos quantidade";
    case "az":
      return "Nome: A–Z";
    case "za":
      return "Nome: Z–A";
    default:
      return "Filtro";
  }
});

const form = reactive({
  title: "",
  isbn: "",
  genre: "",
  numberPages: null as number | null,
  quantity: null as number | null,
  publisherId: null as number | null
});

const livrosFiltrados = computed(() => {
  const termo = search.value.trim().toLocaleLowerCase("pt-BR");

  const resultado = livros.value.filter(livro =>
    livro.titulo.toLocaleLowerCase("pt-BR").includes(termo)
  );

  return resultado.sort((a, b) => {
    switch (ordenacao.value) {
      case "desc":
        return b.quantidade - a.quantidade;

      case "asc":
        return a.quantidade - b.quantidade;

      case "az":
        return a.titulo.localeCompare(b.titulo, "pt-BR", {
          sensitivity: "base"
        });

      case "za":
        return b.titulo.localeCompare(a.titulo, "pt-BR", {
          sensitivity: "base"
        });

      default:
        return 0;
    }
  });
});

function formatarData(data: string) {
  if (!data) return "—";

  const partes = data.split("-");

  if (partes.length !== 3) return data;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function abrirFormulario() {
  limparFormulario();
  isOpen.value = true;

  if (editoras.value.length === 0) {
    void carregarEditoras();
  }
}

function limparFormulario() {
  form.title = "";
  form.isbn = "";
  form.genre = "";
  form.numberPages = null;
  form.quantity = null;
  form.publisherId = null;
}

async function carregarLivros() {
  carregando.value = true;

  try {
    const response = await api.get("/books");
    const dados = response.data.content ?? response.data;

    if (!Array.isArray(dados)) {
      console.error(
        "Formato inesperado na resposta dos livros:",
        response.data
      );

      $q.notify({
        type: "negative",
        message: "O formato dos dados recebidos dos livros é inesperado."
      });

      return;
    }

    livros.value = dados.map((livro: any) => ({
      id: livro.id,
      titulo: livro.title ?? "—",
      autor: "—",
      lancamento: livro.publicationDate ?? "",
      quantidade: livro.quantity ?? 0,
      editora: livro.publisher?.namePublisher ?? livro.publisherName ?? "—"
    }));
  } catch (error: any) {
    console.error("Erro ao carregar os livros:", error.response?.data ?? error);

    $q.notify({
      type: "negative",
      message: "Não foi possível carregar os livros."
    });
  } finally {
    carregando.value = false;
  }
}

async function carregarEditoras() {
  carregandoEditoras.value = true;

  try {
    const response = await api.get("/publishers");
    const dados = response.data.content ?? response.data;

    if (!Array.isArray(dados)) {
      console.error(
        "Formato inesperado na resposta das editoras:",
        response.data
      );

      editoras.value = [];
      return;
    }

    editoras.value = dados.map((editora: any) => ({
      id: editora.id,
      namePublisher: editora.namePublisher
    }));
  } catch (error: any) {
    console.error(
      "Erro ao carregar as editoras:",
      error.response?.data ?? error
    );

    $q.notify({
      type: "negative",
      message: "Não foi possível carregar as editoras."
    });
  } finally {
    carregandoEditoras.value = false;
  }
}

async function onSubmit() {
  if (salvando.value) return;

  salvando.value = true;

  try {
    const payload = {
      title: form.title.trim(),
      isbn: form.isbn.trim(),
      genre: form.genre.trim(),
      numberPages: Number(form.numberPages),
      quantity: Number(form.quantity),
      publisherId: Number(form.publisherId)
    };

    await api.post("/books", payload);

    $q.notify({
      type: "positive",
      message: "Livro cadastrado com sucesso!"
    });

    isOpen.value = false;
    limparFormulario();

    await carregarLivros();
  } catch (error: any) {
    console.error("Erro ao cadastrar o livro:", error.response?.data ?? error);

    const mensagem =
      error.response?.data?.message ??
      "Não foi possível cadastrar o livro. Confira os dados e tente novamente.";

    $q.notify({
      type: "negative",
      message: mensagem,
      timeout: 5000
    });
  } finally {
    salvando.value = false;
  }
}

onMounted(async () => {
  await Promise.all([carregarLivros(), carregarEditoras()]);
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
