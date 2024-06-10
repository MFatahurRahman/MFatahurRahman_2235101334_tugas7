// stores/taskStore.js atau stores/taskStore.ts
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'Tugas 1', completed: false },
      { id: 2, title: 'Tugas 2', completed: true },
      { id: 3, title: 'Tugas 3', completed: false }
    ]
  }),
  getters: {
    incompleteTasksCount(state) {
      // Menghitung jumlah tugas yang belum selesai
      return state.tasks.filter(task => !task.completed).length;
    }
  },
  actions: {
    addTasks(newTasks) {
      newTasks.forEach(task => {
        const newTask = {
          id: this.tasks.length + 1,
          title: task.title,
          completed: false
        };
        this.tasks.push(newTask);
      });
    },
    removeTasks(ids) {
      this.tasks = this.tasks.filter(task => !ids.includes(task.id));
    }
  }
});
