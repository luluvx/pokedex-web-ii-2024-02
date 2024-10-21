import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardHeader, Col, Container, Form, Row } from "react-bootstrap";


const FormEvolucion = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    
    const [pokemonList, setPokemonList] = useState([]);

    const [idEvolPrevia, setIdEvolPrevia] = useState("");
    const [idEvolSiguiente, setIdEvolSiguiente] = useState("");


    useEffect(() => {
        if(!id) return;
        getPokemonById();
    }, [id]);


    useEffect(() => {
        getPokemonList();
    }, []);

    const getPokemonById = async () => {
        axios.get(`http://localhost:3000/pokemones/${id}`)
            .then(response => {
                const pokemon = response.data;
                setIdEvolPrevia(pokemon.idEvPrevia);
                setIdEvolSiguiente(pokemon.idEvSiguiente);
            }).catch(error => {
                console.error(error);
            });
    }

    const getPokemonList = async () => {
        axios.get("http://localhost:3000/pokemones")
            .then((response) => {
                setPokemonList(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }


    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        if (form.checkValidity() === false) {
            return;
        }

        const pokemon = {
            idEvPrevia: idEvolPrevia,
            idEvSiguiente: idEvolSiguiente
        }
        editEvolucion(pokemon);


    }

    const editEvolucion = async (pokemon) => {
        axios.patch(`http://localhost:3000/pokemones/${id}/evolucion`, pokemon)
            .then(response => {
                console.log(response.data);
                navigate('/admin/pokemones/' + id + '/detail');
            }).catch(error => {
                console.error(error);
            });
    }

    return (
        <>
        <Container>
            <h1>Formulario de Evolucion</h1>
            <Row>
                <Col md={6}>
                    <Card>
                        <CardHeader>
                            <h2>Crear Evolucion</h2>
                        </CardHeader>
                        <Card.Body>
                            <Form onSubmit={onGuardarClick}>
                                <Form.Group>
                                    <Form.Label>Evolucion previa</Form.Label>
                                    <Form.Select  value={idEvolPrevia} onChange={(e)=>{
                                        setIdEvolPrevia(e.target.value);
                                    }}>
                                        <option>Selecciona un pokemon</option>
                                        {pokemonList.map(pokemon => 
                                            <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                        )}
                                    </Form.Select>
                                    
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Evolucion siguiente</Form.Label>
                                    <Form.Select value={idEvolSiguiente} onChange={(e) => {
                                        setIdEvolSiguiente(e.target.value);
                                    }}>
                                        <option>Selecciona un pokemon</option>
                                        {pokemonList.map(pokemon => (
                                            <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Crear
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
        </>

     );
}
 
export default FormEvolucion;