import Vue from 'vue'
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

import * as  Bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const app = new Vue({
    el: ".app"
})