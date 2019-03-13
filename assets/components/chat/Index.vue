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
        <div v-for="(room, key, index) in rooms" :key="index">
            <router-link :to="{name: 'chatroom', params: {id: room.id}}">{{room.title}}</router-link>
        </div>
    </div>    
</template>

<script>
import store from '../../store/index';

export default {
    data: function() {
        return {
            rooms: [],
            title: "",
        }
    },
    mounted: function() {
        this.getChatRooms()
    },
    methods: {
        getChatRooms: function() {
            const data = store.state.database.ref('locussolus');
            data.on("value", (snapshot) => {
                const locussolus = Object.entries(snapshot.val());
                
                this.rooms.length = 0;
                for(var i = 0; i < locussolus.length; i++) {
                    this.rooms.push({id: locussolus[i][0], title: locussolus[i][1].title});
                }
                console.log(this.rooms);
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
            })
        },
        createChatRoom: function() {
            const id = this.rooms.length;
            this.rooms.length = 0;
            store.state.database.ref(`locussolus/${id}`).set({
                title: this.title,
            });
            this.title = "";
        },
    }
}
</script>

