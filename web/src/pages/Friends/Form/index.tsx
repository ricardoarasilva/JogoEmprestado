import React, { useEffect, useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import * as yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import FriendsRepository from '../../../repositories/friends.repository';
import { Formik } from 'formik';
import { Button, Col, Form } from 'react-bootstrap';

const schema = yup.object({
  fullname: yup.string().required(),
  address: yup.string()
})

function FormFriend() {

  const history = useHistory();

  const {friendId}:{friendId:string} = useParams();

  const [friend, setFriend] = useState({
    fullname: '',
    address: ''
  });

  useEffect(() => {

    const friendsRepository = new FriendsRepository();
    
    if(friendId){
      friendsRepository.getFriend(friendId).then(response => {
        setFriend(response.data);
      });
    }
  },[friendId]);

  return (
    <PageLayout>
      {
        !!friendId && <h1>Editar Amigo - {friendId}</h1>
      }
      {
        !friendId && <h1>Novo Amigo</h1>
      }
      <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            const friendRepo = new FriendsRepository();
            try{
              await friendRepo.saveFriend({
                id: friendId,
                fullname: values.fullname,
                address: values.address
              });

              history.push("/friends");

            } catch (err) {
              console.log("ERROR",err);
            }
          }}
          enableReinitialize={true}
          initialValues={friend}
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
                  <Form.Group as={Col} controlId="Fullname">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullname"
                      value={values.fullname}
                      onChange={handleChange}
                      isInvalid={!!errors.fullname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullname}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="Address">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Button type="submit">Gravar</Button>{' '}
                <Button variant="secondary" href="/friends">Voltar</Button>
              </Form>
            )
          }
        </Formik>
    </PageLayout>
  )
}

export default FormFriend;