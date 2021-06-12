// DOM Variables
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')
const loader = document.getElementById('loader')


// Quotes List
let apiQuotes = []



// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show New Quote
function newQuote() {
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text

    complete()
}


// Get Quotes From API
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        console.log(error)
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}



// Event Listeners
newQuoteButton.addEventListener('click', newQuote)
twitterButton.addEventListener('click', tweetQuote)


// On Page Load
getQuotes()