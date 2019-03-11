<template>
<div>
    <h1>{{title}}</h1>
    <div class="input-group">
        <div class="input-group-append">
            <span class="input-group-text">Input your tlak</span>
        </div>
        <input type="text" class="form-control" v-model="content"> 
    </div>
    <p>
        <button type="button" class="btn btn-primary" v-on:click="createTalk">Submit</button>
    </p>
    <div class="talk-box" v-for="(talk, key, index) in talks" :key="index">
        <div class="talk-area">
            <div class="talk" v-if='talk.content != ""'> 
                {{talk.content}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            title: "",
            talks: [],
            content: "",
        }
    },
    mounted: function() {
        this.getTalks();
        this.userLogin();
    },
    methods: {
        getTalks: function() {
            const data = this.$store.state.database.ref('locussolus' + String(this.$route.path).replace(/\/chat/, ''));
            data.on("value", (snapshot) => {
                const locussolus = Object.entries(snapshot.val());
                console.log(locussolus);
                this.title = locussolus[locussolus.length - 1][1];
                this.talks.length = 0;
                for(var i = 0; i < locussolus.length - 1; i++) {
                    this.talks.push({content: locussolus[i][1].content});
                }
                this.talks.reverse();
                console.log(this.talks);
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
            })
            console.log(this.talks)
        },
        createTalk: function() {
            this.talks.length = 0;
            this.$store.state.database.ref('locussolus' + String(this.$route.path).replace(/\/chat/, '')).push({
                content: this.content,
            });
            this.content = "";
        }
    }
}
</script>

<style>
.talk-box {
    width: 100%;
    height: auto;
    overflow: hidden; /*floatの解除*/
    margin-bottom: 20px;
}

.talk-area {
    width: 100%;
    float: right;
}

.talk {
    width: 80%;
    display: inline-block;
    padding: 15px 20px;
    margin-left: 120px;
    margin-top: 10px;
    border: 1px solid gray;
    border-radius: 10px;
}
</style>