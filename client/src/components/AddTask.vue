<template>
  <div>
    
    <div class="loadingModal">
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
              <form  class="form-register" id="register-form" >
                <br>
                <label for="inputEmail" >Title:</label>
                <input type="text" class="form-control" placeholder="Input Title" required="" autofocus="">
                <br>
                <label for="inputEmail">Description:</label>
                <input type="text" class="form-control" placeholder="Input Description" required="" autofocus="">
                <br>
                <label for="inputPassword">Category:</label>
                <input type="text" class="form-control" placeholder="Input Category" required="" style="margin-bottom: 3em;">
                <br>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      showModal:false,
    };
  }
}
</script>

<style scoped>
  .loadingModal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
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
