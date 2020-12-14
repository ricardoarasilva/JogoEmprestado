# JogoEmprestado

Esse projeto foi desenvolvido utilizando como linguagem para API RestFul o dotnet core 3.1, banco de dados MongoDB e front-end em ReactJS.

Foram desenvolvidos alguns testes para os controllers da API que são executados automaticamente através de um JOB de CI configurado nesse diretório do gitbub.

Para executar o projeto basta executar o comando:

```docker
docker-compose up -d
```

Será gerado 4 containers sendo eles:

* Banco de dados mongodb na porta 27017
* Mongo DB Express na porta 8081 acessivel pelo endereço http://localhost:8081
* API RestFul dotnet core acessível através da porta 5000 no endereço http://localhost:5000/swagger para visualizar a documentação.
* Front-end ReactJS na porta 8080 acessível através do endereço http://localhost:8080

## Dados de acesso

Os dados de acesso estão configurados no arquivo docker-compose.yml e por padrão será User: admin e Password: admin123:

```docker
UserApi: admin
PasswordApi: admin123
RoleApi: admin
```

