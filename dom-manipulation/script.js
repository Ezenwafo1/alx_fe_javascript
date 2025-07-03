
const quotesByCategory = {
  motivation: [
    "Push yourself, because no one else is going to do it for you.",
    "Dream it. Wish it. Do it.",
    "Hard work beats talent when talent doesn't work hard."
  ],
  success: [
    "Success usually comes to those who are too busy to be looking for it.",
    "Don’t be afraid to give up the good to go for the great.",
    "Opportunities don't happen. You create them."
  ],
  love: [
    "Love isn't something you find. Love is something that finds you.",
    "Where there is love there is life.",
    "To love and be loved is to feel the sun from both sides."
  ]
};


const categorySelect = document.getElementById("categorySelect");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");


function createAddQuoteForm() {
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add a New Quote";
  document.body.appendChild(formTitle);

  const form = document.createElement("form");
  form.id = "addQuoteForm";

  
  const catLabel = document.createElement("label");
  catLabel.setAttribute("for", "categoryInput");
  catLabel.textContent = "Category: ";
  form.appendChild(catLabel);

  const categoryInput = document.createElement("input");
  categoryInput.id = "categoryInput";
  categoryInput.placeholder = "e.g., motivation or new";
  categoryInput.required = true;
  form.appendChild(categoryInput);

  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));


  const quoteLabel = document.createElement("label");
  quoteLabel.setAttribute("for", "quoteInput");
  quoteLabel.textContent = "Quote: ";
  form.appendChild(quoteLabel);

  const quoteInput = document.createElement("input");
  quoteInput.id = "quoteInput";
  quoteInput.placeholder = "Type your quote here";
  quoteInput.style.width = "60%";
  quoteInput.required = true;
  form.appendChild(quoteInput);

  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));


  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Quote";
  form.appendChild(submitBtn);

  document.body.appendChild(form);

 
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newCategory = categoryInput.value.trim().toLowerCase();
    const newQuote = quoteInput.value.trim();

    if (!newCategory || !newQuote) {
      alert("Please enter both a category and a quote.");
      return;
    }

   
    if (!quotesByCategory[newCategory]) {
      quotesByCategory[newCategory] = [];
    }


    quotesByCategory[newCategory].push(newQuote);


    populateCategories();
    categorySelect.value = newCategory;
    showRandomQuote();


    categoryInput.value = "";
    quoteInput.value = "";
  });
}


function populateCategories() {
  categorySelect.innerHTML = ""; 
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

  if (!quotes || quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes in this category yet.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = selectedQuote;
}


newQuoteButton.addEventListener("click", showRandomQuote);


populateCategories();
categorySelect.value = Object.keys(quotesByCategory)[0];
showRandomQuote();
createAddQuoteForm();
