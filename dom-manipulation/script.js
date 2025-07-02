const quotes = [
  "Persimist sees the hole, optimist sees the doughnut.",
  "The best to plant an oaktree was 12 years ago the next perfect time to plant another is now",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The grass are not always greener at the other side.",
  "There is no nobility in poverty."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  quoteDisplay.textContent = selectedQuote;
}

newQuoteButton.addEventListener("click", showRandomQuote);

