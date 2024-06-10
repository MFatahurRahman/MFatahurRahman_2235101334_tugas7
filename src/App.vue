<template>
  <div id="app">
    <TaskForm />
    <TaskList />
  </div>
</template>

<script>
import TaskForm from './views/TaskForm.vue';
import TaskList from './views/TaskList.vue';

export default {
  components: {
    TaskForm,
    TaskList
  }
};
</script>
