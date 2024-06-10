<template>
  <div class="task-list-container">
    <h2 class="title">Daftar Tugas</h2>
    <p class="task-info">Tugas Tidak Selesai: {{ incompleteTasksCount }}</p>
    <p class="task-info">Tugas Selesai: {{ completedTasksCount }}</p>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <input type="checkbox" v-model="task.completed" class="task-checkbox" />
        <span :class="{ completed: task.completed }" class="task-title">
          {{ task.title }}
        </span>
        <div v-if="task.completed" class="task-submitted">
          Tugas di-submit {{ task.submittedDate }}
        </div>
        <div v-else class="task-deadline">
          <span v-if="task.deadline">{{ getDeadlineInfo(task.deadline) }}</span>
          <span v-else>Tidak ada deadline</span>
        </div>
      </li>
    </ul>
    <button @click="removeSelectedTasks" class="delete-btn">Hapus</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

export default {
  setup() {
    const taskStore = useTaskStore();
    const tasks = computed(() => taskStore.tasks);

    const incompleteTasksCount = computed(() => tasks.value.filter(task => !task.completed).length);
    const completedTasksCount = computed(() => tasks.value.filter(task => task.completed).length);

    const removeSelectedTasks = () => {
      const selectedTaskIds = tasks.value
        .filter(task => task.completed)
        .map(task => task.id);
      taskStore.removeTasks(selectedTaskIds);
    };

    const getDeadlineInfo = (deadline) => {
      const today = new Date();
      const dueDate = new Date(deadline);
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff < 0) {
        return `Deadline lewat ${Math.abs(daysDiff)} hari yang lalu`;
      } else if (daysDiff === 0) {
        return 'Deadline hari ini';
      } else {
        return `Deadline dalam ${daysDiff} hari`;
      }
    };

    return {
      tasks,
      incompleteTasksCount,
      completedTasksCount,
      removeSelectedTasks,
      getDeadlineInfo
    };
  }
};
</script>

<style scoped>
.task-list-container {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
}

.title {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.task-info {
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 10px;
  text-align: center;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.task-item:hover {
  background: #f1f3f5;
}

.task-checkbox {
  margin-right: 10px;
  cursor: pointer;
}

.task-title {
  flex: 1;
  font-size: 18px;
}

.task-title.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px; /* Mengubah tombol menjadi bulat */
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background: #c82333;
}
</style>
