import { Outlet } from "react-router-dom";
import ENavbar from "../components/ENavbar";

function Layout({user}){
    return(
        <>
            <ENavbar />
            <Outlet />
        </>
    );
}

export default Layout;