<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">Kanban</span>
      <div v-if="isLogin" class="navbar-brand mb-0">Welcome, {{currentUser}}</div>
      <button v-if="isLogin" @click="toLogout" class="btn btn-danger my-2 my-sm-0" type="button">Logout</button>
    </nav>

    <div v-if="!isLogin">
      <!-- <Login v-if="loginPage"></Login> -->
      
      <div v-if="loginPage" class="container text-center">
        <div class="row">
          <div class="col-3 card" style="margin: 1em auto;">
            <div   class="form-signin" id="login-form">
              <img class="mb-4" src="https://2.bp.blogspot.com/-2TZJ3M9sSx4/Vs7gZnFNwgI/AAAAAAAABUM/v3R88LMR0Zc/s1600/login.png" alt="" width="100" height="72">
              <h6 class="h3 mb-3 font-weight-normal">Please sign in</h6>
              <label for="inputEmail" class="sr-only">Username / Email address</label>
              <input v-model="loginEmail" type="username" id="inputLoginEmail" class="form-control" placeholder="Username / Email address" required="" autofocus="">
              <label for="inputPassword" class="sr-only">Password</label>
              <input v-model="loginPassword" type="password" id="inputLoginPassword" class="form-control" placeholder="Password" required="">
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me"> Remember me
                </label>
              </div>
              <button @click="submitLogin" class="btn btn-lg btn-primary btn-block">Sign in</button>
              
            </div>
            <p class="text-center">
              OR
            </p>
            <button @click="changeToRegister" class="btn btn-lg btn-primary btn-block">Register</button>
            <div class="text-center">
              <p> Do You have Google Account?</p>
            </div>
            <GoogleLogin :params="params" :onSuccess="onSignIn" :onFailure="onFailure">Login</GoogleLogin>
            <!-- <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" style="width: auto;">Login With Google</div> -->
            <p class="mt-5 mb-3 text-muted">© amiruljbr 2020</p>
          </div>
        </div>
      </div>

      <!-- <Register v-if="!loginPage"></Register> -->
      <div v-if="!loginPage" class="container">
        <div class="row">
          <div class="col-3 card" style="margin: 1em auto;">
            <form @submit.prevent="submitRegister" class="form-register" id="register-form" >
              <h2 class="text-center">Register</h2>
              <br>
              <label for="inputEmail" >Username:</label>
              <input v-model="registerUsername" type="username" id="registerEmail" class="form-control" placeholder="Username" required="" autofocus="">
              <br>
              <label for="inputEmail">Email:</label>
              <input v-model="registerEmail" type="username" id="ReginputLoginEmail" class="form-control" placeholder="Email" required="" autofocus="">
              <br>
              <label for="inputPassword">Password:</label>
              <input v-model="registerPassword" type="password" id="ReginputLoginPassword" class="form-control" placeholder="Password" required="" style="margin-bottom: 3em;">
              <br>
              <button  class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
            <p class="text-center">
              OR
            </p>
            <button  @click="changeToRegister" class="btn btn-lg btn-primary btn-block"> Login</button>
            <p class="mt-5 mb-3 text-muted">© amiruljbr 2020</p>
          </div>
        </div>
      </div>
    </div>
      
    
    <!-- <AddTask v-if="showModal"></AddTask> -->
    <div v-if="showModal" class="loadingModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" @click="showModal = !showModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form  @submit.prevent="submitAddTask" class="form-register" >
                <br>
                <label>Title:</label>
                <input v-model="inputTitle" type="text" class="form-control" placeholder="Input Title" required="" autofocus="">
                <br>
                <label>Description:</label>
                <input v-model="inputDescription" type="text" class="form-control" placeholder="Input Description" required="" autofocus="">
                <br>
                <label>Category:</label> <br>
                <select class="form-control" v-model="inputCategory" name="cars" id="cars">
                  <option value="Backlog">Backlog</option>
                  <option value="Todo">Todo</option>
                  <option value="Done">Done</option>
                  <option value="Completed">Completed</option>
                </select>
                <!-- <input v-model="inputCategory" type="text" class="form-control" placeholder="Input Category" required="" style="margin-bottom: 3em;"> -->
                <br>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModal = !showModal">Cancel</button>
                  <button type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div v-if="isLogin" class="container">
      <div class="row">
        <button v-if="isLogin" type="button" class="col m-1 btn btn-primary" @click="showModal = !showModal">
        Add Task
        </button>
      </div>
      <div class="row" >
        <TaskHolder @emitSuksesDelete="getAllTask" v-bind:titleHolder="'Backlog'" v-bind:taskList="dataBacklog">
        </TaskHolder>

        <TaskHolder @emitSuksesDelete="getAllTask" v-bind:titleHolder="'Todo'" v-bind:taskList="dataTodo">
        </TaskHolder>

        <TaskHolder @emitSuksesDelete="getAllTask" v-bind:titleHolder="'Done'" v-bind:taskList="dataDone">
        </TaskHolder>

        <TaskHolder @emitSuksesDelete="getAllTask" v-bind:titleHolder="'Completed'" v-bind:taskList="dataCompleted">
        </TaskHolder>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import AddTask from "./components/AddTask.vue"
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import TaskHolder from "./components/TaskHolder.vue"
import GoogleLogin from "vue-google-login"

export default {
  data() {
    return {
      showModal: false,
      isLogin: true,
      loginPage: true,
      dataTasks: [],
      loginEmail:"",
      loginPassword:"",
      inputTitle: "",
      inputDescription: "",
      inputCategory: "Backlog",
      registerUsername:"",
      registerEmail:"",
      registerPassword:"",
      currentUser: localStorage.currentUser,
      params: {
          client_id: "21114092654-2m1l0gtuertpmraoitrlhuhjov1afok1.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      }
    };
  },
  computed: {
    dataBacklog(){
      let data = [];
      for (let i in this.dataTasks){
        if (this.dataTasks[i].category=='Backlog'){
          data.push(this.dataTasks[i])
        }
      }
      return data;
    },
    dataTodo(){
      let data = [];
      for (let i in this.dataTasks){
        if (this.dataTasks[i].category=='Todo'){
          data.push(this.dataTasks[i])
        }
      }
      return data;
    },
    dataDone(){
      let data = [];
      for (let i in this.dataTasks){
        if (this.dataTasks[i].category=='Done'){
          data.push(this.dataTasks[i])
        }
      }
      return data;
    },
    dataCompleted(){
      let data = [];
      for (let i in this.dataTasks){
        if (this.dataTasks[i].category=='Completed'){
          data.push(this.dataTasks[i])
        }
      }
      return data;
    }
  },
  created() {
    this.auth()
  },
  components: {
    AddTask,
    Login,
    Register,
    TaskHolder,
    GoogleLogin
  },
  methods: {
    auth(){
      this.getAllTask();
      console.log('cek login')
      if(localStorage.length>0){
        this.isLogin=true
      } else {
        this.isLogin=false
      }
    },
    changeToRegister(){
      this.loginPage=!this.loginPage;
    },
    toLogout(){
      // let auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      // });
      localStorage.clear()
      this.auth()
    },
    getAllTask(){
      this.dataTasks = [];
      Axios({
        method: 'get',
        url: 'http://localhost:3000/tasks',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response=>{
        for (let i in response.data){
          this.dataTasks.push(response.data[i])
        }
      })
      .catch(console.log)
    },
    submitLogin(){
      console.log("proses login")
      console.log(this.loginEmail)
      console.log(this.loginPassword)
      Axios({
        method: "post",
        url: 'http://localhost:3000/login',
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
      .then(response=>{
        console.log(response.data)
        localStorage.setItem('access_token',response.data.access_token)
        localStorage.setItem('currentUser',response.data.currentUser.username)
        localStorage.setItem('currentEmail',response.data.currentUser.email)
        
        this.auth()
        this.currentUser=response.data.currentUser.username;
        this.loginEmail=""
        this.loginPassword=""
      })
      .catch(err=>{
        console.log(err)
        console.log('tidak jalan')
      })
    },

    submitRegister(){
      console.log("proses register")
      Axios({
        method: "post",
        url: 'http://localhost:3000/register',
        data: {
          username: this.registerUsername,
          email: this.registerEmail,
          password: this.registerPassword
        }
      })
      .then(response=>{
        console.log(response.data)
        this.auth()
        this.registerUsername=""
        this.registerEmail=""
        this.registerPassword=""
        this.loginPage= true
      })
      .catch(err=>{
        console.log('gagal register')
      })
    },

    submitAddTask(){
      console.log("proses add Task")
      console.log(this.inputTitle)
      console.log(this.inputDescription)
      console.log(this.inputCategory)
      Axios({
        method: "post",
        url: 'http://localhost:3000/tasks',
        data: {
          title: this.inputTitle,
          description: this.inputDescription,
          category: this.inputCategory
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response=>{
        console.log(response.data)
        this.showModal=false
        this.inputTitle= "",
        this.inputDescription="",
        this.inputCategory= "Backlog",
        this.auth();
        
      })
      .catch(err=>{
        console.log(err)
        console.log('tidak jalan')
      })
    },

    onSignIn (googleUser){
      let {id_token} = googleUser.wc;
      Axios ({
        method: 'post',
        url: `http://localhost:3000/google-sign-in`,
        data: {
          id_token
        }
      })
      .then(response => {
        console.log('Sukses Login Google', response.data)
        localStorage.setItem('access_token',response.data.access_token)
        localStorage.setItem('currentUser',response.data.currentUser.username)
        localStorage.setItem('currentEmail',response.data.currentUser.email)
        this.auth()
      })
      .catch( err => {
        console.log(err)
        console.log('Gagal Login Google')
      })
    },

    onSuccess(){

    },

    onFailure(){

    }
  }

};
</script>

<style>
  .list-task {
  background-color: rgba(188, 203, 206, 0.63);
  margin: 1em auto;
  }

  body {
    background-color: rgb(37, 55, 56);
  }

  .loadingModal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1
    /*display: none;*/
  }
​
  .theModal {
    position: absolute;
    top: 20%;
    left: 50%;
    -webkit-transition: .5s;
    transition: .5s;
    width: 100%;
    min-width: 600px;
    max-width: 800px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    padding: 1em;
    color: black;
    text-align: center;
  }
</style>