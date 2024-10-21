import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Container, Alert,Row, Table } from "react-bootstrap";

import axios from "axios";
import "./DetailPokemon.css";

const DetailPokemon = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState({});
    const [statsPokemon, setStatsPokemon] = useState([]);
    const [tiposPokemon, setTiposPokemon] = useState([]);
    const [habilidadesPokemon, setHabilidadesPokemon] = useState([]);
    const [lineaEvolutiva, setLineaEvolutiva] = useState([]);
    const [rangoStats, setRangoStats] = useState([]);

    useEffect(() => {
        getPokemonById();
        getLineaEvolutiva();
        getTiposPokemon();
        getHabilidadesPokemon();
        getRangoStats();
    }, [id]);

    const getPokemonById = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pokemones/${id}`);
            const pokemon = response.data;
            setPokemon(pokemon);

            const stats = [
                { nombre: "HP", valor: pokemon.hp, color: "#A0D683" },
                { nombre: "Attack", valor: pokemon.attack, color: "#FEFF9F" },
                { nombre: "Defense", valor: pokemon.defense, color: "#FFBD73" },
                { nombre: "Sp.Atk", valor: pokemon.spattack, color: "#BBE9FF" },
                { nombre: "Sp.Def", valor: pokemon.spdefense, color: "#D0BFFF" },
                { nombre: "Speed", valor: pokemon.speed, color: "#FFCDEA" },
            ];
            setStatsPokemon(stats);
        } catch (error) {
            console.error(error);
        }
    };

    const getRangoStats = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pokemones/${id}/rangoStats`);
            setRangoStats(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getLineaEvolutiva = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pokemones/${id}/lineaEvolutiva`);
            const evoluciones = await Promise.all(
                response.data.map(async (pokemonId) => {
                    const res = await axios.get(`http://localhost:3000/pokemones/${pokemonId}`);
                    return res.data;
                })
            );
            setLineaEvolutiva(evoluciones);
        } catch (error) {
            console.error(error);
        }
    };

    const getTiposPokemon = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pokemones/${id}/tipos`);
            setTiposPokemon(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getHabilidadesPokemon = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pokemones/${id}/habilidades`);
            setHabilidadesPokemon(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="detail-container my-5">
            <Row className="align-items-center">
                <Card className="text-white " style={{ backgroundColor: "#222222" }}>
                    <Card.Title className="pokemon-name">{pokemon.nombre}</Card.Title>
                    <Card.Body className="d-flex flex-row align-items-center justify-content-center">
                        <Col md={3} className="text-white">


                            <p className="pokemon-description mt-3">{pokemon.descripcion}</p>
                        </Col>
                        <Col md={7} className="text-center">
                            <img
                                src={`http://localhost:3000/pokemones/${id}.jpg`}
                                alt={pokemon.nombre}
                                className="pokemon-image"
                            />
                        </Col>
                    </Card.Body>
                </Card>
            </Row>
            <Row  className="mt-3 ">
                <Col md={8} className="p-0">
                    <Card className="p-4  card-evoluciones">
                        <Card.Body className="m-0">
                            <Card.Title className="mb-3 fs-4 text-white">Evoluciones</Card.Title>
                            <Row >
                                {lineaEvolutiva.map((pokemon) => (
                                    <Col key={pokemon.id} md={4} className="m-0 pl-1 pr-1">
                                        <Card  className="d-flex flex-column align-items-center justify-content-center p-2 " style={{backgroundColor: ' #363636', width: '145px', height: '180px'}}>
                                            <Card.Body className="m-0 d-flex flex-column align-items-center justify-content-center ">
                                                <Card.Img
                                                    variant="top"
                                                    src={`http://localhost:3000/pokemones/${pokemon.id}.jpg`}
                                                    alt={`Imagen de ${pokemon.nombre}`}
                                                    style={{ width: '90px', height: '100px', marginBottom:'15px' }}
                                                    onClick={()=> navigate("/pokemones/" + pokemon.id + "/detail")}
                                                />

                                                <Card.Text className="m-0 text-white-50 " style={{fontSize:'12px', fontFamily: 'AvantGarde'}}>{pokemon.nombre}</Card.Text>
                                                <Card.Text className="m-0 text-white " style={{fontSize:'10px', fontFamily: 'Jost-Medium'}}>{`N.Evol ${pokemon.nivelEvolucion}`}</Card.Text>
                                            </Card.Body>

                                            </Card>
                                    </Col>
                                ))}

                            </Row>

                        </Card.Body>
                    </Card>
                    <Card className="p-4 mt-3" style={{backgroundColor: 'rgba(40, 39, 39, 0.789)'}}>
                        <Card.Body className="m-0">
                            <Card.Title className="mb-3 fs-4 text-white">Estadísticas</Card.Title>
                            <Row >
                                {statsPokemon.map((stat) => (
                                    <Col key={stat.nombre} md={2} className="text-center">
                                        <Card style={{ backgroundColor: stat.color ,  border: 'none', fontFamily: 'AvantGarde'}} className="d-flex flex-column align-items-center justify-content-center p-2 ">
                                            <Card.Body className="m-0">
                                                <Card.Title className="mb-1 mt-2">{stat.valor}</Card.Title>
                                                <Card.Text  style={{fontSize:'11px', fontWeight: 'lighter', fontFamily:'Jost-Medium'}}>{stat.nombre}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="p-4 mt-3 " style={{backgroundColor: 'rgba(40, 39, 39, 0.789)'}}>

                        <Card.Body className="m-0 " >
                            <Card.Title className="mb-3 fs-4 text-white">Rango de Estadísticas</Card.Title>
                            <Table className="border-0 text-white rounded-lg" style={{width:"100%"}}>
                                <thead style={{fontFamily:'AvantGarde', backgroundColor:'   ', color:"white"}}>
                                    <tr style={{backgroundColor:'#343434', borderRadius:'10px'}}>
                                        <th style={{backgroundColor:'#343434', color:"white", width:'10%', textAlign:'left', borderTopLeftRadius:'10px'}}>Stat</th>
                                        <th style={{backgroundColor:'#343434',color:"white", width:'10%'}}></th>
                                        <th style={{backgroundColor:'#343434',color:"white", width:'40%', borderTopRightRadius:'10px'}}>Rango</th>
                                    </tr>
                                 
                                </thead>
                                <tbody style={{fontFamily:'Jost-Medium', fontSize:'12px', borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}}>
                                    {rangoStats.map((stat, index) => (
                                        <tr key={index} style={{ backgroundColor: `${stat.color}` }}>
                                            <td style={{backgroundColor: `${stat.color}`, width:'10%', fontFamily:'Jost-Bold', textAlign:'left'}}>{stat.nombre} </td>
                                            <td style={{backgroundColor: `${stat.color}`, width:'10%'}}>{stat.base}</td>
                                            <td style={{backgroundColor: `${stat.color}`, width:'40%'}}>{stat.rango[0]} - {stat.rango[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>


                        </Card.Body>
                    </Card>


                </Col>


                <Col md={4} >
                    <Card className="p-4" style={{backgroundColor: 'rgba(40, 39, 39, 0.789)'}}>
                        <Card.Body className="m-0">
                            {/*<Card.Title className="mb-3 fs-4 text-white">Tipos</Card.Title>*/}
                            <Row >
                                {tiposPokemon.length === 0 && <Alert variant="info">No hay tipos</Alert>}
                                {tiposPokemon.map((tipo) => (
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

                    
                    <br />
                    <Row>
                        <Col>
                            <Card className="p-4" style={{backgroundColor: 'rgba(40, 39, 39, 0.789) '}}>
                                <Card.Body className="m-0">
                                    <Card.Title className="mb-3 fs-4 text-white">Habilidades</Card.Title>
                                    <Row >
                                        {habilidadesPokemon.length === 0 && <Alert variant="info">No hay habilidades</Alert>}
                                        {habilidadesPokemon.map((habilidad) => (
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
                </Col>

            </Row>


            {/*<Row className="mt-5">
                <h2 className="text-white">Estadísticas</h2>
                <Row>
                    {statsPokemon.map((stat) => (
                        <Col key={stat.nombre} md={2} className="text-center">
                            <Card style={{ backgroundColor: stat.color }} className="stat-card">
                                <Card.Body>
                                    <Card.Title>{stat.valor}</Card.Title>
                                    <Card.Text>{stat.nombre}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Row>

            <Row className="mt-5">
                <h2 className="text-white">Línea Evolutiva</h2>
                <Row className="justify-content-center">
                    {lineaEvolutiva.map((evolucion) => (
                        <Col key={evolucion.id} md={3} className="text-center">
                            <Card
                                className="evolution-card"
                                onClick={() => navigate(`/admin/pokemones/${evolucion.id}/detail`)}
                            >
                                <Card.Img
                                    src={`http://localhost:3000/pokemones/${evolucion.id}.jpg`}
                                    alt={evolucion.nombre}
                                    className="evolution-image"
                                />
                                <Card.Body>
                                    <Card.Title className="text-white">{evolucion.nombre}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Row>*/}
        </Container>
    );
};

export default DetailPokemon;
