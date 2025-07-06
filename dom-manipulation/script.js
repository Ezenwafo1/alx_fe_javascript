let quotesByCategory = {};

const categoryFilter = document.getElementById("categoryFilter");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteForm = document.getElementById("addQuoteForm");
const categoryInput = document.getElementById("categoryInput");
const quoteInput = document.getElementById("quoteInput");
const exportBtn = document.getElementById("exportBtn");
const syncNowBtn = document.getElementById("syncNow");
const conflictNotice = document.getElementById("conflictNotice");

const serverUrl = "https://jsonplaceholder.typicode.com/posts/1";


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


function saveQuotes() {
  localStorage.setItem("quotesByCategory", JSON.stringify(quotesByCategory));
}


function saveSelectedFilter(selectedCategory) {
  localStorage.setItem("selectedFilter", selectedCategory);
}
function getSavedFilter() {
  return localStorage.getItem("selectedFilter") || "all";
}


function populateCategories() {
  categoryFilter.innerHTML = "";

  const allCategories = ["all", ...Object.keys(quotesByCategory)];

  allCategories.map(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent =
      category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });

  const selectedCategory = getSavedFilter();
  categoryFilter.value = selectedCategory;
}


function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  saveSelectedFilter(selectedCategory);

  let quotesToDisplay = [];

  if (selectedCategory === "all") {
    for (let cat in quotesByCategory) {
      quotesToDisplay = quotesToDisplay.concat(quotesByCategory[cat]);
    }
  } else {
    quotesToDisplay = quotesByCategory[selectedCategory] || [];
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

  const category = categoryInput.value.trim().toLowerCase();
  const quote = quoteInput.value.trim();

  if (!category || !quote) return;

  if (!quotesByCategory[category]) {
    quotesByCategory[category] = [];
  }

  quotesByCategory[category].push(quote);
  saveQuotes();
  populateCategories();
  categoryFilter.value = category;
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


async function sendQuotesToServer() {
  try {
    await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify({ title: JSON.stringify(quotesByCategory) }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });
    console.log("Quotes sent to server.");
  } catch (error) {
    console.error("Send error:", error);
  }
}


function showConflictNotice() {
  conflictNotice.style.display = "block";
  setTimeout(() => {
    conflictNotice.style.display = "none";
  }, 5000);
}


async function sendQuotesToServer() {
  try {
    await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify({ title: JSON.stringify(quotesByCategory) }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    console.log("Quotes sent to server.");
  } catch (error) {
    console.error("Send error:", error);
  }
}


syncNowBtn.addEventListener("click", fetchQuotesFromServer);


setInterval(fetchQuotesFromServer, 10000);


newQuoteButton.addEventListener("click", filterQuotes);
populateCategories();
filterQuotes();

if (sessionStorage.getItem("lastViewedQuote")) {
  quoteDisplay.innerHTML = sessionStorage.getItem("lastViewedQuote");
}
