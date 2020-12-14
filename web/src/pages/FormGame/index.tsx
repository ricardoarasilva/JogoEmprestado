import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import * as yup from 'yup';
import { Button, Col, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import GamesRepository from '../../repositories/games.repository';
import FriendsRepository from '../../repositories/friends.repository';
import Friend from '../../models/friend';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  genre: yup.string(),
  friendId: yup.string()
})

function FormGame() {
  const history = useHistory();

  const {gameId}:{gameId:string} = useParams();

  const [game, setGame] = useState({
    title: '',
    description: '',
    genre:'',
    friendId: ''
  });

  const [friends, setFriends] = useState([]);

  async function loadFriendsList() {
    const friendRepo = new FriendsRepository();

    const friendsList = (await friendRepo.getAllFriends()).data;

    setFriends(friendsList);
  }

  useEffect(() => {

    const gameRepository = new GamesRepository();
    
    loadFriendsList();
    
    if(gameId){
      gameRepository.getGame(gameId).then(response => {
        setGame(response.data);
      });
    }
  },[gameId]);

  return (
    <PageLayout>
      {
        !!gameId && <h1>Editar Jogo - {gameId}</h1>
      }
      {
        !gameId && <h1>Novo Jogo</h1>
      }
      <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            const gameRepo = new GamesRepository();
            try{

              const selectedFriend = friends.find((friend:Friend) => friend.id === values.friendId);

              await gameRepo.saveGame({
                id: gameId,
                title: values.title,
                description: values.description,
                genre: values.genre,
                friendId: values.friendId,
                borrowedTo: selectedFriend
              });

              history.push("/");

            } catch (err) {
              console.log("ERROR",err);
            }
          }}
          enableReinitialize={true}
          initialValues={game}
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
                  <Form.Group as={Col} controlId="Title">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="Genre">
                    <Form.Label>Genero</Form.Label>
                    <Form.Control
                      type="text"
                      name="genre"
                      value={values.genre}
                      onChange={handleChange}
                      isInvalid={!!errors.genre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.genre}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="Description">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="BorroedTo">
                    <Form.Label>Emprestado para</Form.Label>
                    <Form.Control as="select"
                      name="friendId"
                      value={values.friendId}
                      onChange={handleChange}
                      isInvalid={!!errors.friendId}
                    >
                      <option>Não emprestado</option>
                      {
                        friends.map((friend:Friend) => {
                          return (
                            <option key={friend.id} value={friend.id} >{friend.fullname}</option>
                          )
                        })
                      }
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.friendId}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Button type="submit">Gravar</Button>{' '}
                <Button variant="secondary" href="/">Voltar</Button>
              </Form>
            )
          }
        </Formik>
    </PageLayout>
  )
}

export default FormGame;