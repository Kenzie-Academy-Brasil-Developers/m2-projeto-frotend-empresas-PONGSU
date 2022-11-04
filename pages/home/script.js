const sectorsList = document.getElementById('sectors-list')

async function setSectors() {
    sectors = await getSectors()
    sectorsList.insertAdjacentHTML('beforeend', `
        <li>
            <p class='sector-select'>Todos</p>
        </li>  
    `)
    sectors.map(sector => {
        sectorsList.insertAdjacentHTML('beforeend', `
            <li>
                <p class='sector-select'>${sector.description}</p>
            </li>  
        `)
    })

    const sectorSelects = [...document.querySelectorAll('.sector-select')]
    console.log(sectorSelects);
    sectorSelects.map(selector => {
        selector.addEventListener('click', async () => {
            sectorList.classList.toggle('hide')
            bttnSectorList.innerText = '▼'
            populateCompanies(selector.innerText)
        })
    })
}
setSectors()

const companiesList = document.getElementById('companies-list')

async function populateCompanies(sector) {
    companiesList.innerHTML = ''
    if (sector == 'Todos') {
        compList2 = await getCompanies()
    } else {
        compList2 = await getCompaniesBySector(sector)
    }
    compList2.map(companie => {
        companiesList.insertAdjacentHTML('beforeend', `
        <li>
            <h3>${companie.name}</h3>
            <p>${companie.opening_hours[1]} horas</p>
            <h5>${companie.sectors.description}</h5>
        </li> 
        `)
    })
}

populateCompanies('Todos')

const bttnSectorList = document.getElementById('bttn-sector-list')
const sectorList = document.getElementById('sectors-list')

bttnSectorList.addEventListener('click', () => {
    sectorList.classList.toggle('hide')
    if (bttnSectorList.innerText == '▲') {
        bttnSectorList.innerText = '▼'
    } else {
        bttnSectorList.innerText = '▲'
    }
})
