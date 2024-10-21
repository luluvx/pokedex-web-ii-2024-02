import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Row , Col, Card, Button  } from "react-bootstrap";
import axios from "axios";

const HabilidadDashboard = () => {
    const navigate = useNavigate();
    const [habilidadList, setHabilidadList] = useState([])

    useEffect(() => {
        getHabilidadList();
    }, []);


    const getHabilidadList = async () => {
        axios.get("http://localhost:3000/habilidades")
            .then((response) => {
                setHabilidadList(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
    }

    const onDeleteHabilidad = async (id) => {
        const confirm = window.confirm('Estas seguro que quieres eliminar esta habilidad?');
        if (!confirm){
            return;
        }

        axios.delete(`http://localhost:3000/habilidades/${id}`)
            .then((response) => {
                getHabilidadList();
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
                        <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Habilidades Dashboard</Card.Title>
                    </Col>
                    <Col md={2}>
                        <Button  onClick={() => navigate("/admin/habilidades/create")} style={{width:'100%', backgroundColor:'', fontFamily:'AvantGarde'}}>Crear</Button>
                    </Col>
                </Row>
                </Card.Body>
            </Card>

            </Container>
            <br/>
            <Container>
                <Row >
                    {habilidadList.map(habilidad => (
                        <Col key={habilidad.id} md={3}>
                            <Card className=" p-4 " style={{backgroundColor:'#222222', fontFamily:'Jost-Bold', marginBottom:'20px'}}>
                                <Card.Body className="m-0">
                                    <Card.Title className="mb-3 fs-5 text-white">{habilidad.nombre}</Card.Title>
                                    <div className="d-flex justify-content-center align-items-center gap-4" style={{gap:'12px'}} >
                                        <Link to={"/admin/habilidades/edit/" + habilidad.id} className="border-0" style={{backgroundColor:'transparent'}}>
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <Button onClick={ () => {onDeleteHabilidad(habilidad.id)}} className="border-0" style={{backgroundColor:'transparent'}}>
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

export default HabilidadDashboard;