document.addEventListener('DOMContentLoaded', function () {
    const showAddressBtn = document.querySelector('#showAddressBtn');
    const addressInfo = document.querySelector('#addressInfo');
    const cityInfo = document.querySelector('#cityInfo');
    const mapContainer = document.querySelector('#map');

    showAddressBtn.addEventListener('click', function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const address = await getAddressFromCoordinates(latitude, longitude);
                addressInfo.textContent = `Votre adresse : ${address}`;

                const cityInfoData = await getCityInfoFromCoordinates(latitude, longitude);
                cityInfo.textContent = `Informations sur la ville :\nNom : ${cityInfoData.nom}\nCodes postaux : ${cityInfoData.codesPostaux.join(', ')}\nPopulation municipale : ${cityInfoData.population}\nSurface en hectare : ${cityInfoData.surfaceHectare} ha`;

                initMap(latitude, longitude);
            }, function (error) {
                console.error('Erreur de géolocalisation :', error);
                addressInfo.textContent = 'Erreur de géolocalisation.';
                cityInfo.textContent = '';
            });
        } else {
            console.error('La géolocalisation n\'est pas prise en charge par votre navigateur.');
            addressInfo.textContent = 'La géolocalisation n\'est pas prise en charge par votre navigateur.';
            cityInfo.textContent = '';
        }
    });

    async function getAddressFromCoordinates(latitude, longitude) {
        const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        const address = data.features[0]?.properties.label || 'Adresse non trouvée';
        return address;
    }

    async function getCityInfoFromCoordinates(latitude, longitude) {
        const response = await fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=nom,codesPostaux,population,surface`);
        const data = await response.json();
        return data[0] || {};
    }
});
