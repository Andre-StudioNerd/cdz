document.addEventListener("DOMContentLoaded", () => {
  const containerDetalhes = document.getElementById("detalhes-personagem");
  const sidebarLista = document.getElementById("sidebar-lista-cavaleiros");
  const sidebarTecnicas = document.getElementById("sidebar-tecnicas");

  if (typeof cavaleiros === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const idPersonagem = urlParams.get("id");
  const c =
    cavaleiros.find((item) => item.id === idPersonagem) || cavaleiros[0];

  if (containerDetalhes) {
    // Utiliza imagemDetalhe se existir, caso contrário faz o fallback para imagem padrão
    const imagemExibida = c.imagemDetalhe || c.imagem;

    containerDetalhes.innerHTML = `
      <header>
        <h2>${c.nome}</h2>
        <h3>Armadura de ${c.armadura} | Constelação de ${c.constelacao}</h3>
      </header>
      <div class="row">
        <div class="col-4 col-4-medium col-12-small">
          <a href="#" class="bordered-feature-image">
            <img src="${imagemExibida}" alt="${c.nome}" />
          </a>
        </div>
        <div class="col-8 col-8-medium col-12-small">
          <p>${c.descricao}</p>
        </div>
      </div>
    `;
  }

  // Mantém a renderização das sidebars
  if (sidebarLista) {
    sidebarLista.innerHTML = cavaleiros
      .map(
        (item) => `
        <li>
          <a href="personagem.html?id=${item.id}" class="${item.id === c.id ? "active" : ""}">
            ${item.nome}
          </a>
        </li>
      `,
      )
      .join("");
  }

  if (sidebarTecnicas) {
    sidebarTecnicas.innerHTML = Array.isArray(c.golpes)
      ? c.golpes.map((golpe) => `<li>${golpe}</li>`).join("")
      : `<li>${c.golpes}</li>`;
  }
});
