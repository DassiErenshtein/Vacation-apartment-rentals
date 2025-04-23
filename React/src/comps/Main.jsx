import { Provider } from "react-redux";
import store from "../redux/store.js";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Nav } from './Nav';
import { Routing } from "./Routing";
import './style.css';
import { useEffect } from "react";

export const Main = () => {
    return (<>
        <Provider store={store}>
            <BrowserRouter>
                <Nav />
                <Routing />
                <Navigate></Navigate>
            </BrowserRouter>
        </Provider>
    </>
    );
};
const Navigate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/home');
    }, []);
}