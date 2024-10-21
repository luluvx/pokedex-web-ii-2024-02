import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Container, Row , Col, Card, FormControl, FormSelect, Alert } from "react-bootstrap";
import axios from "axios";



const PokemonList = () => {

    const [pokemonList, setPokemonList] = useState([]);

    const [tipoList, setTipoList] = useState([]);

    const [pokemonListFiltrados, setPokemonListFiltrados] = useState([]);

    const [nombrePokemoBuscar, setNombrePokemonBuscar] = useState("");
    const [tipoPokemonBuscar, setTipoPokemonBuscar] = useState("");



    const navigate = useNavigate();

    useEffect(() => {
        getPokemonList();
        getTipoList();
    }, []);


    const getPokemonList = async () => {
        axios.get("http://localhost:3000/pokemones")
            .then((response) => {
                const pokemonList = response.data;
                setPokemonList(pokemonList);
                setPokemonListFiltrados(pokemonList);

                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }

    const getTipoList = async () => {
        axios.get("http://localhost:3000/tipos")
            .then((response) => {
                const tipoList = response.data;
                setTipoList(tipoList);
            }).catch((error) => {
                console.error(error);
            });
    }

   
    

    const buscarPokemonPorNombreONumero = (e) => {
        setNombrePokemonBuscar(e.target.value);
        buscarPokemon(e.target.value , tipoPokemonBuscar);
    }

    const buscarPokemonPorTipo = (e) => {
        setTipoPokemonBuscar(e.target.value);
        buscarPokemon(nombrePokemoBuscar , e.target.value);
    }

    const buscarPokemon = (nombre, tipo) => {
        let pokemonlistFlitrada = pokemonList;

        if(nombre){
            pokemonlistFlitrada = pokemonlistFlitrada.filter(pokemon =>
                pokemon.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
                pokemon.nroPokedex.toLowerCase().includes(nombre.toLowerCase())
            );
        }
        if(tipo){
            pokemonlistFlitrada = pokemonlistFlitrada.filter(pokemon =>
                pokemon.tipos.some(tipoPokemon => tipoPokemon.id === parseInt(tipo))
            );
        }
        setPokemonListFiltrados(pokemonlistFlitrada);
    }


    return (
        <>
        <Container>
            <Card className=" text-white" style={{ backgroundColor: " #222222" }}>
            <Card.Body className="m-0">
                <Row>
                    <Col md={8} className="text-center">
                        <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Pokedex</Card.Title>
                    </Col>

                </Row>
                <Row className="mt-4">
                    <Col md={9}>
                        <Form>
                            <FormControl
                            type="text"
                            placeholder="Buscar pokemon"
                            className="mr-sm-2"
                            value={nombrePokemoBuscar}
                            onChange={buscarPokemonPorNombreONumero}
                            />
                        </Form>
                    </Col>
                    <Col md={3}>
                    <FormSelect onChange={buscarPokemonPorTipo} value={tipoPokemonBuscar}>
                        <option value="" >Select type</option>
                        {tipoList.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </FormSelect>
                    </Col>
                </Row>
                </Card.Body>
            </Card>

        </Container>
        <br />
        <Container>
                <Row>
                    {pokemonListFiltrados.length === 0 &&  <Alert variant="danger" className="mt-4">No se encontraon pokemones</Alert>}
                    {pokemonListFiltrados.map(pokemon => (
                        <Col key={pokemon.id} xl={3}>
                            <Card className="p-3 d-flex flex-column align-items-center justify-content-between  " style={{backgroundColor:' #272727', width:'180px', height:'190px', boxShadow:'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', border:'none'}}>
                                <Card.Img onClick={() => navigate("/pokemones/" + pokemon.id +"/detail")}
                                className="imgPhoto"
                                variant="top"
                                src={"http://localhost:3000/pokemones/" + pokemon.id + ".jpg"}
                                alt="Imagen del pokemon"
                                style={{width:'60%', height:'60%' , margin:'10px auto'}}
                                />

                                <Card.Body className="m-0 d-flex flex-column align-items-center justify-content-between">
                                    <Card.Title className="m-0 fs-6 text-white ">{pokemon.nombre}</Card.Title>
                                    <Card.Text className="m-0 text-white-50 " style={{fontSize:'11px', fontFamily:'Jost-Medium'}}># {pokemon.nroPokedex}</Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                </Row>

            </Container>
        </>

    );
}
export default PokemonList;