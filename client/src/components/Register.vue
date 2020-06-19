<template>
  <div class="container">
    <div class="row">
      <div class="col-3 card" style="margin: 1em auto;">
        <form @submit.prevent="submitRegiter" class="form-register" id="register-form" >
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
        <button class="btn btn-lg btn-primary btn-block"> Login</button>
        <div class="text-center">
          <p > Do You have Google Account?</p>
        </div>
        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" style="width: auto;">Login With Google</div>
        <p class="mt-5 mb-3 text-muted">© amiruljbr 2020</p>
      </div>
    </div>
  </div>
</template>

<script>
const BaseUrl = 'http://localhost:3000';
export default {
  name: "Register",
  data() {
    return {
      registerUsername:"",
      registerEmail:"",
      registerPassword:"",
    };
  },
  methods: {
    submitRegiter(){
      console.log("proses register")
      console.log(this.data)
      axios({
        method: "post",
        url: BaseUrl + '/register',
        data: {
          username: this.registerUsername,
          email: this.registerEmail,
          password: this.registerPassword
        }
      })
      .then(response=>{
        console.log(response.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
