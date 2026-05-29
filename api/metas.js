const BACK4APP_APP_ID   = process.env.BACK4APP_APP_ID;
const BACK4APP_JS_KEY   = process.env.BACK4APP_JS_KEY;
const BACK4APP_BASE_URL = 'https://parseapi.back4app.com/classes/Metas';

const headers = {
  'X-Parse-Application-Id': BACK4APP_APP_ID,
  'X-Parse-REST-API-Key': BACK4APP_JS_KEY,
  'Content-Type': 'application/json'
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validação de ambiente
  if (!BACK4APP_APP_ID || !BACK4APP_JS_KEY) {
    return res.status(500).json({
      error: 'Variáveis BACK4APP_APP_ID ou BACK4APP_JS_KEY não configuradas no ambiente.'
    });
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${BACK4APP_BASE_URL}?order=-createdAt`, { headers });
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const response = await fetch(BACK4APP_BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: 'Erro ao criar meta no Back4App',
          details: data
        });
      }
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID não informado.' });

      const response = await fetch(`${BACK4APP_BASE_URL}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID não informado.' });

      const response = await fetch(`${BACK4APP_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
    console.error('Erro na função /api/metas:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}