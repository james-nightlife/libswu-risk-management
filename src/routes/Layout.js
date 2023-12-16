import { Outlet } from "react-router-dom";
import ENavbar from "../components/ENavbar";
import '../App.css';

function Layout({user}){
    return(
        <>
            <ENavbar user={user} />
            <div id="behindnavbar" />
            <Outlet />
        </>
    );
}

export default Layout;