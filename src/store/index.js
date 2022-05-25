import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { instance as api } from "../request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    priorityFilter: null,
  },
  mutations: {
    setNotes(state, newNotes) {
      state.items = newNotes;
    },
    addNote(state, newNote) {
      state.items = [...state.items, newNote];
    },
    delNote(state, idx) {
      state.items.splice(idx, 1);
    },
    setPriorityFilter(state, newFilter) {
      state.priorityFilter = newFilter;
    },
  },
  actions: {
    async getNotes({ commit }) {
      try {
        const res = await api.get("/notes");
        const { result, status } = res.data;
        if (status == "ok") {
          commit("setNotes", result);
          return result;
        }
        return null;
      } catch (err) {
        console.log(`==> get notes failure ` + err);
        return null;
      }
    },
    async addNote({ commit }, newNote) {
      try {
        const res = await api.post("/note/", newNote);
        const { status, result } = res.data;
        if (status == "ok") {
          newNote = { ...newNote, id: result };
          commit("addNote", newNote);
        }
      } catch (err) {
        console.log(`==> add note failure ` + err);
        return null;
      }
    },
    async delNote({ commit }, id) {
      try {
        const res = await api.delete("/note/" + id);
        const { status } = res.data;
        if (status == "ok") {
          const idx = this.state.items.findIndex((el) => el.id === id);
          if (idx !== -1) {
            commit("delNote", idx);
          }
        }
      } catch (err) {
        console.log("==> delete note failure " + err);
      }
    },
    async updateNote({ commit }, payload) {
      try {
        const { id } = payload;
        delete payload.id;
        const res = await api.put("/note/" + id, payload);
        const { status } = res.data;
        if (status == "ok") {
          const newNotes = this.state.items.map((el) => {
            if (el.id === id) {
              return { ...payload, id: id };
            }
            return el;
          });
          commit("setNotes", newNotes);
        }
      } catch (err) {
        console.log("==> change note failure " + err);
      }
    },
    async setPriority({ commit }, payload) {
      try {
        const { id, priority } = payload;
        const res = await api.patch("/note/" + id, { priority });
        const { status } = res.data;
        if (status == "ok") {
          const newNotes = this.state.items.map((el) => {
            if (el.id === id) {
              return { ...el, priority: priority };
            }
            return el;
          });
          commit("setNotes", newNotes);
        }
      } catch (err) {
        console.log("==> change priority failure " + err);
      }
    },
    setPriorityFilter({ commit }, filter) {
      try {
        commit("setPriorityFilter", filter);
      } catch (err) {
        console.log("==> change priority filter failure " + err);
      }
    },
  },
  getters: {
    getFilteredItems: (state) => {
      return state.items.filter((el) => {
        return state.priorityFilter === null
          ? true
          : el.priority == state.priorityFilter;
      });
    },
  },
  modules: {},
  plugins: [new VuexPersistence().plugin],
});
