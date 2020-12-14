import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import PageLayout from '../../../components/PageLayout';
import Friend from '../../../models/friend';
import FriendsRepository from '../../../repositories/friends.repository';

function ListFriends() {

  const [friends, setFriends] = useState([]);

  function loadFriends() {
    const friendsRepo = new FriendsRepository();

    friendsRepo.getAllFriends().then(response => {

      setFriends(response.data);
    });
  }

  useEffect(() => {
    loadFriends();
  },[]);

  function removeFriend(friendId:string) {
    try{
      const friendsRepo = new FriendsRepository();

      friendsRepo.removeFriend(friendId).then(() => loadFriends());

    }
    catch(err){
      console.log("ERROR",err);
    }
  }

  return (
    <PageLayout>
      <h1>Meus Amigos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            friends.map((friend: Friend) => {
              return (
                <tr key={friend.id}>
                  <td>{friend.id}</td>
                  <td>{friend.fullname}</td>
                  <td>{friend.address}</td>
                  <td>
                    <Button href={'friend/'+friend.id+'/edit'}>Editar</Button>
                  </td>
                  <td>
                    <Button onClick={() => removeFriend(friend.id)}>Remover</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <Row>
        <Col>
          <Button href="/friend/new">New Friend</Button>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default ListFriends;