<template>
  <div class="task-container">
    <h2 class="title">Tambahkan Banyak Tugas</h2>
    <div v-for="(task, index) in newTasks" :key="index" class="task-input">
      <input v-model="task.title" placeholder="Masukin Tugas" class="task-input-field" />
      <button @click="removeTaskInput(index)" class="remove-btn">Hapus</button>
    </div>
    <button @click="addTaskInput" class="add-task-btn">Tambahkan</button>
    <button @click="submitTasks" class="submit-btn">Kirim</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTasks = ref([{ title: '' }]);

    const addTaskInput = () => {
      newTasks.value.push({ title: '' });
    };

    const removeTaskInput = (index) => {
      newTasks.value.splice(index, 1);
    };

    const submitTasks = () => {
      const tasks = newTasks.value.filter(task => task.title.trim());
      taskStore.addTasks(tasks);
      newTasks.value = [{ title: '' }];
    };

    return {
      newTasks,
      addTaskInput,
      removeTaskInput,
      submitTasks
    };
  }
};
</script>

<style scoped>

.task-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
}

.title {
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.task-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-input-field {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  font-size: 16px;
}

.task-input-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background: #c82333;
}

.add-task-btn, .submit-btn {
  background: hsl(204, 95%, 68%);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px; /* Mengubah tombol menjadi bulat */
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.add-task-btn:hover, .submit-btn:hover {
  background: hsl(204, 95%, 68%);
}
</style>
