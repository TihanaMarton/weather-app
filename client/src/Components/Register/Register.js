import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import style from './Register.module.css'
import axios from '../../Axios/ApiAxios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState([]);
  let history = useHistory();

  const registerHandler = (e) => {
    e.preventDefault();

    let regTest = {
      upper: /[A-Z]/,
      lower: /[a-z]/,
      digit: /\d/,
      special: /[^A-Za-z0-9]/
    }

    if (password.length < 8
      || regTest.upper.test(password) === false
      || regTest.lower.test(password) === false
      || regTest.digit.test(password) === false
      || regTest.special.test(password) === false
    ) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('')
      }, 5000);
      return setError("Your password must be at least 8 characters long at least one number, one special character and uppercase character.")

    }
    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('')
      }, 5000);
      return setError('Passwords do not match')
    }
    if (error.length > 0) {
      setError('Registration failed, please try again')
    }
    else {
      const user = {
        email,
        password,
        confirmPassword
      };

      axios.post('/auth/register', { email, password, confirmPassword })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    };
    history.push('/login')
  }

  return (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col lg='6'>
          <Card border='secondary'>
            <Card.Header className='text-dark '>Create Account</Card.Header>
            <Card.Body className='card-body'>
              <Form >
                <Form.Group>
                  <Form.Control
                    type='email'
                    placeholder='Enter e-mail'
                    autoFocus required value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className={style.errorMsg}>
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    autoFocus required value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  <Form.Text className={style.errorMsg}>{error}
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    autoFocus required value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                  <Form.Text className={style.errorMsg}>{error}
                  </Form.Text>
                </Form.Group>
                <Button variant='warning' type='button'
                  onClick={registerHandler}
                >
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;