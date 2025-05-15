console.log("Le fichier main.js est chargé !");

// Sélectionne tous les carousels dans la section 2
const carousels = document.querySelectorAll('.section2 .carousel');
console.log("Carousels détectés :", carousels);

carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-images img');
    console.log("Images détectées dans le carousel :", images);
    let currentIndex = 0;

    if (images.length > 0) {
        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none';
            });
        }

        showImage(currentIndex);

        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 3000);
    } else {
        console.warn("Aucune image trouvée dans ce carousel !");
    }
});

// Animation pour le <h1> de la section1
const title = document.getElementById('animation_titre');
if (title) {
    let position = 0;
    let direction = 1;

    function animationTitre() {
        position += direction;
        title.style.transform = `translateX(${position}px)`;

        if (position > 200 || position < -200) {
            direction *= -1;
        }

        requestAnimationFrame(animationTitre);
    }

    animationTitre();
} else {
    console.error("Élément <h1> avec l'ID 'animation_titre' introuvable !");
}

// Initialisation du panier
let panier = [];
let cartCount = 0;

const addToCartButtons = document.querySelectorAll('.add-au-panier');
const cartCountElement = document.getElementById('cart-count');
console.log("Élément compteur détecté :", cartCountElement);
console.log("Boutons 'Ajouter au panier' détectés :", addToCartButtons);

if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.getAttribute('data-product');

            if (product) {
                panier.push(product);
                cartCount++;
                cartCountElement.textContent = cartCount;
                console.log('Produit ajouté :', product);
                console.log('Panier actuel :', panier);
            } else {
                console.error("Aucun produit trouvé pour ce bouton !");
            }
        });
    });
} else {
    console.error("Aucun bouton 'Ajouter au panier' détecté !");
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    console.log("Boutons 'Voir plus' détectés :", toggleButtons);

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const description = button.parentElement;
            const fullText = description.querySelector(".full-text");
            const shortText = description.querySelector(".short-text");

            if (fullText && shortText) {
                if (fullText.style.display === "none") {
                    fullText.style.display = "block";
                    shortText.style.display = "none";
                    button.textContent = "Voir moins ↑";
                } else {
                    fullText.style.display = "none";
                    shortText.style.display = "block";
                    button.textContent = "Voir plus ↓";
                }
            } else {
                console.error("Éléments '.full-text' ou '.short-text' introuvables !");
            }
        });
    });
});