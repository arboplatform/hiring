# Imovel Status

## Sobre o Projeto

"Imovel Status" é uma aplicação destinada a criar uma API RESTful juntamente com um layout. O objetivo é fornecer uma plataforma eficiente e fácil de usar para gerenciar informações de imóveis.

## Pré-requisitos

Antes de iniciar, certifique-se de que você tenha instalado:

- [Docker Enginer](https://docs.docker.com/engine/install/ubuntu/) e [Docker Compose](https://docs.docker.com/compose/install/standalone/)
- [Make](https://pt.linux-console.net/?p=15359)

Essas ferramentas são necessárias para executar e gerenciar o projeto.

## Executando o Projeto

Siga os passos abaixo para colocar o projeto em funcionamento em sua máquina local:

1. **Clone do projeto**:
   Execute o comando abaixo para criar o arquivo .env necessário para o projeto:

```bash
git clone git@github.com:joaoparaujocr/Imovel-status.git

#ou

git clone https://github.com/joaoparaujocr/Imovel-status.git
```

2. **Criação do arquivo .env**:
   Execute o comando abaixo para criar o arquivo .env necessário para o projeto:

```bash
cd Imovel-status
make create-env
```

3. **Build do Docker**:
   Gere o build do projeto utilizando Docker através do comando:

```bash
make build
```

4. **Subindo os Containers**:
   Para subir os containers do projeto, execute:\

```bash
make up
```

5. **Rodando as Migrações do Banco de Dados**:
   Execute as migrações do banco de dados com o seguinte comando:

```bash
make migration
```

Após a execução destes passos, os serviços devem estar ativos. Você pode acessar:

- Frontend em: [http://localhost:3000](http://localhost:3000)
- Backend em: [http://localhost:8001](http://localhost:8001)

## Suporte

## Email: araujo.joao.paulo.jaa@gmail.com

Boa sorte com seu projeto "Imovel Status"!
