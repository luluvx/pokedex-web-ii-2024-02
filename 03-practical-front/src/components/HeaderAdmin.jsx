
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const HeaderAdmin = () => {
    const navigate = useNavigate();
    return (    
        <Card className=" text-white" style={{ backgroundColor: " #222222" }}>
             <Card.Body className="m-0">
                <Row >
                    <Col md={9} className="">
                        <Card.Title className="mb-0 fs-2 text-start" style={{fontFamily: 'AvantGarde'}} >Pokemon Dashboard</Card.Title>
                    </Col>
                    <Col md={1} className='d-flex flex-direction-row justify-center p-0 '>
                        <Button style={{width:'100%', backgroundColor:'transparent', fontFamily:'Jost-Medium', padding:'0', fontSize:'15px', border:'none'}} onClick={() => navigate("/admin/pokemones/")}>Pokemones</Button>
                    </Col>
                    <Col md={1} className='d-flex flex-direction-row justify-center p-0'>
                        <Button style={{width:'100%', backgroundColor:'transparent', fontFamily:'Jost-Medium',padding:'0', fontSize:'15px', border:'none'}} onClick={() => navigate("/admin/tipos/")}>Tipos</Button>
                    </Col>
                    <Col md={1} className='d-flex flex-direction-row justify-center p-0'>
                        <Button style={{width:'100%', backgroundColor:'transparent', fontFamily:'Jost-Medium',padding:'0', fontSize:'14px',border:'none'}} onClick={() => navigate("/admin/habilidades/")}>Habilidades</Button>
                    </Col>

                    
                </Row>
                </Card.Body>
            </Card>

     );
}
 
export default HeaderAdmin;