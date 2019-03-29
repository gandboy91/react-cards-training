import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap-css-only/css/bootstrap.min.css'
import App from './components/App'
import {getFromStorage} from "./helpers/storage"
import {STORAGE_KEY} from "./constants/storage"

const stateFromStorage = getFromStorage(STORAGE_KEY)
const props = stateFromStorage ? { stateFromStorage } : {}

ReactDOM.render(<App  {...props} />, document.getElementById('trainingApp'))
