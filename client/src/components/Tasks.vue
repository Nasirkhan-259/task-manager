<template>
  <div class="container">
    <h1 class="heading">To do App</h1>
    <div class="input-container">
      <input type="text" name="text" v-model="text" class="input-type-text-field" placeholder="What needs to be done?"  v-on:keyup.enter="createTask()">
      <button class="add_button" v-on:click="createTask()">Add</button>
    </div>
    
    
    <div :v-if="error !=''"><p class="error">{{error}}</p></div>
    <div class="posts-container">
      <div class="post"
      v-for="(post , index) in posts"
      v-bind:key="index"
      
      >
        <p class="text">{{post.title}}</p>
        <button class="remove_button" v-on:click="deleteTask(post._id)">Remove</button>
        
      </div>
    </div>
  </div>
  
</template>

<script>
import TaskService from '../TaskService'
export default {
  name: 'HelloWorld',
  data(){
    return{
      posts : [],
      text : '',
      error : ''
    }
  },
  async created(){
    try {
      this.posts = await TaskService.getTasks();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods : {
    async createTask(){
      if(this.text==''){
        return this.error = 'Input field cannot be empty!'
      }
      await TaskService.insertTask(this.text);
      this.posts = await TaskService.getTasks();
      this.text = '';
    },
    async deleteTask(id){
      await TaskService.deleteTask(id);
      this.posts = await TaskService.getTasks();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container,div.input-container {
  max-width: 400px;
  margin: 0 auto;
}
input.input-type-text-field {
    max-width: 400px;
    min-width: 343px;
    height: 31px;
    border-radius: 2px;
}
button.add_button {
    background: #58bec3;
    font-size: 13px;
    color: #fff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
padding: 9px 9px 9px 12px;
}

.error {
  padding:  10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
border: 1px solid #c1c9cc;
    background-color: #d9e2e2;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-weight: 700;
}
</style>
