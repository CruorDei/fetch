document.addEventListener('DOMContentLoaded', function () {
    const randomQuoteBtn = document.getElementById('randomQuoteBtn');
    const quoteContent = document.getElementById('quoteContent');
    const quoteCharacter = document.getElementById('quoteCharacter');

    randomQuoteBtn.addEventListener('click', function () {
        fetch('https://kaamelott-api.vercel.app/api/random')
            .then(response => response.json())
            .then(data => {
                if (data && data.quote && data.character) {
                    quoteContent.textContent = data.quote;
                    quoteCharacter.textContent = `- ${data.character}`;
                } else {
                    quoteContent.textContent = 'Erreur lors de la récupération de la citation.';
                    quoteCharacter.textContent = '';
                }
            })
            .catch(error => {
                console.error('Erreur lors de la requête API:', error);
                quoteContent.textContent = 'Erreur lors de la récupération de la citation.';
                quoteCharacter.textContent = '';
            });
    });
});