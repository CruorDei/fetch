document.addEventListener('DOMContentLoaded', function () {
    const regionsSelect = document.getElementById('regions');
    const departementsSelect = document.getElementById('departements');
    const showCitiesBtn = document.getElementById('showCitiesBtn');
    const citiesList = document.getElementById('citiesList');

    // Au chargement de la page
    fetch('https://geo.api.gouv.fr/regions')
        .then(response => response.json())
        .then(data => {
            data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.code;
                option.textContent = region.nom;
                regionsSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des régions:', error));

    // Lorsque la région est sélectionnée
    regionsSelect.addEventListener('change', function () {
        const selectedRegionCode = regionsSelect.value;
        fetch(`https://geo.api.gouv.fr/regions/${selectedRegionCode}/departements`)
            .then(response => response.json())
            .then(data => {
                departementsSelect.innerHTML = '<option value="">Sélectionner un département</option>';
                data.forEach(departement => {
                    const option = document.createElement('option');
                    option.value = departement.code;
                    option.textContent = departement.nom;
                    departementsSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des départements:', error));
    });

    //la liste des villes
    showCitiesBtn.addEventListener('click', function () {
        const selectedDepartementCode = departementsSelect.value;
        fetch(`https://geo.api.gouv.fr/departements/${selectedDepartementCode}/communes`)
            .then(response => response.json())
            .then(data => {
                citiesList.innerHTML = ''; // Clear previous cities
                data.forEach(city => {
                    const listItem = document.createElement('li');
                    listItem.textContent = city.nom;
                    citiesList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des villes:', error));
    });
});
