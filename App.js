function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* CLIENTES */
function addCliente() {
  const c = {
    fazenda: fazenda.value,
    produtor: produtor.value,
    cidade: cidade.value,
    sistema: sistema.value,
    rebanho: rebanho.value,
    peso: peso.value,
    suplemento: suplemento.value,
    obs: obs.value
  };

  const lista = JSON.parse(localStorage.getItem("clientes") || "[]");
  lista.push(c);
  localStorage.setItem("clientes", JSON.stringify(lista));
  renderClientes();
}

function renderClientes() {
  const ul = document.getElementById("listaClientes");
  ul.innerHTML = "";
  const lista = JSON.parse(localStorage.getItem("clientes") || "[]");

  lista.forEach(c => {
    ul.innerHTML += `<li><b>${c.fazenda}</b> (${c.sistema}) - ${c.rebanho} cabeças</li>`;
  });
}

/* PRODUTOS */
function addProduto() {
  const p = {
    nome: pNome.value,
    categoria: pCategoria.value,
    consumo: pConsumo.value,
    preco: pPreco.value,
    indicacao: pIndicacao.value
  };

  const lista = JSON.parse(localStorage.getItem("produtos") || "[]");
  lista.push(p);
  localStorage.setItem("produtos", JSON.stringify(lista));
  renderProdutos();
}

function renderProdutos() {
  const ul = document.getElementById("listaProdutos");
  ul.innerHTML = "";
  const lista = JSON.parse(localStorage.getItem("produtos") || "[]");

  lista.forEach(p => {
    ul.innerHTML += `<li>${p.nome} - ${p.consumo}g/dia</li>`;
  });
}

/* VISITAS */
function addVisita() {
  const v = {
    cliente: vCliente.value,
    data: vData.value,
    tipo: vTipo.value,
    obs: vObs.value
  };

  const lista = JSON.parse(localStorage.getItem("visitas") || "[]");
  lista.push(v);
  localStorage.setItem("visitas", JSON.stringify(lista));
  renderVisitas();
}

function renderVisitas() {
  const ul = document.getElementById("listaVisitas");
  ul.innerHTML = "";
  const lista = JSON.parse(localStorage.getItem("visitas") || "[]");

  lista.forEach(v => {
    ul.innerHTML += `<li>${v.cliente} - ${v.data} (${v.tipo})</li>`;
  });
}

/* INDICADORES */
function calcular() {
  const animais = Number(iRebanho.value);
  const consumo = Number(iConsumo.value) / 1000; // kg
  const preco = Number(iPreco.value);

  const consumoDia = animais * consumo;
  const consumoMes = consumoDia * 30;
  const custoMes = consumoMes * preco / 30;

  resultado.innerHTML = `
    <p>Consumo/dia: ${consumoDia.toFixed(2)} kg</p>
    <p>Consumo/mês: ${consumoMes.toFixed(2)} kg</p>
    <p>Custo mensal estimado: R$ ${custoMes.toFixed(2)}</p>
  `;
}

/* INIT */
renderClientes();
renderProdutos();
renderVisitas();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
