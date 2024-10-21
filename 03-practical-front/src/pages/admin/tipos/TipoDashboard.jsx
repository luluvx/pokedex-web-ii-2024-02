import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row , Col, Card, Button  } from "react-bootstrap";
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../../styles/global.css';
import './TipoDashboard.css';

const TipoDashBoard = () => {

    const navigate = useNavigate();

    const [TipoList, setTipoList] = useState([]);

    useEffect(() => {
        getTipoList();
    }, []);

    const getTipoList = async () => {
        axios.get("http://localhost:3000/tipos")
            .then((response) => {
                setTipoList(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }

    const onDeleteTipo = async (id) => {
        const confirm = window.confirm('Estas seguro que quieres eliminar este tipo?');
        if (!confirm){
            return;
        }

        axios.delete(`http://localhost:3000/tipos/${id}`)
            .then((response) => {
                getTipoList();
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }


    return ( 
        <>

            <Container>
            <Card className=" text-white" style={{ backgroundColor: " #222222" }}>
             <Card.Body className="m-0">
                <Row>
                    <Col md={10} className="text-center">
                        <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Tipos Dashboard</Card.Title>
                    </Col>
                    <Col md={2}>
                        <Button  onClick={() => navigate("/admin/tipos/create")} style={{width:'100%', backgroundColor:'', fontFamily:'AvantGarde'}}>Crear</Button>
                    </Col>
                </Row>
                </Card.Body>
            </Card>

            </Container>
            <br />
            <Container>
                <Row>
                    {TipoList.map(tipo => (
                        <Col key={tipo.id} md={3}>
                            <Card className="card-tipo">
                                <Card.Img className="imgPhoto" variant="top"  src={"http://localhost:3000/tipos/" + tipo.id + ".jpg"} alt="Imagen del tipo"/>
                                <Card.Body className="mt-3">
                                    <Card.Title>{tipo.nombre}</Card.Title>
                                    <div className="container-controls">
                                        <Link to={"/admin/tipos/" + tipo.id + "/photo"}className=" p-2 btn-control">
                                            <i className="bi bi-image-fill"></i>
                                        </Link>
                                        <Link to={"/admin/tipos/edit/" +tipo.id} className="p-2 btn-control">
                                        <i className="bi bi-pencil"></i>
                                        </Link>
                                        <Button onClick={ () => {onDeleteTipo(tipo.id)}} className="p-2 btn-control">
                                            <i className="bi bi-trash"></i> 
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                </Row>

            </Container>
        </>

    );
}
 
export default TipoDashBoard;