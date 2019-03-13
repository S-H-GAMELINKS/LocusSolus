import { Controller } from "stimulus"
import store from '../../store/index'

const database = store.state.database;

export default class extends Controller {
    static get targets() {
        return ["title", "talks", "content"]
    }

    initialize() {
        this.update();
    }

    update() {
        const data = database.ref('locussolus' + String(location.pathname).replace(/\/chat/, ''));
        data.on("value", (snapshot) => {
            const locussolus = Object.entries(snapshot.val());

            this.talksTarget.innerHTML = "";
            for(var i = 0; i < locussolus.length; i++) {
                if (locussolus[i][0] === "title") {
                    this.titleTarget.innerHTML = `<h1>${locussolus[i][1]}</h1>`
                }
                if (locussolus[i][1].content !== undefined && locussolus[i][1].content !== "") {
                    this.talksTarget.innerHTML += `<div class="talk" data>${locussolus[i][1].content}</div>`;
                }
            }
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
        })
    }

    submit() {
        database.ref('locussolus' + String(location.pathname).replace(/\/chat/, '')).push({
            content: this.contentTarget.value,
        });
        this.contentTarget.value = "";
    }
}