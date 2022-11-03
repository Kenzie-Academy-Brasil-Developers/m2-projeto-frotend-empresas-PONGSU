const sectorsList = document.getElementById('sectors-list')

function getSectors() {
    sectors.map(sector => {
        console.log(sector);
        sectorsList.insertAdjacentHTML('beforeend', `
            <li>
                <p>${sector}</p>
            </li>  
        `)
    })
}

const companiesList = document.getElementById('companies-list')

function populateCompanies(){
    compList.map(companie => {
        companiesList.insertAdjacentHTML('beforeend', `
        <li>
            <h3>${companie.name}</h3>
            <p>${companie.opening_hours[1]} horas</p>
            <h5>${companie.sectors.description}</h5>
        </li> 
        `)
    })
}