
/**
 * 
 * @param {Object} 
 */
const fetchQuote = async () => {

    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
    const data = await res.json()

    return data[0]

}


/**
 * 
 * @param {HTMLDivElement} element 
 */

export const BreakingBadApp = (element) => {
    document.querySelector('#app-title').innerHTML = 'Breaking Bad App '



    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const randomQuote = document.createElement('button');
    randomQuote.innerText = 'Next Quote';


    const renderQuote = (data) => {
        quoteLabel.innerHTML = data.author;
        authorLabel.innerHTML = data.quote;
        element.replaceChildren(quoteLabel, authorLabel, randomQuote)
    }


    randomQuote.addEventListener('click', () => {
        element.innerHTML = 'Loading...';
        setTimeout(async () => {
            const quote = await fetchQuote()
            renderQuote(quote);
        }, 1000)
    })


    fetchQuote().then((data) => renderQuote(data))
}