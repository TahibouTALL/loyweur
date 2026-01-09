// Données de démonstration pour Loyweur
// Chaque annonce possède un identifiant unique, un titre, une description,
// un prix (0 pour « À négocier »), une catégorie, une localisation et une image.
const ads = [
  {
    id: 1,
    title: "Voiture Toyota Corolla 2015",
    description: "Climatisation, bon état, 120\u00a0000 km.",
    price: 2500000,
    currency: "FCFA",
    category: "vehicles",
    location: "Dakar",
    image: "https://placehold.co/400x250?text=Voiture"
  },
  {
    id: 2,
    title: "Appartement 2 pièces à louer",
    description: "Appartement lumineux au centre-ville, 2 chambres, cuisine équipée.",
    price: 350000,
    currency: "FCFA",
    category: "real_estate",
    location: "Thiès",
    image: "https://placehold.co/400x250?text=Appartement"
  },
  {
    id: 3,
    title: "Smartphone Samsung Galaxy S20",
    description: "Très bon état, 128 Go, 8 Go RAM.",
    price: 220000,
    currency: "FCFA",
    category: "multimedia",
    location: "Kaolack",
    image: "https://placehold.co/400x250?text=Smartphone"
  },
  {
    id: 4,
    title: "Canapé en tissu 3 places",
    description: "Canapé confortable en tissu beige.",
    price: 100000,
    currency: "FCFA",
    category: "home_garden",
    location: "Mbour",
    image: "https://placehold.co/400x250?text=Canap%C3%A9"
  },
  {
    id: 5,
    title: "Vélo de montagne",
    description: "Vélo tout terrain en bon état.",
    price: 50000,
    currency: "FCFA",
    category: "leisure",
    location: "Saint-Louis",
    image: "https://placehold.co/400x250?text=V%C3%A9lo"
  },
  {
    id: 6,
    title: "Robe traditionnelle sénégalaise",
    description: "Robe en wax faite à la main.",
    price: 30000,
    currency: "FCFA",
    category: "fashion",
    location: "Dakar",
    image: "https://placehold.co/400x250?text=Robe"
  },
  {
    id: 7,
    title: "Offre d’emploi : Assistant administratif",
    description: "Entreprise recherche assistant administratif bilingue.",
    price: 0,
    currency: "FCFA",
    category: "jobs",
    location: "Dakar",
    image: "https://placehold.co/400x250?text=Emploi"
  },
  {
    id: 8,
    title: "Vente de semences de maïs",
    description: "Semences de qualité pour vos cultures.",
    price: 5000,
    currency: "FCFA",
    category: "agriculture",
    location: "Fatick",
    image: "https://placehold.co/400x250?text=Semences"
  }
];

// Catégorie sélectionnée ; null signifie aucune catégorie filtrée
let currentCategory = null;

// Affiche la liste des annonces sur la page d'accueil
function displayAds() {
  const container = document.getElementById("ads-container");
  if (!container) return;
  const searchInput = document.getElementById("search-input");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  // Filtre les annonces selon la catégorie et la recherche
  const filtered = ads.filter(ad => {
    const matchesCategory = !currentCategory || ad.category === currentCategory;
    const matchesQuery =
      ad.title.toLowerCase().includes(query) ||
      ad.description.toLowerCase().includes(query) ||
      ad.location.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  // Reset du contenu
  container.innerHTML = "";
  if (filtered.length === 0) {
    container.innerHTML = "<p>Aucune annonce ne correspond à votre recherche.</p>";
    return;
  }
  filtered.forEach(ad => {
    const card = document.createElement("a");
    card.className = "ad-card";
    card.href = `ad.html?id=${ad.id}`;
    card.innerHTML = `
      <img src="${ad.image}" alt="${ad.title}">
      <div class="ad-body">
        <div class="price">${ad.price ? ad.price.toLocaleString() + " " + ad.currency : "À négocier"}</div>
        <div class="title">${ad.title}</div>
        <div class="location">${ad.location}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Déclenché lorsque l'utilisateur saisit une recherche
function handleSearch() {
  displayAds();
}

// Sélectionne ou désélectionne une catégorie
function selectCategory(cat) {
  // Si la même catégorie est re-sélectionnée, on réinitialise
  currentCategory = currentCategory === cat ? null : cat;
  // Met à jour l'état actif sur les cartes de catégories
  const cards = document.querySelectorAll(".category-card");
  cards.forEach(card => {
    if (card.dataset.category === currentCategory) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
  displayAds();
}

// Affiche les détails d'une annonce sur la page ad.html
function renderAdDetail() {
  const detailContainer = document.getElementById("ad-detail");
  if (!detailContainer) return;
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const ad = ads.find(item => item.id === id);
  if (!ad) {
    detailContainer.innerHTML = "<p>Annonce introuvable.</p>";
    return;
  }
  detailContainer.innerHTML = `
    <div class="ad-image">
      <img src="${ad.image}" alt="${ad.title}">
    </div>
    <div class="info">
      <h1>${ad.title}</h1>
      <div class="price">${ad.price ? ad.price.toLocaleString() + " " + ad.currency : "À négocier"}</div>
      <div class="location"><strong>Lieu :</strong> ${ad.location}</div>
      <p class="description">${ad.description}</p>
      <button class="back-button" onclick="window.history.back()">Retour</button>
    </div>
  `;
}

// Initialise la page en fonction du contexte (liste ou détail)
document.addEventListener("DOMContentLoaded", () => {
  const detailContainer = document.getElementById("ad-detail");
  if (detailContainer) {
    renderAdDetail();
  } else {
    displayAds();
  }
});