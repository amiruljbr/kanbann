<template>
  <div class="card-body p-2 list-task">
    <div class="card-title">
      <img src="//placehold.it/30" class="rounded-circle float-right">
      <div>ID-{{taskDetail.id}} {{taskDetail.title}}</div>
    </div>
    <p>
        {{taskDetail.description}}
        
    </p>
    <div style="font-size:8px">
      {{taskDetail.Username}} , at {{dateTask}}
    </div>
    <button type="button" class="btn btn-secondary btn-sm" @click="showModalView = !showModalView">
        View
    </button>
    <button v-if="showEditDelete" type="button" class="btn btn-primary btn-sm" @click="showModalTask = !showModalTask">
        Action
    </button>
    <button v-if="showEditDelete" type="button" class="btn btn-danger btn-sm" @click="showModalDelete = !showModalDelete">
        Delete
    </button>
    <!-- <AddTask v-if="showModal"></AddTask> -->
    <div v-if="showModalTask" class="loadingModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Update Task ID-{{taskDetail.id}}</h5>
              <button type="button" class="close" @click="showModalTask = !showModalTask">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form  @submit.prevent="editTask" class="form-register" >
                <br>
                <label>Title:</label>
                <input v-model="inputTitle1" type="text" class="form-control" placeholder="Input Title" required="" autofocus="">
                <br>
                <label>Description:</label>
                <input v-model="inputDescription1" type="text" class="form-control" placeholder="Input Description" required="" autofocus="">
                <br>
                <label>Category:</label>
                <select v-model="inputCategory1" name="cars" id="cars">
                  <option value="Backlog">Backlog</option>
                  <option value="Todo">Todo</option>
                  <option value="Done">Done</option>
                  <option value="Completed">Completed</option>
                </select>
                <br>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModalTask = !showModalTask">Cancel</button>
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModalDelete" class="loadingModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Task ID-{{taskDetail.id}}</h5>
              <button type="button" class="close" @click="showModalDelete = !showModalDelete">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-register" >
                Are You Sure Want to Delete This Task?
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModalDelete = !showModalDelete">Cancel</button>
                  <button type="button" @click="deleteTask" class="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModalView" class="loadingModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Detail Task ID-{{taskDetail.id}}</h5>
              <button type="button" class="close" @click="showModalView = !showModalView">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table" border="1">
                <tr>
                  <td>Title</td>
                  <td>{{inputTitle1}}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{{inputDescription1}}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{{taskDetail.category}}</td>
                </tr>
                <tr>
                  <td>Created By</td>
                  <td>{{taskDetail.Username}}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{{dateTask}}</td>
                </tr>
              </table>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showModalView = !showModalView">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import Vue from 'vue';

export default {
  name: "Task",
  data() {
    return {
      showModalTask:false,
      showModalDelete:false,
      showModalView:false,
      inputTitle1:this.taskDetail.title,
      inputDescription1:this.taskDetail.description,
      inputCategory1:this.taskDetail.category,
      dateTask: new Date(this.taskDetail.createdAt).toString().substr(0, 21),
      showEditDelete: true
    };
  },
  props: ['taskDetail'],
  created() {
    if(this.taskDetail.UserEmail != localStorage.currentEmail){
      this.showEditDelete=false;
    }
  },
  calculated:{
    
  },
  methods: {
    deleteTask(){
      Axios({
        method: 'delete',
        url: 'https://baj-kanban.herokuapp.com/tasks/' + this.taskDetail.id,
        headers : {
          access_token:localStorage.access_token
        }
      })
      .then(response=>{
        console.log('data terdelete')
        this.showModalDelete=false
        this.$emit('emitSuksesDelete')
      })
      .then(err=>{
        console.log('you are not autorized')
      })
    },

    editTask(){
      Axios({
        method: "put",
        url: 'https://baj-kanban.herokuapp.com/tasks/' + this.taskDetail.id,
        data: {
          title: this.inputTitle1,
          description: this.inputDescription1,
          category: this.inputCategory1
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response=>{
        console.log(response.data)
        this.showModalTask=false 
        this.$emit('emitSuksesDelete')       
      })
      .catch(err=>{
        console.log('not authorized')
      })
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 12px;
  }
</style>