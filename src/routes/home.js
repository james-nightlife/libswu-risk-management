import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import '../App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
    const responsive = {
        xxl: {
            breakpoint: { max: 4000, min: 1400 },
            items: 5
        },
        xl: {
            breakpoint: { max: 1400, min: 1200 },
            items: 5
        },
        lg: {
            breakpoint: { max: 1200, min: 992 },
            items: 5
        },
        md: {
            breakpoint: { max: 992, min: 768 },
            items: 3
        },
        sm: {
            breakpoint: { max: 768, min: 576 },
            items: 2
        },
        xs: {
            breakpoint: { max: 576, min: 0 },
            items: 1
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        localStorage.setItem('room', e.target.value)
        window.location.href = "/Booking";
    }

    return(
        <div className='m-5'>

        </div>
    );
}
export default Home;