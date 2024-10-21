import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, CardHeader, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


const FormHabilidad = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getHabilidadById();
    }, [id]);

    const getHabilidadById = () => {
        axios.get(`http://localhost:3000/habilidades/${id}`)
            .then((response) => {
                const habilidad = response.data;
                setNombre(habilidad.nombre);
            }).catch((error) => {
                console.error(error);
            });
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const habilidad = { nombre };

        if (id) {
            editHabilidad(habilidad);
        } else {
            insertHabilidad(habilidad);
        }
    }

    const insertHabilidad = (habilidad) => {
        axios.post('http://localhost:3000/habilidades', habilidad)
            .then((response) => {
                console.log(response.data);
                navigate('/admin/habilidades');
            }).catch((error) => {
                console.error(error);
            });
    }

    const editHabilidad = (habilidad) => {
        axios.put(`http://localhost:3000/habilidades/${id}`, habilidad)
            .then((response) => {
                console.log(response.data);
                navigate('/admin/habilidades');
            }).catch((error) => {
                console.error(error);
            });
    }

    return ( 
        <>
            
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={20}>
                        <Card className="card-create">
                            <CardHeader>
                                <h2>Form Habilidad</h2>
                            </CardHeader>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick} className="form-create">
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>

     );
}
 
export default FormHabilidad;