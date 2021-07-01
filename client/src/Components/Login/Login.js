import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import style from "./Login.module.css";
import axios from '../../Axios/ApiAxios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('')
  let history = useHistory();

  const handleButton = () => {
    if (!email) {
      setEmail('')
      setTimeout(() => {
        setEmailError('')
      }, 5000);
      return setEmailError('Please enter e-mail')
    }

    if (!password) {
      setPassword('')
      setTimeout(() => {
        setPasswordError('')
      }, 5000);
      return setPasswordError('Please enter password')
    }

    axios
      .post('auth/login', { email, password })
      .then(response => {
        localStorage.setItem('x-token', `${response.data.token}`)
        history.push('/weather')
      })
      .catch(err => {
        setPassword('')
        setPasswordError('User not found')
        setEmail('');
        setEmailError('User not found')
      });
  };

  return (
    <div >
      <Container className={style.container}>
        <Row className='justify-content-center mt-5'>
          <Col lg='6' className='text-center'>
            <Form className='mt-5'>
              <Form.Group>
                <Form.Label className={style.labelLetters}>User</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter e-mail'
                  autoFocus required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className={style.errorMsg}>{emailError}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label className={style.labelLetters}>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  autoFocus required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className={style.errorMsg}>{passwordError}
                </Form.Text>
              </Form.Group>
              <p className={style.smallLetters}>Don't have an account? <Link to={"/register"} className={style.register}>Register</Link> </p>
              <Button variant='warning' type='button'
                onClick={handleButton}
              >
                Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Login;