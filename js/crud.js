// ============================
// CONFIGURAÇÃO DO BACK4APP
// ============================
const BACK4APP_APP_ID    = process.env.BACK4APP_APP_ID || 'SEU_APP_ID_AQUI';
const BACK4APP_JS_KEY    = process.env.BACK4APP_JS_KEY || 'SEU_JS_KEY_AQUI';
const BACK4APP_BASE_URL  = process.env.BACK4APP_BASE_URL || 'https://parseapi.back4app.com/classes/Metas';

const headers = {
  'X-Parse-Application-Id': BACK4APP_APP_ID,
  'X-Parse-JavaScript-Key': BACK4APP_JS_KEY,
  'Content-Type': 'application/json'
};

// ============================
// CREATE
// ============================
async function createMeta(mes, valor, realizado) {
  const res = await fetch(BACK4APP_BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ mes, valor: parseFloat(valor), realizado: parseFloat(realizado) })
  });
  if (!res.ok) throw new Error('Erro ao criar meta');
  return res.json();
}

// ============================
// READ
// ============================
async function getMetas() {
  const res = await fetch(BACK4APP_BASE_URL + '?order=-createdAt', { headers });
  if (!res.ok) throw new Error('Erro ao buscar metas');
  const data = await res.json();
  return data.results;
}

// ============================
// UPDATE
// ============================
async function updateMeta(objectId, mes, valor, realizado) {
  const res = await fetch(`${BACK4APP_BASE_URL}/${objectId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ mes, valor: parseFloat(valor), realizado: parseFloat(realizado) })
  });
  if (!res.ok) throw new Error('Erro ao atualizar meta');
  return res.json();
}

// ============================
// DELETE
// ============================
async function deleteMeta(objectId) {
  const res = await fetch(`${BACK4APP_BASE_URL}/${objectId}`, {
    method: 'DELETE',
    headers
  });
  if (!res.ok) throw new Error('Erro ao deletar meta');
  return res.json();
}

// ============================
// RENDERIZAR TABELA
// ============================
async function renderMetas() {
  const tbody = document.getElementById('metasTableBody');
  tbody.innerHTML = '<tr><td colspan="5" class="text-center">Carregando...</td></tr>';
  try {
    const metas = await getMetas();
    if (metas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Nenhuma meta cadastrada.</td></tr>';
      return;
    }
    tbody.innerHTML = metas.map(m => {
      const pct = m.valor > 0 ? ((m.realizado / m.valor) * 100).toFixed(1) : '0';
      const badge = pct >= 100 ? 'success' : pct >= 70 ? 'warning' : 'danger';
      return `
        <tr>
          <td>${m.mes}</td>
          <td>R$ ${m.valor.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
          <td>R$ ${m.realizado.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
          <td><span class="badge bg-${badge}">${pct}%</span></td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" onclick="openEdit('${m.objectId}','${m.mes}',${m.valor},${m.realizado})">Editar</button>
            <button class="btn btn-sm btn-outline-danger" onclick="confirmDelete('${m.objectId}')">Excluir</button>
          </td>
        </tr>`;
    }).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-danger text-center">${err.message}</td></tr>`;
  }
}

// ============================
// FORMULÁRIO - SUBMIT
// ============================
document.getElementById('metaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const mes       = document.getElementById('metaMes').value.trim();
  const valor     = document.getElementById('metaValor').value;
  const realizado = document.getElementById('metaRealizado').value;
  if (!mes || !valor || !realizado) return alert('Preencha todos os campos.');
  try {
    await createMeta(mes, valor, realizado);
    e.target.reset();
    renderMetas();
  } catch (err) {
    alert(err.message);
  }
});

// ============================
// EDITAR - ABRIR MODAL
// ============================
function openEdit(id, mes, valor, realizado) {
  document.getElementById('editId').value = id;
  document.getElementById('editMes').value = mes;
  document.getElementById('editValor').value = valor;
  document.getElementById('editRealizado').value = realizado;
  new bootstrap.Modal(document.getElementById('editModal')).show();
}

document.getElementById('saveEdit').addEventListener('click', async () => {
  const id        = document.getElementById('editId').value;
  const mes       = document.getElementById('editMes').value;
  const valor     = document.getElementById('editValor').value;
  const realizado = document.getElementById('editRealizado').value;
  try {
    await updateMeta(id, mes, valor, realizado);
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    renderMetas();
  } catch (err) {
    alert(err.message);
  }
});

// ============================
// DELETAR
// ============================
async function confirmDelete(id) {
  if (!confirm('Tem certeza que deseja excluir esta meta?')) return;
  try {
    await deleteMeta(id);
    renderMetas();
  } catch (err) {
    alert(err.message);
  }
}