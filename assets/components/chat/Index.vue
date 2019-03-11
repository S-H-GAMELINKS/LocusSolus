<template>
    <div class="container">
        <h1>All Chat Room</h1>
        <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text">Rooma Name</span>
            </div>
            <input type="text" class="form-control" v-model="title" placeholder="Input New Chat Room Name..."> 
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
            rooms: [],
            title: "",
        }
    },
    methods: {
        createChatRoom: function() {
            this.title = "";
            this.rooms.lenght = 0;
            this.$store.state.database.ref('locussolus').push({
                title: this.title,
            });
        },
    }
}
</script>

