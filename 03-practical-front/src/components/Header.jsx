
import { Button, Card, Col, Container, Row } from 'react-bootstrap';



import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <Container>
            <Card className="border-0 text-white p-0 mb-4" style={{ backgroundColor: "transparent" }}>
             <Card.Body className="m-0">
                <Row>
                    <Col md={10} className="text-center">
                    <Card.Title className="mb-0 fs-1 text-start" style={{fontFamily: 'AvantGarde'}} >Pokedex</Card.Title>
                    </Col>
                    <Col md={2}>
                        <Link to="/admin/pokemones/create">
                            <Button></Button>
                        </Link>
                    </Col>


                </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}


export default Header;
