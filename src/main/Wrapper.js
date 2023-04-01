import React, {useEffect, useRef} from 'react';
import {ToastContainer, toast} from "react-toastify";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import DataProvider from "../core/providers/DataProvider";
import NotFoundView from "./views/NotFoundView";
import {notifyUpdatedPWA} from "../core/sw/registerSW";
import {version} from "../config";
import {routes} from "./routes";
import HomeView from "./views/HomeView";
import {System} from "../core/providers/System";

function Wrapper() {

    const main_container = useRef();

    useEffect(() => {

        notifyUpdatedPWA(() => {
            toast.info(`Aktualizované na verziu ${version}`);
        });

    }, []);


    return (
        <>
            <ToastContainer
                position={"top-right"}
                autoClose={3500}
                newestOnTop
                pauseOnFocusLoss={false}
                theme={"colored"}
            />
            <DataProvider>
                <Router>
                    <System>
                        <main role="main" ref={main_container}>
                            <Routes>

                                <Route path={routes.home} element={<HomeView />}/>
                                <Route path="*" element={<NotFoundView />}/>

                            </Routes>
                        </main>
                    </System>
                </Router>
            </DataProvider>
        </>
    );
}

export default Wrapper;