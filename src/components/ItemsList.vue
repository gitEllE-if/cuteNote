<template>
  <v-container fluid>
    <v-row dense class="d-flex flex-wrap">
      <v-col v-for="item in items" :key="item.id">
        <NoteItem :item="item" />
      </v-col>
      <div v-if="!items.length">The list is empty</div>
      <v-dialog v-model="addNoteDialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="green" fab absolute bottom right dark v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card class="pa-4">
          <NoteForm />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import NoteItem from "../components/NoteItem.vue";
import NoteForm from "../components/NoteForm.vue";
export default {
  name: "ItemsList",
  data() {
    return {
      addNoteDialog: false,
    };
  },
  components: { NoteItem, NoteForm },
  computed: {
    ...mapGetters({ items: "getFilteredItems" }),
  },
};
</script>
