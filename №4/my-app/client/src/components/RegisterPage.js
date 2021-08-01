import React, {useState} from 'react'
import {Container, Row, Col,Card, Form, Button, Alert} from 'react-bootstrap'
import {useHttp} from '../hooks/http'

export function RegisterPage() {
    const { loading, error, req} = useHttp()
    const [form, setForm] = useState({ name: '', email: '', password: ''})
    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const registerHandler = async () => {
        try{

            const data = await req('http://localhost:2208/auth/register', 'POST', {...form})
        }catch(e) {
            
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center"> 
                <Col md='auto'>
                <Card className="bg-secondary text-white" style={{ width: '28rem' }}>
                <Card.Header>My App</Card.Header>
                
                <Card.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name" 
                        required 
                        onChange ={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Enter email" 
                        required 
                        onChange ={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        required
                        onChange ={changeHandler}
                        />
                    </Form.Group>
                    {!!error   &&  <Alert variant='warning'>{error}</Alert>}
                    <Button 
                    className="mb-3" 
                    variant="primary" 
                    size="sm" 
                    type="submit"
                    onClick = {registerHandler}
                    disabled={loading}
                    >
                        Registration
                    </Button>{'   '}
                    <Button className="mb-3" variant="warning" size="sm" type="button" disabled={loading}>
                        Sign In
                    </Button>
                    </Form>

                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}