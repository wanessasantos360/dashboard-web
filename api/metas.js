// Essa função roda no SERVIDOR (Vercel), não no navegador
// As variáveis de ambiente nunca chegam ao cliente

const BACK4APP_BASE_URL = 'https://parseapi.back4app.com/classes/Metas';

const headers = {
  'X-Parse-Application-Id': process.env.BACK4APP_APP_ID,
  'X-Parse-JavaScript-Key': process.env.BACK4APP_JS_KEY,
  'Content-Type': 'application/json'
};

export default async function handler(req, res) {
  // Habilita CORS para seu front-end acessar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ── GET: listar todas as metas ──────────────────────────────
    if (req.method === 'GET') {
      const response = await fetch(`${BACK4APP_BASE_URL}?order=-createdAt`, { headers });
      const data = await response.json();
      return res.status(200).json(data);
    }

    // ── POST: criar nova meta ───────────────────────────────────
    if (req.method === 'POST') {
      const response = await fetch(BACK4APP_BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      return res.status(201).json(data);
    }

    // ── PUT: atualizar meta (passa o id na query: /api/metas?id=xxx) ──
    if (req.method === 'PUT') {
      const { id } = req.query;
      const response = await fetch(`${BACK4APP_BASE_URL}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    // ── DELETE: excluir meta ────────────────────────────────────
    if (req.method === 'DELETE') {
      const { id } = req.query;
      const response = await fetch(`${BACK4APP_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}