import { useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";

import { Card, Col, Container, Form, Row , Button, Alert, } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import "./DetailPokemonAdmin.css";
import HeaderAdmin from "../../../components/HeaderAdmin";

const DetailPokemonAdmin = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState({});

    const [statsPokemon, setStatsPokemon] = useState([]);

    const [tipoList, setTipoList] = useState([]);
    const [habilidadList, setHabilidadList] = useState([]);

    const [tiposSeleccionadosIds, setTiposSeleccionadosIds] = useState([]);
    const [habilidadesSeleccionadasIds, setHabilidadesSeleccionadasIds] = useState([]);

    const [tiposSeleccionados, setTipoSeleccionados] = useState([]);
    const [habilidadesSeleccionadas, setHabilidadesSeleccionadas] = useState([]);

    const [showTiposModal, setShowTiposModal] = useState(false);
    const [showHabilidadesModal, setShowHabilidadesModal] = useState(false);

    const [lineaEvolutiva, setLineaEvolutiva] = useState([]);




    useEffect(() => {
        getPokemonById();
        getLineaEvolutiva();
        getTiposSeleccionados();
        getHabilidadesSeleccionadas(); 
      }, [id]);

    useEffect(() => {
        getTiposList();
        getHabilidadesList();
    }, [] );

    useEffect(() => {
        getTiposSeleccionados();
    }, [showTiposModal]);

    useEffect(() => {
        getHabilidadesSeleccionadas();
    }, [showHabilidadesModal]);

    const getPokemonById = async () => {
        axios.get("http://localhost:3000/pokemones/" + id)
            .then((response) => {
                const pokemon = response.data;
                setPokemon(pokemon);

                const stats = [
                    { nombre: "HP", valor: pokemon.hp, color: "#A0D683" },
                    { nombre: "Attack", valor: pokemon.attack , color: "#FEFF9F"},
                    { nombre: "Defense", valor: pokemon.defense, color: "#FFBD73" },
                    { nombre: "Sp.Atk", valor: pokemon.spattack, color: "#BBE9FF" },
                    { nombre: "Sp.Def", valor: pokemon.spdefense, color: "#D0BFFF" },
                    { nombre: "Speed", valor: pokemon.speed, color: "#FFCDEA" },

                ];

                setStatsPokemon(stats);

                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getLineaEvolutiva = async () => {
        try {
            // Obtener los IDs de la línea evolutiva
            const response = await axios.get(`http://localhost:3000/pokemones/${id}/lineaEvolutiva`);
            const lineEvolutivaIds = response.data;
    
            // Hacer peticiones paralelas para obtener los datos de cada Pokémon
            const pokemonesLineaEvolutiva = await Promise.all(
                lineEvolutivaIds.map(async (pokemonId) => {
                    const res = await axios.get(`http://localhost:3000/pokemones/${pokemonId}`);
                    return res.data; // Devolver los datos del Pokémon
                })
            );
    
            // Actualizar el estado con la línea evolutiva completa
            setLineaEvolutiva(pokemonesLineaEvolutiva);
        } catch (error) {
            console.error(error);
        }
    };
    

    const getTiposList = async () => {
        axios.get("http://localhost:3000/tipos")
            .then((response) => {
                setTipoList(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getTiposSeleccionados = async () => {
        axios.get(`http://localhost:3000/pokemones/${id}/tipos`)
            .then((response) => {
                const tiposIds = response.data.map(tipo => tipo.id);
                setTiposSeleccionadosIds(tiposIds);

                const nombresTipos = response.data.map(tipo => ({ id: tipo.id, nombre: tipo.nombre }));
                setTipoSeleccionados(nombresTipos);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getHabilidadesList = async () => {
        axios.get("http://localhost:3000/habilidades")
            .then((response) => {
                setHabilidadList(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }

    const getHabilidadesSeleccionadas = async () => {
        axios.get("http://localhost:3000/pokemones/"  + id +"/habilidades")
            .then((response) => {
                const habilidadesIds = response.data.map(habilidad => habilidad.id);
                setHabilidadesSeleccionadasIds(habilidadesIds);

                const nombresHabilidades = response.data.map(habilidad => ({ id: habilidad.id, nombre: habilidad.nombre }));
                setHabilidadesSeleccionadas(nombresHabilidades);

            }).catch((error) => {
                console.log(error);
            });
    }

    const cambiarTipoSeleccionado = (tipoId) => {
        if(tiposSeleccionadosIds.includes(tipoId)){
            setTiposSeleccionadosIds(tiposSeleccionadosIds.filter(id => id !== tipoId));
        }else{
            setTiposSeleccionadosIds([...tiposSeleccionadosIds, tipoId]);
        }

    }

    const cambiarHabilidadSeleccionada = (habilidadId) => {
        if(habilidadesSeleccionadasIds.includes(habilidadId)){
            setHabilidadesSeleccionadasIds(habilidadesSeleccionadasIds.filter(id => id !== habilidadId));
        }else{
            setHabilidadesSeleccionadasIds([...habilidadesSeleccionadasIds, habilidadId]);
        }


    }


    const guardarTipos = () => {
        console.log(tiposSeleccionadosIds);
        axios.post("http://localhost:3000/pokemones/" + id + "/tipos", { tipos: tiposSeleccionadosIds })
            .then((response) => {
                openAnCloseTiposModal();
                
                console.log(response);

            }).catch((error) => {
                console.log(error);
            });
    }

    const guardarHabilidades = () => {
        console.log(habilidadesSeleccionadasIds);
        axios.post("http://localhost:3000/pokemones/" + id + "/habilidades" ,{ habilidades: habilidadesSeleccionadasIds })
            .then((response) => {
                openAndCloseHabilidadesModal();
                console.log(response);
                
            }).catch((error) => {
                console.log(error);
            });
    }

    const onDeletePokemon = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this pokemon?");
        if(confirm){
            axios.delete("http://localhost:3000/pokemones/" + id)
                .then((response) => {
                    console.log(response.data);
                    navigate("/admin/pokemones");
                }).catch((error) => {
                    console.error(error);
                });
        }
    }

    const openAnCloseTiposModal = () => setShowTiposModal(!showTiposModal);
    const openAndCloseHabilidadesModal = () => setShowHabilidadesModal(!showHabilidadesModal);

    return (
        
        
        <Container className="my -3">
        <HeaderAdmin />


        <Row className="my-4 ">
            <Col md={4}>
                <Card className="p-4 card-img rounded-lg" >
                    <Button onClick={() => navigate("/admin/pokemones/" + pokemon.id +"/photo")} className="btnEdit">
                    <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Card.Img
                    variant="top"
                    src={`http://localhost:3000/pokemones/${id}.jpg?${Date.now()}`}
                    alt={`Imagen de ${pokemon.nombre}`}
                    className="img-pokemon"
                    />
                </Card>
            < br />
            <Row >
                <Col md={12}>
                    <Card className="p-4" style={{backgroundColor: 'rgba(40, 39, 39, 0.789)'}}>
                        <Card.Body className="m-0">
                            <Button variant="primary" onClick={openAnCloseTiposModal} className="btnEdit" style={{position:'relative', left:'42%'}}>
                                <i className="bi bi-pencil-fill"></i>
                            </Button>
                            <Card.Title className="mb-3 fs-4 text-white">Tipos</Card.Title>
                            <Row >
                                {tiposSeleccionados.length === 0 && <Alert variant="info">No hay tipos</Alert>}
                                {tiposSeleccionados.map((tipo) => (
                                    <Col key={tipo.id} md={6} className="mb-3 pl-1 pr-1">
                                        <Card className=" p-2 border-0 rounded-pill" style={{backgroundColor: ' #363636'}}>
                                            <Card.Body className="m-0 d-flex flex-row align-items-center justify-content-start">
                                                <Card.Img
                                                    variant="top"
                                                    src={`http://localhost:3000/tipos/${tipo.id}.jpg`}
                                                    alt={`Imagen de ${tipo.nombre}`}
                                                    style={{ width: '30px', height: '30px', marginRight: '8px' }}
                                                />

                                                <Card.Text className="m-0 text-white " style={{fontSize:'10px', fontFamily: 'AvantGarde'}}>{tipo.nombre}</Card.Text>
                                            </Card.Body>


                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>

                </Col>

            </Row>
            <br />
            <Row>
                <Col md={12}>
                    <Card className="p-4" style={{backgroundColor: 'rgba(40, 39, 39, 0.789) '}}>
                        <Card.Body className="m-0">
                            <Button variant="primary" onClick={openAndCloseHabilidadesModal} className="btnEdit" style={{position:'relative', left:'42%'}}>
                                <i className="bi bi-pencil-fill"></i>
                            </Button>
                            <Card.Title className="mb-3 fs-4 text-white">Habilidades</Card.Title>
                            <Row >
                                {habilidadesSeleccionadas.length === 0 && <Alert variant="info">No hay habilidades</Alert>}
                                {habilidadesSeleccionadas.map((habilidad) => (
                                    <Col key={habilidad.id} md={4} className="mb-3 pl-1 pr-1">
                                        <Card className=" p-2 border-0 rounded-pill" style={{backgroundColor: ' rgba(79, 79, 79, 0.818)'}}>
                                            <Card.Body className="m-0 d-flex flex-row align-items-center justify-content-start">
                                                <Card.Text className="m-0 text-white " style={{fontSize:'10px', fontFamily: 'AvantGarde'}}>{habilidad.nombre}</Card.Text>
                                            </Card.Body>


                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>

                </Col>

            </Row>
            <br />
            <Row className="mb-3">
                <Col md={12}>
                    <Button variant="danger" onClick={() => onDeletePokemon(pokemon.id)} style={{width:'100% '}} >
                    <i className="bi bi-trash"></i> Eliminar pokemon
                    </Button>
                </Col>
            </Row>
            </Col>




            <Col md={8}>
            <Card className="card-info">
                <Card.Body className="m-0">
                        <Button variant="primary" onClick={() => navigate("/admin/pokemones/edit/" + pokemon.id)} className="btnEdit" style={{position:'relative', top:'0', left:'46%'}}>
                            <i className="bi bi-pencil-fill"></i>
                        </Button>
                    <Card.Title className="fs-1">{pokemon.nombre}</Card.Title>
                    <p>{pokemon.descripcion}</p>
                    <Card className="p-3 border-0" style={{backgroundColor:'#363636'}}>
                        <Card.Body className="my-0">
                            <Row>
                                {statsPokemon.map((stat) => (
                                <Col key={stat.nombre} md={2}>
                                    <Card className="d-flex flex-column align-items-center justify-content-center p-2 " style={{ backgroundColor:`${stat.color}`, border: 'none', fontFamily: 'AvantGarde'}}>
                                        <Card.Body className="m-0">
                                            <Card.Text className="mb-2 fs-6">{stat.valor}</Card.Text>
                                            <Card.Title className="m-0 " style={{fontSize:'11px', fontWeight: 'lighter', fontFamily:'Jost-Bold'}}>{stat.nombre}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                ))}
                            </Row>

                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            <br/>
            <Row>
                <Col md={12}>
                <Card className="p-4 card-evoluciones">
                    <Card.Body className="m-0">
                        <Button variant="primary" onClick={()=> navigate("/admin/pokemones/" + pokemon.id + "/evolucion")} className="btnEdit" style={{position:'relative', left:'45%'}}>
                            <i className="bi bi-pencil-fill"></i>
                        </Button>
                        <Card.Title className="mb-3 fs-4 text-white">Evoluciones</Card.Title>
                        <Row >
                            {lineaEvolutiva.map((pokemon) => (
                                <Col key={pokemon.id} md={4} className="m-0 pl-1 pr-1">
                                    <Card onClick={()=> navigate("/admin/pokemones/" + pokemon.id + "/detail")} className="d-flex flex-column align-items-center justify-content-center p-2 " style={{backgroundColor: ' #363636', width: '145px', height: '180px'}}>
                                        <Card.Body className="d-flex flex-column align-items-center justify-content-center ">
                                            <Card.Img
                                                variant="top"
                                                src={`http://localhost:3000/pokemones/${pokemon.id}.jpg`}
                                                alt={`Imagen de ${pokemon.nombre}`}
                                                style={{ width: '90px', height: '100px', marginBottom:'20px' }}
                                            />

                                            <Card.Text className="m-0 text-white " style={{fontSize:'12px', fontFamily: 'AvantGarde'}}>{pokemon.nombre}</Card.Text>
                                        </Card.Body>

                                        </Card>
                                </Col>
                            ))}

                        </Row>

                    </Card.Body>
                </Card>

                </Col>
            </Row>
            </Col>
        </Row>


        <Modal show={showTiposModal} onHide={openAnCloseTiposModal}>
            <Modal.Header closeButton>
            <Modal.Title>Editar Tipos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
                {tipoList.map((tipo) => (
                <ListGroupItem key={tipo.id}>
                    <Form.Check
                    type="checkbox"
                    label={tipo.nombre}
                    checked={tiposSeleccionadosIds.includes(tipo.id)}
                    onChange={() => cambiarTipoSeleccionado(tipo.id)}
                    />
                </ListGroupItem>
                ))}
            </ListGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={openAnCloseTiposModal}>Cerrar</Button>
            <Button variant="primary" onClick={guardarTipos}>Guardar Tipos</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showHabilidadesModal} onHide={openAndCloseHabilidadesModal}>
            <Modal.Header closeButton>
            <Modal.Title>Editar Habilidades</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
                {habilidadList.map((habilidad) => (
                <ListGroupItem key={habilidad.id}>
                    <Form.Check
                    type="checkbox"
                    label={habilidad.nombre}
                    checked={habilidadesSeleccionadasIds.includes(habilidad.id)}
                    onChange={() => cambiarHabilidadSeleccionada(habilidad.id)}
                    />
                </ListGroupItem>
                ))}
            </ListGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={openAndCloseHabilidadesModal}>Cerrar</Button>
            <Button variant="primary" onClick={guardarHabilidades}>Guardar Habilidades</Button>
            </Modal.Footer>
        </Modal>
        </Container>
        

        
);
        
        
 
};
 
export default DetailPokemonAdmin;