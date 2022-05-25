<template>
  <v-badge
    bordered
    overlap
    :color="PRIORITY[item.priority].color"
    :content="PRIORITY[item.priority].text"
    :value="item.priority"
  >
    <v-hover v-slot="{ hover }">
      <v-card :color="item.color" :elevation="hover ? 8 : 2" class="mb-16">
        <div class="d-flex justify-space-between">
          <div>
            <v-card-title>
              <span class="text-title">{{ item.title }}</span>
              <v-spacer></v-spacer>
              <v-menu right bottom close-on-click>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on.stop="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-dialog v-model="addNoteDialog" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <v-card class="pa-4">
                        <NoteForm :item="item" />
                      </v-card>
                    </v-dialog>
                  </v-list-item>
                  <v-list-item>
                    <v-btn icon @click="deleteNote(item.id)">
                      <v-icon>mdi-delete-forever</v-icon>
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-subtitle class="grey--text text-subtitle-2">
              {{ item.date.substring(0, 10) }}
            </v-card-subtitle>
            <v-card-text>
              {{ item.text }}
            </v-card-text>
            <v-divider></v-divider>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-card-actions v-on="on">
                  <v-spacer></v-spacer>
                  <v-btn
                    depressed
                    outlined
                    color="pink lighten-2"
                    x-small
                    @click="setPriority(item.id, 3)"
                  >
                    high
                  </v-btn>
                  <v-btn
                    depressed
                    outlined
                    color="orange lighten-2"
                    x-small
                    @click="setPriority(item.id, 2)"
                  >
                    med
                  </v-btn>
                  <v-btn
                    depressed
                    outlined
                    color="blue lighten-2"
                    x-small
                    @click="setPriority(item.id, 1)"
                  >
                    low
                  </v-btn>
                  <v-btn
                    depressed
                    outlined
                    color="gray lighten-2"
                    x-small
                    @click="setPriority(item.id, 0)"
                  >
                    none
                  </v-btn>
                </v-card-actions>
              </template>
              <span>set the priority of note</span>
            </v-tooltip>
          </div>
          <v-img v-if="item.img" :src="item.img"></v-img>
        </div>
      </v-card>
    </v-hover>
  </v-badge>
</template>

<script>
import { PRIORITY } from "../constants";
import NoteForm from "./NoteForm.vue";
export default {
  name: "NoteItem",
  data() {
    return {
      addNoteDialog: false,
    };
  },
  components: { NoteForm },
  props: {
    item: { type: Object, default: () => ({}) },
  },
  created() {
    this.PRIORITY = PRIORITY;
  },
  methods: {
    setPriority(id, priority) {
      this.$store.dispatch("setPriority", { id, priority });
    },
    deleteNote(id) {
      this.$store.dispatch("delNote", id);
    },
  },
};
</script>
