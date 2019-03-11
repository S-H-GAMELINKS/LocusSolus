import Vue from 'vue';
import Vuex from 'vuex';
import FireBase from 'firebase';

Vue.use(Vuex);

const firebase = FireBase.initializeApp({
    apiKey: process.env.api_key,
    authDomain: process.env.auth_domain,
    databaseURL: process.env.database_url,
    projectId: process.env.project_id,
    storageBucket: process.env.storage_bucket,
    messagingSenderId: process.env.message_senderid
});

const database = firebase.database();

const store = new Vuex.Store({
    state: {
        firebase: firebase,
        database: database
    }
});

export default store;