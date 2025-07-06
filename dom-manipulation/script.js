let quotesByCategory = {};

if (localStorage.getItem("quotesByCategory")) {
  quotesByCategory = JSON.parse(localStorage.getItem("quotesByCategory"));
} else {
  quotesByCategory = {
    motivation: [
      "Push yourself, because no one else is going to do it for you.",
      "Dream it. Wish it. Do it."
    ],
    success: [
      "Success usually comes to those who are too busy to be looking for it."
    ]
  };
  saveQuotes();
}


const categorySelect = document.getElementById("categorySelect");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteForm = document.getElementById("addQuoteForm");
const categoryInput = document.getElementById("categoryInput");
const quoteInput = document.getElementById("quoteInput");
const exportBtn = document.getElementById("exportBtn");

function saveQuotes() {
  localStorage.setItem("quotesByCategory", JSON.stringify(quotesByCategory));
}

function populateCategories() {
  categorySelect.innerHTML = "";
  for (let cat in quotesByCategory) {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  }
}

function showRandomQuote() {
  const selectedCat = categorySelect.value;
  const quotes = quotesByCategory[selectedCat] || [];

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes in this category.";
    return;
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = randomQuote;

  sessionStorage.setItem("lastViewedQuote", randomQuote);
}

addQuoteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const category = categoryInput.value.trim().toLowerCase();
  const quote = quoteInput.value.trim();

  if (!category || !quote) return;

  if (!quotesByCategory[category]) {
    quotesByCategory[category] = [];
  }

  quotesByCategory[category].push(quote);
  saveQuotes();
  populateCategories();
  categorySelect.value = category;
  showRandomQuote();

  categoryInput.value = "";
  quoteInput.value = "";
});


exportBtn.addEventListener("click", function () {
  const data = JSON.stringify(quotesByCategory, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});


function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

     
      for (let cat in importedQuotes) {
        if (!quotesByCategory[cat]) quotesByCategory[cat] = [];
        quotesByCategory[cat].push(...importedQuotes[cat]);
      }

      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Error: Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}


newQuoteButton.addEventListener("click", showRandomQuote);

populateCategories();
categorySelect.value = Object.keys(quotesByCategory)[0];
showRandomQuote();


if (sessionStorage.getItem("lastViewedQuote")) {
  quoteDisplay.innerHTML = sessionStorage.getItem("lastViewedQuote");
}
