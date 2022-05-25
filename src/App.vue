<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list dense nav>
        <v-list-item link @click="setPriorityFilter(null)">
          <v-list-item-icon>
            <v-icon>mdi-animation</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>All Notes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-divider></v-divider>
        </v-list-item>
        <v-list-item>Priority:</v-list-item>
        <v-list-item
          v-for="priority in PRIORITY_ARR"
          :key="priority.value"
          link
          @click="setPriorityFilter(priority.value)"
        >
          <v-list-item-icon>
            <v-icon :color="priority.color">mdi-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ priority.fullText }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app height="72">
      <v-toolbar-title>Cute Note</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="setPriorityFilter(null)">
            <v-list-item-icon>
              <v-icon>mdi-animation</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>All Notes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="priority in PRIORITY_ARR"
            :key="priority.value"
            @click="setPriorityFilter(priority.value)"
          >
            <v-list-item-icon>
              <v-icon :color="priority.color">mdi-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ priority.fullText }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer app padless fixed>
      <v-col class="text-center green--text" cols="12">
        {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { PRIORITY_ARR } from "./constants";
export default {
  name: "App",
  data: () => ({}),
  created() {
    this.PRIORITY_ARR = PRIORITY_ARR;
  },
  mounted() {
    this.$store.dispatch("getNotes");
    this.$store.dispatch("setPriorityFilter", null);
  },
  methods: {
    setPriorityFilter(priority) {
      this.$store.dispatch("setPriorityFilter", priority);
    },
  },
};
</script>
