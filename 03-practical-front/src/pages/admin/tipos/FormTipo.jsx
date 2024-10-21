import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, CardHeader, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


const FormTipo = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getTipoById();
    }, [id]);

    const getTipoById = () => {
        axios.get(`http://localhost:3000/tipos/${id}`)
            .then((response) => {
                const tipo = response.data;
                setNombre(tipo.nombre);
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

        const tipo = { nombre };

        if (id) {
            editTipo(tipo);
        } else {
            insertTipo(tipo);
        }
    }

    const insertTipo = (tipo) => {
        axios.post('http://localhost:3000/tipos', tipo)
            .then((response) => {
                console.log(response.data);
                navigate('/admin/tipos');
            }).catch((error) => {
                console.error(error);
            });
    }

    const editTipo = (tipo) => {
        axios.put(`http://localhost:3000/tipos/${id}`, tipo)
            .then((response) => {
                console.log(response.data);
                navigate('/admin/tipos');
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
                                <h2>Form Tipo</h2>
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

export default FormTipo;
