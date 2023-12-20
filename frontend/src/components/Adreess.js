import React, { useState, useEffect } from 'react';
import APIService from './APIService';
import MapView from './MapView';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Adreess = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [route, setRoute] =  useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [from, to]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    APIService.GetSafestRoute(from, to)
        .then(resp => {
            setRoute(resp.route);
            setShow(true);
        })
        .catch(error => {
            console.log(error);
            setShow(false);
        })
  };

return (
    <div>
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label>From</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter starting point" 
                        value={from} 
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>To</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter destination" 
                        value={to} 
                        onChange={(e) => setTo(e.target.value)}
                    />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Get Safest Route
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
        {show && route && <MapView route={route} />}
    </div>
  );
};

export default Adreess;
