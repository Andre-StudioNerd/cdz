document.addEventListener("DOMContentLoaded", () => {
  const gridPrincipais = document.getElementById("grid-bronze-principais");
  const gridSecundarios = document.getElementById("grid-bronze-secundarios");
  const modal = document.getElementById("modal-personagem");
  const modalConteudo = document.getElementById("modal-conteudo");
  const btnFechar = document.getElementById("btn-fechar");

  if (typeof cavaleiros === "undefined") {
    console.error("Base de dados 'cavaleiros' não foi carregada.");
    return;
  }

  // Função para gerar o HTML do card
  // Altere o método 'criarCardHTML' no scripts.js para apontar para a nova página
  function criarCardHTML(c) {
    return `
    <div class="col-2 col-4-medium col-6-small">
      <section>
        <a href="personagem.html?id=${c.id}" class="bordered-feature-image">
          <img src="${c.imagem}" alt="${c.nome}" />
        </a>
        <h2 style="text-align: center;">
          <a href="personagem.html?id=${c.id}">${c.nome}</a>
        </h2>
      </section>
    </div>
  `;
  }

  // Renderiza no grid correspondente
  function carregarGrids() {
    if (gridPrincipais) {
      gridPrincipais.innerHTML = cavaleiros
        .filter((c) => c.categoria === "principal")
        .map(criarCardHTML)
        .join("");
    }

    if (gridSecundarios) {
      gridSecundarios.innerHTML = cavaleiros
        .filter((c) => c.categoria === "secundario")
        .map(criarCardHTML)
        .join("");
    }

    // Atribui evento de clique para abrir o modal
    document.querySelectorAll(".card-personagem").forEach((elemento) => {
      elemento.addEventListener("click", (e) => {
        e.preventDefault();
        const id = elemento.getAttribute("data-id");
        abrirDetalhes(id);
      });
    });
  }

  function abrirDetalhes(id) {
    const c = cavaleiros.find((p) => p.id === id);
    if (!c || !modal || !modalConteudo) return;

    modalConteudo.innerHTML = `
      <h2 style="text-align: center;">${c.nome}</h2>
      <div style="text-align: center; margin-bottom: 15px;">
        <img src="${c.imagem}" alt="${c.nome}" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p><strong>Armadura:</strong> ${c.armadura}</p>
      <p><strong>Constelação:</strong> ${c.constelacao}</p>
      <p><strong>Golpes:</strong> ${Array.isArray(c.golpes) ? c.golpes.join(", ") : c.golpes}</p>
      <p>${c.descricao}</p>
    `;

    modal.showModal();
  }

  if (btnFechar && modal) {
    btnFechar.addEventListener("click", () => modal.close());
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  }

  carregarGrids();
});
