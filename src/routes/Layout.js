import { Outlet } from "react-router-dom";
import ENavbar from "../components/ENavbar";
import '../App.css';

function Layout({user}){
    return(
        <>
            <ENavbar />
            <Outlet />
        </>
    );
}

export default Layout;