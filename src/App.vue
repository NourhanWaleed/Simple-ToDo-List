<template>
<div class="container">
  <div class="row">
    <div class="col-12">
        <table class="table table-bordered mt-5">
          <thead>
            <tr>
              <th>TO DO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in todoList" :key="i">
              <td class="align-middle w=75">
                {{item.content}}
              </td>
              <td class="align-middle w=75">
                <button class="btn btn-info btn-sm mx-1" @click="handleEdit(item.id)">
                  Edit
                </button>
              </td>
              <td class="align-middle w=75">
                <button class="btn btn-info btn-sm mx-1" @click="handleDelete(item.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td class="align-middle text-center w=75">
              <div class="form-group">
                <label for="">{{
                  editMode? "Edit": "Add"
                }}</label>
               <input type="text" class="form-control" v-model="todoItem.content">
              </div>
            </td>
            <td class="align-middle text-center w=25">
              <button class="btn btn-primary btn-sm mx-1" @click="handleToDoItem">
                {{editMode? "Edit": "Add"}}
              </button>
            </td>
            <td class="align-middle w=75">
              <button v-if="editMode" 
              class="btn btn-info btn-sm mx-1" 
              @click="handleCancel">
                Cancel
              </button>
            </td>
          </tfoot>
        </table>

    </div>
  </div>
</div>
</template>

<script>

import Axios from "axios"
const todoUrl = "http://localhost:3500/todo"
export default {
    data(){
      return {
        todoList:[],
        todoItem: {},
        editMode: false
      }
    },
    methods:{
      handleEdit(id){
        this.editMode = true
        this.todoItem = this.todoList.find((item) => item.id ==id)
      },
      handleCancel(){
        this.editMode = false
        this.todoItem = ""
      },
      async handleDelete(id){
        await  Axios.delete(`${todoUrl}/${id}`)
        Axios.get(todoUrl).then(response => this.todoList = response.data)
      },
      async handleToDoItem(){
        const id = this.todoItem.id
        if(this.editMode){
          await  Axios.put(`${todoUrl}/${id}`, this.todoItem)
          this.editMode = false
          this.todoItem = ""
        } else{
          await  Axios.post(todoUrl, this.todoItem)
          this.todoItem.content = ""
         }
         Axios.get(todoUrl).then(response => this.todoList = response.data)
        
      }
    },
    created(){
      Axios.get(todoUrl).then(
        response => this.todoList = response.data
      )
    }
}
</script>

