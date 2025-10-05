# PGATS-02 API Tests

## Introdução

Este repositório contém os testes automatizados da aplicação [PGATS-02
API](https://github.com/Weberthsm/pgats-02-api).\
Foram implementados testes de integração e de performance com foco em qualidade e estabilidade da aplicação.

## Tecnologias utilizadas

-   **JavaScript** → Linguagem base dos testes
-   **Mocha** → Framework de testes
-   **Chai** → Biblioteca de asserções
-   **Supertest** → Testes de integração de endpoints HTTP
-   **Mochawesome** → Geração de relatórios em HTML e JSON
-   **Dotenv** → Gerenciamento de variáveis de ambiente
-   **K6** → Testes de performance

## Estrutura do repositório

    fixtures/   → Massa de dados e arquivos JSON usados nos testes
    helpers/    → Funções utilitárias de apoio aos testes
    tests/      → Cenários e especificações de testes (integração e performance)
    readme/     → Documentação do projeto

## Objetivo de cada grupo de arquivos

-   **fixtures/** → Centraliza dados mockados para reutilização nos
    testes.
-   **helpers/** → Contém funções auxiliares que abstraem lógica
    repetitiva.
-   **tests/** → Onde ficam os testes de fato, organizados por escopo
    (integração e performance).
-   **readme/** → Pasta para armazenar documentação do projeto.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione a variável
obrigatória:

    BASE_URL=http://localhost:3000

## Instalação e execução do projeto

1.  Clone este repositório:

    ``` bash
    git clone https://github.com/Weberthsm/pgats-02-api-tests.git
    ```

2.  Acesse ou crie a  pasta do projeto em seu computador:

    ``` bash
    cd pgats-02-api-tests
    ```

3.  Instale as dependências:

    ``` bash
    npm install
    ```

4.  Configure o arquivo `.env` conforme mostrado acima.

### Executando os testes

-   **Testes de integração:**

    ``` bash
    npm run integration
    ```

-   **Testes de performance:**

    ``` bash
    npm run performance
    ```

### Relatórios com Mochawesome

Após a execução dos testes de integração, um relatório será gerado
automaticamente.\
Por padrão, ele fica disponível na pasta:

    ./mochawesome-report/mochawesome.html

Para visualizar: - Abra o arquivo `mochawesome.html` no navegador.

### Relatórios de performance (K6)

O K6 possui suporte a dashboards e exportação de relatórios.\
Você pode acompanhar os testes de performance em tempo real e exportar
os resultados com variáveis de ambiente do próprio K6. Exemplo:

``` bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js
```

-   **K6_WEB_DASHBOARD=true** → Habilita o dashboard em tempo real no
    navegador.\
-   **K6_WEB_DASHBOARD_EXPORT=html-report.html** → Exporta o relatório
    para um arquivo HTML.\
-   **k6 run tests/login.test.js** → Executa o teste de performance
    desejado.

Após a execução, abra o arquivo exportado (`html-report.html`) no
navegador para visualizar o relatório completo.

------------------------------------------------------------------------
