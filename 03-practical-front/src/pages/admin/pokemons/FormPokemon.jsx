import axios from "axios";
import { useEffect, useState } from "react";

import { Button, Card, CardHeader, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";




const FormPokemon = () => {

    const {id} = useParams();

    const navigate = useNavigate();



    const [nombre, setNombre] = useState('');
    const [nroPokedex, setNroPokedex] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [spattack, setSpattack] = useState('');
    const [spdefense, setSpdefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [nivelEvolucion, setNivelEvolucion] = useState('');


    const [validated, setValidated] = useState(false);

  
   

    useEffect(() => {
        getPokemonById();
 
    }, [id]);

    const getPokemonById = async () => {
        axios.get(`http://localhost:3000/pokemones/${id}`)
            .then((response) => {
                const pokemon = response.data;
                setNombre(pokemon.nombre);
                setNroPokedex(pokemon.nroPokedex);
                setDescripcion(pokemon.descripcion);
                setHp(pokemon.hp);
                setAttack(pokemon.attack);
                setDefense(pokemon.defense);
                setSpattack(pokemon.spattack);
                setSpdefense(pokemon.spdefense);
                setSpeed(pokemon.speed);
                setNivelEvolucion(pokemon.nivelEvolucion);
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

        const pokemon = {
            nombre: nombre,
            nroPokedex: nroPokedex,
            descripcion: descripcion,
            hp: hp,
            attack: attack,
            defense: defense,
            spattack: spattack,
            spdefense: spdefense,
            speed: speed,
            nivelEvolucion: nivelEvolucion
        };

        if (id) {
            updatePokemon(pokemon);
        } else {
            createPokemon(pokemon);
        }

        


    }

    const createPokemon = (pokemon) => {
        axios.post("http://localhost:3000/pokemones", pokemon)
            .then((response) => {
                console.log(response.data);
                navigate('/admin/pokemones');
            }).catch((error) => {
                console.error(error);
            });
    }

    const updatePokemon = (pokemon) => {
        axios.put(`http://localhost:3000/pokemones/${id}`, pokemon)
            .then((response) => {
                console.log(response.data);
                navigate('/admin/pokemones/' + id + '/detail');
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
                                <h2>Form Pokemon</h2>
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
                                    <Form.Group>
                                        <Form.Label>Nro Pokedex</Form.Label>
                                        <Form.Control required value={nroPokedex} type="text" onChange={(e) => {
                                            setNroPokedex(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un numero de pokedex.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control required value={descripcion} type="text" onChange={(e) => {
                                            setDescripcion(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una descripcion.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Hp</Form.Label>
                                        <Form.Control required value={hp} type="number" onChange={(e) => {
                                            setHp(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un HP.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Attack</Form.Label>
                                        <Form.Control required value={attack} type="number" onChange={(e) => {
                                            setAttack(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un attack.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Defense</Form.Label>
                                        <Form.Control required value={defense} type="number" onChange={(e) => {
                                            setDefense(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un defense.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>SpAttack</Form.Label>
                                        <Form.Control required value={spattack} type="number" onChange={(e) => {
                                            setSpattack(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un spattack.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Spdefense</Form.Label>
                                        <Form.Control required value={spdefense} type="number" onChange={(e) => {
                                            setSpdefense(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un spdefense.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Speed</Form.Label>
                                        <Form.Control required value={speed} type="number" onChange={(e) => {
                                            setSpeed(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un speed.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nivel Evolucion</Form.Label>
                                        <Form.Control required value={nivelEvolucion} type="number" onChange={(e) => {
                                            setNivelEvolucion(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nivelEvolucion.
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

export default FormPokemon;