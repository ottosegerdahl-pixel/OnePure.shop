console.log("OnePure Shop JS loaded!");

// ===== Hämta element =====
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const priceSelect = document.getElementById('price');
const productCards = document.querySelectorAll('.product-card');

// ===== Filter- och sökfunktion =====
function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;
  const selectedPrice = priceSelect.value;

  productCards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const category = card.getAttribute('data-category');
    const price = parseInt(card.getAttribute('data-price'));

    // Filtrera på kategori
    let categoryMatch = selectedCategory === "" || category === selectedCategory;

    // Filtrera på pris
    let priceMatch = true;
    if(selectedPrice !== "") {
      if(selectedPrice === "0-199") priceMatch = price <= 199;
      if(selectedPrice === "200-299") priceMatch = price >= 200 && price <= 299;
      if(selectedPrice === "300+") priceMatch = price >= 300;
    }

    // Sök på titel
    let searchMatch = title.includes(searchText);

    if(categoryMatch && priceMatch && searchMatch) {
      card.style.display = "block";
      card.classList.add('fade-in-card');
    } else {
      card.style.display = "none";
      card.classList.remove('fade-in-card');
    }
  });
}

// ===== Eventlyssnare =====
searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);
priceSelect.addEventListener('change', filterProducts);

// ===== Fade-in animation när sidan laddas =====
window.addEventListener('load', () => {
  productCards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('fade-in-card');
    }, i * 100); // staggered fade-in
  });
});

// ===== Active navbar =====
const navLinks = document.querySelectorAll('header nav a');
navLinks.forEach(link => {
  if(link.href === window.location.href) {
    link.classList.add('active-link');
  }
});
