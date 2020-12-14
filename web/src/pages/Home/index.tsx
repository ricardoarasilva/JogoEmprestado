import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import PageLayout from '../../components/PageLayout';
import Game from '../../models/game';
import GamesRepository from '../../repositories/games.repository';



function Home() {

  const [games, setGames] = useState([]);

  function loadGames() {
    const gameRepo = new GamesRepository();
  
    gameRepo.getAllGames().then(response => {
  
      setGames(response.data);
    });
  }

  useEffect(() => {
    loadGames();
  },[]);

  function removeGame(gameId:string) {
    try{
      const gameRepo = new GamesRepository();

      gameRepo.removeGame(gameId).then(() => loadGames());

    }
    catch(err){
      console.log("ERROR",err);
    }
  }

  return (
    <PageLayout>
      <h1>Meus Jogos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Genero</th>
            <th>Emprestado para</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            games.map((game: Game) => {
              return (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{game.title}</td>
                  <td>{game.description}</td>
                  <td>{game.genre}</td>
                  <td>{game.borrowedTo ? game.borrowedTo.fullname : "Disponível"}</td>
                  <td>
                    <Button href={'game/'+game.id+'/edit'}>Editar</Button>
                  </td>
                  <td>
                    <Button onClick={() => removeGame(game.id)}>Remover</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <Row>
        <Col>
          <Button href="/game/new">New Game</Button>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default Home;


