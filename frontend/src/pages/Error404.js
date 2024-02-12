import { Container } from "react-bootstrap";

function Error404(){
    return(
        <Container className="p-3"> 
            <h1 style={{textAlign : "center"}}>
                404 Not Found
            </h1>
        </Container>
    );
}
export default Error404;