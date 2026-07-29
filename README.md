# Portfólio — Israel Gonçalves

Portfólio profissional full stack para apresentar trajetória acadêmica, competências, projetos e pesquisa. A interface usa Next.js e consome exclusivamente uma API REST Flask; o conteúdo fica centralizado em JSON e pode migrar futuramente para PostgreSQL sem acoplar as rotas à fonte de dados.

## Tecnologias

- Front-end: Next.js, React, TypeScript, Tailwind CSS, Framer Motion e Lucide
- Back-end: Python, Flask, Flask-CORS, Blueprints e Gunicorn
- Infraestrutura: Docker e Docker Compose
- Qualidade: ESLint, TypeScript e Pytest

## Estrutura

```text
.
├── frontend/
│   ├── app/                 # Rotas, metadata, SEO e estados globais
│   ├── components/          # Seções e componentes reutilizáveis
│   ├── services/            # Cliente da API Flask
│   ├── types/               # Contratos TypeScript
│   └── public/
│       └── projects/        # Thumbnails locais
├── backend/
│   ├── app/
│   │   ├── data/            # Conteúdo JSON editável
│   │   ├── routes/          # Blueprint e endpoints REST
│   │   ├── schemas/         # Validação de entrada
│   │   └── services/        # Acesso a conteúdo e contatos
│   ├── tests/
│   └── run.py
└── docker-compose.yml
```

## Requisitos

- Node.js 20 ou superior (recomendado: Node.js 22)
- npm 10 ou superior
- Python 3.11 ou superior
- Docker com Compose, opcional

## Instalação local

### Back-end

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
python run.py
```

A API estará em `http://localhost:5000/api`. Verifique em `http://localhost:5000/api/health`.

### Front-end

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

O site estará em `http://localhost:3000`.

## Execução com Docker

Na raiz do repositório:

```bash
docker compose up --build
```

O front-end fica na porta `3000` e a API na porta `5000`. As mensagens do formulário são persistidas no volume Docker `contact_data`.

## Onde editar o conteúdo

Os arquivos em `backend/app/data/` são a fonte central:

- `profile.json`: apresentação, headline, localização e disponibilidade
- `skills.json`: grupos de competências
- `projects.json`: cards, filtros, links e imagens dos projetos
- `experiences.json`: linha do tempo
- `education.json`: formação e conquistas
- `featured_research.json`: destaque do Campo Escola Digital
- `social_links.json`: GitHub e LinkedIn

Depois de alterar JSON durante o desenvolvimento, reinicie a API para limpar o cache em memória.

### Adicionar um projeto do GitHub

Adicione um objeto em `backend/app/data/projects.json` seguindo os objetos existentes. Use apenas resultados e links verificáveis. Preencha `repositoryUrl`, defina `placeholder` como `false` e selecione uma categoria compatível com os filtros. Se criar uma categoria diferente, inclua-a também em `frontend/components/projects.tsx`.

### Adicionar imagens

Coloque arquivos otimizados em `frontend/public/projects/` e informe o caminho `/projects/nome-do-arquivo.webp` no campo `image`. Prefira WebP ou AVIF, proporção 16:9 e imagens sem material protegido de terceiros.

### Adicionar o currículo

Substitua o arquivo provisório em:

```text
frontend/public/curriculo-israel-goncalves.pdf
```

Mantenha exatamente esse nome para que o botão continue funcionando. Antes de publicar, confirme que o PDF não contém endereço, documentos ou outros dados pessoais que você não queira tornar públicos.

## Variáveis de ambiente

Front-end (`frontend/.env.local`):

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL da API acessível pelo navegador |
| `INTERNAL_API_URL` | URL usada pelo servidor Next.js; útil no Docker |
| `NEXT_PUBLIC_SITE_URL` | URL pública final para metadata, sitemap e robots |

Back-end (`backend/.env` ou ambiente):

| Variável | Uso |
| --- | --- |
| `FLASK_HOST` / `FLASK_PORT` | Interface e porta do servidor local |
| `FLASK_DEBUG` | Ativa debug somente em desenvolvimento |
| `CORS_ORIGINS` | Origens permitidas, separadas por vírgula |
| `CONTACT_LOG_PATH` | Arquivo JSONL das mensagens recebidas |
| `CONTACT_TO_EMAIL` | Endereço que recebe as mensagens do formulário |
| `RESEND_API_KEY` | Chave de API do Resend; mantenha somente no ambiente |
| `RESEND_FROM_EMAIL` | Remetente em um domínio verificado no Resend |

Nenhuma variável secreta deve começar com `NEXT_PUBLIC_`.

## API

Todos os endpoints respondem com `{ "success", "data", "error" }`.

- `GET /api/profile`
- `GET /api/skills`
- `GET /api/projects`
- `GET /api/experiences`
- `GET /api/education`
- `GET /api/social-links`
- `GET /api/featured-research`
- `POST /api/contact`
- `GET /api/health`

O formulário valida os campos nos dois lados, limita a mensagem a 2.000 caracteres e usa um honeypot simples. As mensagens são enviadas por e-mail com o Resend e, após o envio, também registradas em JSONL como cópia local. Para produção, crie uma chave com permissão de envio, verifique seu domínio no Resend e configure `RESEND_API_KEY` e `RESEND_FROM_EMAIL`.

## Verificações

```bash
cd frontend
npm run lint
npm run typecheck
npm run build

cd ../backend
source .venv/bin/activate
pytest
```

## Publicação

- Front-end: Vercel, Cloudflare Pages (com adapter adequado) ou container em qualquer plataforma Node.js.
- Back-end: Render, Railway, Fly.io, AWS ou outro host de containers/Python.
- Projeto completo: uma VM ou serviço de containers com o `docker-compose.yml`.

Em produção, configure HTTPS, URL pública da API, CORS restrito ao domínio final e armazenamento persistente. Para receber contatos em escala, substitua o JSONL por PostgreSQL e um provedor de e-mail transacional configurado explicitamente.

## Checklist antes de publicar

- [ ] Substituir o PDF provisório pelo currículo final
- [ ] Trocar projetos de exemplo por informações e links verificáveis
- [ ] Adicionar thumbnails reais e otimizadas
- [ ] Configurar `NEXT_PUBLIC_SITE_URL`, URLs da API e `CORS_ORIGINS`
- [ ] Testar formulário, links externos e download do currículo
- [ ] Revisar ortografia, datas e informações acadêmicas
- [ ] Executar lint, typecheck, build e testes
- [ ] Testar celular, tablet, desktop e navegação por teclado
- [ ] Validar contraste, metadata, sitemap e Open Graph
- [ ] Definir persistência/backup das mensagens de contato

## Licença e privacidade

O conteúdo pessoal pertence a Israel Gonçalves. Antes de reutilizar ou publicar, revise os dados expostos e as políticas da plataforma de hospedagem.
