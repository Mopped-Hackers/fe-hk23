import React, {useEffect, useRef, useState} from 'react';
import {ToastContainer, toast} from "react-toastify";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import DataProvider, {useDataProvider} from "../core/providers/DataProvider";
import NotFoundView from "./views/NotFoundView";
import {notifyUpdatedPWA} from "../core/sw/registerSW";
import {version} from "../config";
import {routes} from "./routes";
import HomeView from "./views/HomeView";
import {System} from "../core/providers/System";
import VoteView from "./views/VoteView";
import axios from "axios";
import NewView from "./views/NewView";

function Wrapper() {

    const main_container = useRef();


    const {score} = useDataProvider();

    useEffect(() => {

        notifyUpdatedPWA(() => {
            toast.info(`Aktualizované na verziu ${version}`);
        });



    }, []);


    return (
        <>
            <div style={{position:"fixed", top: 20,left:20,fontSize:40,zIndex:1000, padding:10, borderRadius: 10,backgroundColor: "white",color: score>50 ? "green" : "orange", fontWeight: "bold"}}>
                {score}%
            </div>

            <ToastContainer
                position={"top-right"}
                autoClose={3500}
                newestOnTop
                pauseOnFocusLoss={false}
                theme={"colored"}
            />
                <Router>
                    <System>
                        <main role="main" ref={main_container}>
                            <Routes>

                                <Route path={routes.home} element={<HomeView />}/>
                                <Route path={routes.newview} element={<NewView />}/>
                                <Route path={routes.vote} element={<VoteView />}/>
                                <Route path="*" element={<NotFoundView />}/>

                            </Routes>
                        </main>
                    </System>
                </Router>
        </>
    );
}

export default Wrapper;