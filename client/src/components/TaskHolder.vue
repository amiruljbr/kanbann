<template>
  <div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{titleHolder}}</h5>
        <div class="items border border-light">
          <Task @emitSuksesDelete="suksesDelete" v-for="task in taskList" v-bind:key="task.id" v-bind:taskDetail="task"> </Task>
                    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "TaskHolder",
  data() {
    return {
      showModal:false,
    };
  },
  props: ['titleHolder','taskList'],
  components: {
    Task
  },
  methods:{
    suksesDelete(){
      this.$emit('emitSuksesDelete')
    }
  }
}
</script>

<style scoped>
</style>