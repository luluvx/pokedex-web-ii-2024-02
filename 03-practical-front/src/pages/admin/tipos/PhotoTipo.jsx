
import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
const PhotoTipo = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [photoTipoPokemon, setPhotoTipoPokemon] = useState(null);
    const [validated, setValidated] = useState(false);


    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData();
        formData.append('photoTipoPokemon', photoTipoPokemon);

        axios.post(`http://localhost:3000/tipos/${id}/photo`, formData)
            .then((response) => {
                console.log(response.data);
                navigate('/admin/tipos');
            }).catch((error) => {
                console.error(error);
            });
    }

    return ( 
        <Container className="mt-5">
        <Row className="justify-content-center mt-4">
            <Col md={8}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h2>Tipo Photo</h2>
                        </Card.Title>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group>
                                <Form.Label>Sleccion una foto por favor </Form.Label>
                                <Form.Control type="file" onChange={(e) => setPhotoTipoPokemon(e.target.files[0])} />
                                <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un archivo.
                                    </Form.Control.Feedback>  
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" >Save</Button>
                            </Form.Group>
                            
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>

    );
}
 
export default PhotoTipo;