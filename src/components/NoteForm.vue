<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="title" rules="required">
        <v-text-field
          v-model="title"
          prepend-icon="mdi-pencil"
          :error-messages="errors"
          label="Title"
          color="green"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="text" rules="required">
        <v-textarea
          v-model="text"
          prepend-icon="mdi-pencil"
          auto-grow
          rows="1"
          :error-messages="errors"
          label="Text"
          color="green"
          required
        ></v-textarea>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="date" rules="required">
        <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :error-messages="errors"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
              color="green"
            ></v-text-field>
          </template>
          <v-date-picker
            color="green"
            v-model="date"
            @input="menuDate = false"
          ></v-date-picker>
        </v-menu>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="color" rules="required">
        <v-menu
          v-model="menuColor"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :error-messages="errors"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="color"
              prepend-icon="mdi-brush"
              readonly
              v-on="on"
              color="green"
            ></v-text-field>
          </template>
          <v-color-picker
            color="green"
            v-model="color"
            dot-size="22"
            hide-mode-switch
            mode="hexa"
          >
          </v-color-picker>
        </v-menu>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="select" rules="required">
        <v-select
          v-model="priority"
          prepend-icon="mdi-form-select"
          :items="priorities"
          item-text="text"
          item-value="value"
          :error-messages="errors"
          label="Priority"
          data-vv-name="select"
          color="green"
          required
        ></v-select>
      </validation-provider>

      <v-btn class="mr-4" type="submit" :disabled="invalid" green depressed>
        submit
      </v-btn>
      <v-btn @click="clear" green depressed> clear </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { PRIORITY } from "../constants";
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      menuDate: false,
      menuColor: false,
      id: "",
      date: new Date().toISOString().substring(0, 10),
      title: "",
      text: "",
      img: "",
      color: null,
      priority: null,
      select: null,
      priorities: [],
    };
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  created() {
    this.priorities = Object.values(PRIORITY);
  },
  mounted() {
    const { id, title, text, date, img, color, priority } = this.item;
    this.date = date
      ? date.substring(0, 10)
      : new Date().toISOString().substring(0, 10);
    this.title = title ? title : "";
    this.text = text ? text : "";
    this.color = color ? color : "#ffffff";
    this.img = img ? img : "";
    this.id = id ? id : "";
    if (
      !this.id &&
      this.title &&
      this.text &&
      this.color &&
      this.date &&
      !isNaN(priority)
    ) {
      this.apply();
    }
  },
  methods: {
    apply() {
      const { id, title, text, date, img, color, priority } = this;
      if (title && text && date && color && !isNaN(priority)) {
        if (id) {
          this.$store.dispatch("updateNote", {
            id,
            title,
            text,
            img,
            date,
            color,
            priority,
          });
        } else {
          this.$store.dispatch("addNote", {
            title,
            text,
            img,
            date,
            color,
            priority,
          });
        }
      }
    },
    submit() {
      this.$refs.observer.validate().then(() => this.apply());
    },
    clear() {
      this.title = "";
      this.text = "";
      this.color = "";
      this.priority = "";
      this.select = null;
      this.$refs.observer.reset();
    },
  },
};
</script>
