### O projeto foi configurado o docker para o backend, frontend e mongoDB.

-   Na raiz do projeto tem o .env onde ira precisar colocar usuário e senha (**MONGO_USERNAME** e **MONGO_PASSWORD**) para o mongoDB do docker.
-   Dentro do projeto backend tera um **.env.example** copie e cole ou renomeie para **.env** e coloque as credenciais do mongoDB em **seu_usuario** e **sua_senha**, caso queira modificar o nome do banco de dados poderá mudar em **db_arbo**.
-   Existe um **.env** no frontend porém sera apenas para modo **desenvolvedor**, pois o projeto usa a variável que esta dentro de **docker-compose.yml** variável **REACT_APP_BACKEND_URL**.
-   Apos realizar todos o processo no terminal vá para a pasta raiz do projeto onde se encontra o docker-compose.yml e executar o comando **docker-compose up** caso rodar em background (sem ocupar o terminal) use a flag -d **docker-compose up -d**
-   URL backend http://localhost:5000 e para documentação http://localhost:5000/api-docs
-   URL frontend http://localhost:3000 para pagina de Imoveis (Listagem,Adicionar,Editar e Deletar)

### Executar projetos sem o Docker

**Backend**

-   Na pasta backend renomeie o **.env.example** para **.env** e colocar a a url do mongoDB e credenciais em **URL_MONGODB**.
-   Instale as dependências executando **npm install** no terminal onde esta o projeto backend esta localizado.
-   Poderá executar como desenvolvedor **npm run dev** ou fazer um build e start **npm run build** e **npm run start**.
-   URL do projeto sera http://localhost:5000 e para a documentação do swagger http://localhost:5000/api-docs

**Frontend**

-   Na pasta frontend-arbo renomeio o **.env.example** para **.env** e coloque a url do backend para a api do axios **REACT_APP_BACKEND_URL**
-   Instale as dependências executando **npm install** no terminal onde esta o projeto frontend-arbo esta localizado.
-   Poderá executar como desenvolvedor **npm run start** ou fazer um build com **npm run build** e para executar poderá instalar uma dependência global **npm install -g serve** e executar com **serve -s build** no terminal onde o projeto do frontend esta localizado.
-   URL do projeto sera http://localhost:3000 para pagina de Imoveis (Listagem,Adicionar,Editar e Deletar)
