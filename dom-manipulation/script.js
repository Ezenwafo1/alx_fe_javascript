const quotesByCategory = {
  Love: [
     "Love isn't something you find. Love is something that finds you.",
    "Where there is love there is life.",
    "To love and be loved is to feel the sun from both sides."
  ],
  success: [
    "Success usually comes to those who are too busy to be looking for it.",
    "Don’t be afraid to give up the good to go for the great.",
    "Opportunities don't happen. You create them."
  ],
  Motivation: [
     "Push yourself, because no one else is going to do it for you.",
    "Dream it. Wish it. Do it.",
    "Hard work beats talent when talent doesn't work hard."
  ]
};


const categorySelect = document.getElementById("categorySelect");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");

function populateCategories() {
  for (let category in quotesByCategory) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  }
}


function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const quotes = quotesByCategory[selectedCategory];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  quoteDisplay.textContent = selectedQuote;
}

newQuoteButton.addEventListener("click", showRandomQuote);

populateCategories();
categorySelect.value = Object.keys(quotesByCategory)[0];
showRandomQuote();
