<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="bi-list"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> BIBLIOTECH </q-toolbar-title>

        <!-- Menu do Usuário no Canto Superior Direito -->
        <q-btn flat round icon="account_circle" size="md">
          <q-menu auto-close class="q-pa-xs">
            <q-list style="min-width: 200px">
              <!-- Informações básicas do usuário -->
              <q-item class="q-pb-sm">
                <q-item-section avatar>
                  <q-avatar
                    color="primary"
                    text-color="white"
                    icon="bi-person-circle"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold">Usuário</q-item-label>
                  <q-item-label caption>usuario@gmail.com</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <!-- Link para o Perfil -->
              <q-item clickable to="/profile">
                <q-item-section avatar>
                  <q-icon name="bi-person-circle" />
                </q-item-section>
                <q-item-section>Meu Perfil</q-item-section>
              </q-item>

              <q-separator />

              <!-- Botão de Sair -->
              <q-item clickable to="/login" class="text-negative">
                <q-item-section avatar>
                  <q-icon name="bi-box-arrow-right" color="negative" />
                </q-item-section>
                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Menu Lateral (Drawer) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color: #420f0f"
    >
      <q-list>
        <q-item-label header class="text-grey-8"></q-item-label>

        <!-- Mapeamento dos links para as páginas -->
        <q-item
          v-for="link in navLinks"
          :key="link.title"
          clickable
          v-ripple
          :to="link.to"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- ÁREA ONDE AS PÁGINAS APARECEM -->
    <q-page-container style="background-color: #c89f7a">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Interface para tipar os links no TypeScript
interface NavLink {
  title: string;
  icon: string;
  to: string;
}

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const navLinks: NavLink[] = [
  { title: "Início", icon: "bi-house-fill", to: "/" },
  { title: "Dashboard", icon: "bi-grid-1x2-fill", to: "/dashboard" },
  { title: "Livros", icon: "bi-book-half", to: "/books" },
  { title: "Empréstimos", icon: "bi-cash-stack", to: "/rents" },
  { title: "Editoras", icon: "bi-collection-fill", to: "/publishers" },
  { title: "Usuários", icon: "bi-people-fill", to: "/users" },
  { title: "Configurações", icon: "bi-gear-fill", to: "/settings" }
];
</script>

<style lang="scss" scoped>
.icon {
  color: $icon-color;
}
</style>
