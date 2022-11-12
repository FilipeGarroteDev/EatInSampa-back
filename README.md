
<div align="center">
  <img src="src/assets/logo-eatinsampa.png" />
</div>

# EatInSampa - back-end

Repositório back-end para a aplicação EatInSampa


## Sobre

EatInSampa é uma aplicação através da qual é possível adicionar e avaliar restaurantes da cidade de São Paulo. Com essa API, desenvolvida inteiramente em TypeScript, é possível listar o ranking dos restaurantes mais bem avaliados da cidade, bem como deletar ou alterar as informações cosntantes do restaurante e/ou a nota dada pelo usuário. Em cada restaurante, é mostrado seu nome, à qual categoria pertence, a média de sua nota (que estará entre 0 e 5 estrelas) e a quantidade total de avaliações feitas.


## Documentação

Para acessar a documentação da API, basta acessar esse link: https://disco-pink-413.notion.site/POC-EatInSampa-API-3d24fc15020445dabc94f5a1059f6d87


## Como rodar a aplicação?

1. Clone esse repositório
2. Instale todas as dependências

```bash
npm i
```

3. Crie um banco de dados no PostgreSQL com o nome que desejar.
4. Configure o arquivo `.env` usando, como exemplo, o arquivo `.env.example` 

5. Alimente o banco de dados criado:
  a. Acesse o PGAdmin;
  b. Clique com o botão direito do mouse sobre o banco de dados criado;
  c. Selecione "Restore";
  d. No campo Filename, selecione o arquivo dump.sql, salvo na raiz desse repositório;
  e. clique em "Restore;

6. Rode o back-end em ambiente de desenvolvimento:

```bash
npm run dev
```
