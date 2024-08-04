<h1>LucopGen</h1>

<p>LucopGen é um gerenciador de senhas nativo para desktop, desenvolvido com TauriJS e NodeJS. O projeto utiliza tecnologias modernas como Prisma e MySQL para a gestão segura de dados, juntamente com Fastify no backend para uma API rápida e eficiente. Além da versão desktop, estamos desenvolvendo uma versão mobile em Flutter e uma extensão para o Google Chrome. O LucopGen também conta com um gerador de senhas complexas embutido, permitindo a criação de senhas fortes e seguras com facilidade.</p>

<!-- Exemplo de imagens -->
<img src="/public/images/lucopgen00.png" alt="Tela Inicial" style="max-width: 100%; height: auto;">

<h2>Recursos</h2>
<ul>
  <li><strong>Gerenciamento Seguro de Senhas</strong>: Armazene, organize e acesse suas senhas com segurança.</li>
  <li><strong>Gerador de Senhas Complexas</strong>: Crie senhas fortes e seguras diretamente pelo LucopGen.</li>
  <li><strong>Aplicativo Nativo</strong>: Desenvolvido com TauriJS, LucopGen é rápido, leve e nativo para desktop.</li>
  <li><strong>Backend Eficiente</strong>: Utiliza NodeJS e Fastify para uma API robusta e rápida.</li>
  <li><strong>Persistência de Dados</strong>: Prisma e MySQL garantem uma gestão segura e eficiente dos dados.</li>
  <li><strong>Multiplataforma</strong>: Versão mobile em desenvolvimento usando Flutter, e uma extensão para Google Chrome também em andamento.</li>
</ul>

<!-- Outra imagem exemplo -->
<img src="/public/images/lucopgen01.png" alt="Gerador de Senhas" style="max-width: 100%; height: auto;">

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>Frontend Desktop</strong>: <a href="https://tauri.app/">TauriJS</a> para criação de aplicações desktop nativas.</li>
  <li><strong>Backend</strong>: <a href="https://nodejs.org/">NodeJS</a>, <a href="https://www.fastify.io/">Fastify</a> para um servidor rápido e minimalista. O código do backend está disponível no <a href="https://github.com/lucopdev/lucopgen-backend">repositório oficial</a>.</li>
  <li><strong>ORM</strong>: <a href="https://www.prisma.io/">Prisma</a> para gerenciamento de banco de dados.</li>
  <li><strong>Banco de Dados</strong>: <a href="https://www.mysql.com/">MySQL</a> para persistência segura de dados.</li>
  <li><strong>Mobile (Em Desenvolvimento)</strong>: <a href="https://flutter.dev/">Flutter</a> para suporte em dispositivos móveis.</li>
  <li><strong>Extensão Chrome (Em Desenvolvimento)</strong>: Em breve, LucopGen estará disponível como uma extensão para o navegador Google Chrome.</li>
</ul>

<!-- Mais uma imagem exemplo -->
<img src="/public/images/lucopgen02.png" alt="Versão Mobile" style="max-width: 100%; height: auto;">

<h2>Instalação e Configuração</h2>

<h3>Pré-requisitos</h3>
<ul>
  <li>Node.js v16.x ou superior</li>
  <li>MySQL 8.x ou superior</li>
  <li><a href="https://tauri.app/v1/guides/getting-started/prerequisites">Tauri CLI</a> para desenvolvimento e construção do aplicativo desktop</li>
</ul>

<h3>Passos para Instalação</h3>
<ol>
  <li><strong>Clone o Repositório</strong>:
    <pre><code>git clone https://github.com/seu-usuario/lucopgen.git
cd lucopgen
</code></pre>
  </li>
  <li><strong>Instale as Dependências</strong>:
    <pre><code>npm install
</code></pre>
  </li>
  <li><strong>Configure o Banco de Dados</strong>:
    <p>Configure suas variáveis de ambiente no arquivo <code>.env</code>, incluindo as credenciais do MySQL e a URL do banco de dados. Exemplo:</p>
    <pre><code>DATABASE_URL="mysql://user:password@localhost:3306/lucopgen"
</code></pre>
  </li>
  <li><strong>Execute as Migrações do Banco de Dados</strong>:
    <pre><code>npx prisma migrate dev
</code></pre>
  </li>
  <li><strong>Inicie o Backend</strong>:
    <pre><code>npm run dev
</code></pre>
  </li>
  <li><strong>Inicie o Frontend (Tauri)</strong>:
    <pre><code>npm run tauri dev
</code></pre>
  </li>
</ol>

<h3>Construindo a Aplicação</h3>
<p>Para construir a aplicação desktop:</p>
<pre><code>npm run tauri build
</code></pre>

<h2>Contribuição</h2>
<p>Sinta-se à vontade para contribuir com o LucopGen! Para reportar problemas ou sugerir melhorias, por favor, abra uma <a href="https://github.com/seu-usuario/lucopgen/issues">issue</a>. Para contribuições de código, siga os passos abaixo:</p>
<ol>
  <li>Faça um fork do repositório.</li>
  <li>Crie uma nova branch para sua feature ou correção de bug (<code>git checkout -b feature/nova-feature</code>).</li>
  <li>Commit suas mudanças (<code>git commit -am 'Adiciona nova feature'</code>).</li>
  <li>Push para a branch (<code>git push origin feature/nova-feature</code>).</li>
  <li>Abra um Pull Request.</li>
</ol>

<h2>Roadmap</h2>
<ul>
  <li>[x] Versão Desktop com TauriJS</li>
  <li>[x] Gerador de Senhas Complexas</li>
  <li>[ ] Aplicativo Mobile com Flutter</li>
  <li>[ ] Extensão para Google Chrome</li>
  <li>[ ] Integração com Serviços de Terceiros (e.g., Google Drive para backup)</li>
  <li>[ ] Suporte a Login Biométrico</li>
</ul>

<h2>Licença</h2>
<p>Este projeto está licenciado sob a Licença MIT - veja o arquivo <code><a href="LICENSE">LICENSE</a></code> para mais detalhes.</p>

<h2>Contato</h2>
<p>Para mais informações ou suporte, entre em contato pelo email: <code>lucopdev@gmail.com</code>.</p>
