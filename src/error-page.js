import { Container } from "react-bootstrap";

function ErrorPage(){
    return(
        <Container className="p-5"> 
            <h1 style={{textAlign : "center"}}>
                404 Not Found
            </h1>
        </Container>
    );
}
export default ErrorPage;