let quotesByCategory = {};

if (localStorage.getItem("quotesByCategory")) {
  quotesByCategory = JSON.parse(localStorage.getItem("quotesByCategory"));
} else {
  quotesByCategory = {
    motivation: [
      "Push yourself, because no one else is going to do it for you.",
      "Dream it. Wish it. Do it."
    ],
    love: ["Where there is love there is life."]
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

function saveSelectedFilter(category) {
  localStorage.setItem("selectedFilter", category);
}

function getSavedFilter() {
  return localStorage.getItem("selectedFilter") || "all";
}


function populateCategories() {
  categorySelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Categories";
  categorySelect.appendChild(allOption);

  for (let category in quotesByCategory) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  }

  const savedFilter = getSavedFilter();
  categorySelect.value = savedFilter;
}


function filterQuotes() {
  const selected = categorySelect.value;
  saveSelectedFilter(selected);

  let quotesToDisplay = [];

  if (selected === "all") {
    for (let cat in quotesByCategory) {
      quotesToDisplay = quotesToDisplay.concat(quotesByCategory[cat]);
    }
  } else {
    quotesToDisplay = quotesByCategory[selected] || [];
  }

  if (quotesToDisplay.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
  } else {
    const randomQuote = quotesToDisplay[Math.floor(Math.random() * quotesToDisplay.length)];
    quoteDisplay.innerHTML = randomQuote;

    sessionStorage.setItem("lastViewedQuote", randomQuote);
  }
}


addQuoteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const cat = categoryInput.value.trim().toLowerCase();
  const quote = quoteInput.value.trim();

  if (!cat || !quote) return;

  if (!quotesByCategory[cat]) {
    quotesByCategory[cat] = [];
  }

  quotesByCategory[cat].push(quote);
  saveQuotes();
  populateCategories();
  categorySelect.value = cat;
  filterQuotes();

  categoryInput.value = "";
  quoteInput.value = "";
});


exportBtn.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(quotesByCategory, null, 2)], { type: "application/json" });
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
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      for (let cat in importedQuotes) {
        if (!quotesByCategory[cat]) quotesByCategory[cat] = [];
        quotesByCategory[cat].push(...importedQuotes[cat]);
      }
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert("Quotes imported successfully!");
    } catch {
      alert("Invalid JSON format.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}


newQuoteButton.addEventListener("click", filterQuotes);

populateCategories();
filterQuotes();

if (sessionStorage.getItem("lastViewedQuote")) {
  quoteDisplay.innerHTML = sessionStorage.getItem("lastViewedQuote");
}
