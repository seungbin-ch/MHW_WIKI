document.addEventListener("DOMContentLoaded", function () {
  const monsters = [
    {
      name: "차타카브라",
      description: "전와",
      image: "./images/Monsters/Chatacabra.jpg",
    },
    {
      name: "케마트리스",
      description: "염미룡",
      image: "./images/Monsters/Quematrice.jpg",
    },
    {
      name: "라바라 바리나",
      description: "자화지주",
      image: "./images/Monsters/LalaBarina.jpg",
    },
    {
      name: "바바콩가",
      description: "모도수",
      image: "./images/Monsters/Congalala.jpg",
    },
    {
      name: "발라하라",
      description: "사해룡",
      image: "./images/Monsters/Balahara.webp",
    },
  ];

  const cardsPerPage = 4;
  let currentPage = 1;
  let filteredMonsters = monsters;

  const monsterGrid = document.getElementById("monsterGrid");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
  const searchInput = document.getElementById("monsterSearch");

  // 카드 렌더링 함수
  function renderPage(page) {
    monsterGrid.innerHTML = "";
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const currentMonsters = filteredMonsters.slice(start, end);

    currentMonsters.forEach((monster, index) => {
      const col = document.createElement("div");
      col.className = "col";
      col.innerHTML = `
        <div class="card">
          <img src="${monster.image}" class="card-img-top" alt="${monster.name}">
          <div class="card-body">
            <h5 class="card-title">${monster.name}</h5>
            <p class="card-text">${monster.description}</p>
          </div>
        </div>
      `;
      monsterGrid.appendChild(col);
    });

    prevPage.disabled = page === 1;
    nextPage.disabled = end >= filteredMonsters.length;
  }

  // 검색 기능
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderPage(currentPage);
  });

  // 페이지네이션 버튼 이벤트
  prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextPage.addEventListener("click", () => {
    if (currentPage * cardsPerPage < filteredMonsters.length) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  // 초기 렌더링
  renderPage(currentPage);
});
