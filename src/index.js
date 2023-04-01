import React from 'react';
import axios from "axios";
import registerServiceWorker from "./core/sw/registerSW";
import {createRoot} from 'react-dom/client';
import './assets/styles/Global.scss';
import {api_config} from "./config";
import 'mapbox-gl/dist/mapbox-gl.css';
import Wrapper from "./main/Wrapper";

axios.defaults.baseURL = api_config.host;
axios.defaults.headers.common['Accept'] = 'application/json';

const root = createRoot(document.getElementById('wrapper'));
root.render(
    <React.StrictMode>
        <Wrapper/>
    </React.StrictMode>
);

registerServiceWorker();
