<template>
    <div class="container">
        <h1>All Chat Room</h1>
        <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text">ルーム名</span>
            </div>
            <input type="text" class="form-control" v-model="title" placeholder="ルーム名を入力してください"> 
        </div>
        <p>
            <button type="button" class="btn btn-primary" v-on:click="createChatRoom">Create</button>
        </p>
    </div>    
</template>

<script>
export default {
    data: function() {
        return {
            title: "",
        }
    },
    methods: {
        createChatRoom: function() {
            this.title = "";
        }
    }
}
</script>

