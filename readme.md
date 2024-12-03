# Front Cardapio Digital

#### Instalação
##### 1.- Install npm
Ele criará a pasta 'node_module' e todos os arquivos de dependência serão instalados com este comando. instalação npm

`npm install`
						
##### 2.- Executar projeto
Com este arquivo de comando será compilado e carregado no servidor local `http://localhost:3000`.

`npm start`
					
##### 3.- Construção de produção
Node-sass é um pacote NPM que compila Sass para CSS (o que também é feito muito rapidamente). Para instalar o node-sass execute o seguinte comando em seu terminal:

`npm run build`
						
##### 4.- Notas:
Para obter mais ajuda sobre o React.js, verifique React

##### 4.1- Mais ajuda
Você pode aprender mais na documentação do aplicativo Create React. Para aprender o React, verifique a documentação do React.

#### Sass Compile -
##### 1.- Instalar Node.js
Para compilar o Sass primeiro por meio da linha de comando, precisamos instalar o node.js. A maneira mais fácil é baixá-lo do site oficial nodejs.org, abrir o pacote e seguir o assistente.

##### 2.- Inicializar NPM
NPM é o gerenciador de pacotes de nós para JavaScript. O NPM facilita a instalação e desinstalação de pacotes de terceiros. Para inicializar um projeto Sass com NPM, abra seu terminal e CD (alterar diretório) na pasta do seu projeto.

`npm init`

Uma vez na pasta correta, execute o comando npm init. Você será solicitado a responder diversas perguntas sobre o projeto, após as quais o NPM irá gerar um arquivo package.json em sua pasta.

##### 3.- Instalar Node-Sass
Node-sass é um pacote NPM que compila Sass para CSS (o que também é feito muito rapidamente). Para instalar o node-sass execute o seguinte comando em seu terminal: npm install node-sass

`npm install node-sass`
##### 4.- Write Node-sass Command
Está tudo pronto para escrever um pequeno script para compilar o Sass. Abra o arquivo package.json em um editor de código. Você verá algo assim:

Na seção de scripts, adicione um comando scss

```
"scripts": {
  "sass": "node-sass --watch src/scss/main.scss src/css/style.css --source-map src/css/style.css.map"
},
```
##### 5.- Rodar Script
Para executar nosso script de uma linha, precisamos executar o seguinte comando no terminal: npm run sass

`npm run sass`
