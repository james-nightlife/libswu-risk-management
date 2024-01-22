import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import '../index.css';
import UsersTable from "../table/UsersTable";
import Pagination from "../components/Pagination";
import { SessionExpired } from "../functions/SessionExpired";

const UserManager = () => {
    document.title = "จัดการบัญชีผู้ใช้";
    
    // เช็ก Role
    const role = sessionStorage.getItem('role');

    useEffect(() => {
        if(role !== 'admin'){
            window.location.href = "/";
        }else{
            fetchData();
        }
        
    }, [role]);

    // แสดงข้อมูลผู้ใช้
    const token = sessionStorage.getItem('token');
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/user/record`, {
            method: "GET",
            headers: {
                'lib-token': token,
            }
        }).then(async (response) => {
            if(response.status === 200){
                const data = await response.json();
                setUsers(data);
            }else if(response.status === 500){
                handleTokenExpiration();
            }
        })
        .catch(

        );
    }

    const handleTokenExpiration = async () => {
        SessionExpired();
    }

    // Pagination
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = users.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(users.length / itemsPerPage);
    

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const handleEditButton = (e, id) => {
        e.preventDefault()
        localStorage.setItem('edit_username', id);
        window.location.href = "/admin/users/edit";
    } 

    return(
        <Container className='p-3'>
            { users === null ? (
                <p>Loading...</p>
            ) : users.length === 0 ? (
                <>
                </>
            ) : (
                <>
                    <UsersTable 
                        handleEditButton={handleEditButton} 
                        currentItems={currentItems} 
                        itemOffset={itemOffset} />
                    <Pagination 
                        handlePageClick={handlePageClick}
                        pageCount={pageCount} />
                </>
            )}
        </Container>
    );
}
export default UserManager;