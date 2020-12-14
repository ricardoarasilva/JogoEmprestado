import { Formik } from 'formik';
import { Button, Col, Form } from 'react-bootstrap';
import React from 'react';
import * as yup from 'yup';

import './styles.css';
import { login } from '../../services/auth';
import { useHistory } from 'react-router-dom';
import AuthenticationRepository from '../../repositories/authentication.repository';

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
});

function Login() {

  const history = useHistory();

  return (
    <main id="login-page">
      <div id="login-container">
        <h1>Jogo Emprestado - Login</h1>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            const authRepository = new AuthenticationRepository();
            try{
              const response = await authRepository.doAuthentication(values.username,values.password);
              
              login(response.data.token);

              history.push("/");

            } catch (err) {
              console.log("ERROR",err);
            }
          }}
          initialValues={{
            username: '',
            password: ''
          }}
        >
          {
            ({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="UserName">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="UserName">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Button type="submit">Entrar</Button>
              </Form>
            )
          }
        </Formik>
      </div>
    </main>
  )
}

export default Login;