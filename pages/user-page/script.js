async function fillUserInfos () {
    let userProfile = await getUserProfile()
    const userInfos = document.getElementById('user-infos')
    const userDetails = document.getElementById('user-details')
    userInfos.innerHTML = ''
    userInfos.insertAdjacentHTML('beforeend', `
        <span id="user-name">${userProfile.username}</span>
        <div id="user-details">
            <p>Email: ${userProfile.email}</p>
        </div>
    `)
    if (userProfile.professional_level) {
        userDetails.insertAdjacentHTML('beforeend', `
            <p>${userProfile.professional_level}</p>
        `)
    }
    if (userProfile.kind_of_work) {
        userDetails.insertAdjacentHTML('beforeend', `
            <p>${userProfile.kind_of_work}</p>
        `)
    }    
}
fillUserInfos()

async function fillCompAndDepartmentTeam() {
    const companieSection = document.getElementById('user-companie-info')
    let coWorkers = await getUserCoWorkers()
    if (coWorkers = []) {
        companieSection.insertAdjacentHTML('beforeend', `
        <p id='notWorking'>Você ainda não foi contratado</p>
        `)
    }
    else{
        companieSection.insertAdjacentHTML('beforeend', `
        <div id='companie-section-header'>
            <h2>${coWorkers.name} - ${coWorkers.description}</h2>
        </div>
        `)
        companieSection.insertAdjacentHTML('beforeend', `
        <ul id='users-container'></ul>
        `)
        const usersContainer = document.getElementById('users-container')
        let coWorkersList = coWorkers.users
        coWorkersList.map(user => {
            usersContainer.insertAdjacentHTML('beforeend', `
                <li>
                <p>${user.username}</p>
                <p>${user.professional_level}</p>
                </li>
            `)
        })
    }
}


async function editUser() {
    const editProfileModal = document.getElementById('edit-profile-modal')
    const editIcon = document.getElementById('edit-icon')
    const closeModal = document.getElementById('close-edit-profile')
    const editProfileForm = editProfileModal.querySelector('form')
    const saveEditsBttn = document.getElementById('edit-profile-bttn')

    editIcon.addEventListener('click', ()=>{
        editProfileModal.classList.remove('hide')
        editProfileForm.reset()
    })

    saveEditsBttn.addEventListener("click", async (e) => {
            e.preventDefault()            
            console.log('teste');
            const editFormElements = [...editProfileForm.elements]
            // registerBttn.innerHTML = '<img id="spiner" src="../../src/spinnerspiner.svg" alt="">'
            // registerBttn.style.height = '40px'
            const body = {}
    
            editFormElements.forEach(async (elem) => {
                if (elem.tagName == "INPUT" && elem.value != '') {
                    body[elem.id] = elem.value
                }
            })
            await editProfile(body)
            fillUserInfos()
            editProfileModal.classList.add('hide')
        })


    closeModal.addEventListener('click', ()=>{
        editProfileModal.classList.add('hide')
    })
}
editUser()