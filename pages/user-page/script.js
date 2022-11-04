logout()

const userTypeVerify = async () => {
    await userTypeVerification()
}
userTypeVerify()

async function fillUserInfos() {
    let userProfile = await getUserProfile()
    const userInfos = document.getElementById('user-infos')
    userInfos.innerHTML = ''
    userInfos.insertAdjacentHTML('beforeend', `
        <span id="user-name">${userProfile.username}</span>
        <div id="user-details">
            <p>Email: ${userProfile.email}</p>
        </div>
    `)
    const userDetails = document.getElementById('user-details')
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
    let coWorkers = [...await getUserCoWorkers()]
    const companieSection = document.getElementById('user-companie-info')
    if (coWorkers.length == 0) {
        companieSection.insertAdjacentHTML('beforeend', `
        <div id='notWorking-box'>
        <p id='notWorking'>Você ainda não foi contratado</p>
        </div>
        `)
    } else {
        companieSection.insertAdjacentHTML('beforeend', `
        <div id='companie-section-header'>
            <h2>${coWorkers[0].name} - ${coWorkers[0].description}</h2>
        </div>
        `)
        companieSection.insertAdjacentHTML('beforeend', `
        <ul id='users-container'></ul>
        `)
        const usersContainer = document.getElementById('users-container')
        let coWorkersList = coWorkers[0].users
        coWorkersList.map(user => {
            usersContainer.insertAdjacentHTML('beforeend', `
                <li>
                <p class='coworker-name'>${user.username}</p>
                <p class='coworker-level'>${user.professional_level}</p>
                </li>
            `)
        })
    }
}
fillCompAndDepartmentTeam()

async function editUserr() {
    const editProfileModal = document.getElementById('edit-profile-modal')
    const editIcon = document.getElementById('edit-icon')
    const closeModal = document.getElementById('close-edit-profile')
    const editProfileForm = editProfileModal.querySelector('form')
    const saveEditsBttn = document.getElementById('edit-profile-bttn')

    editIcon.addEventListener('click', () => {
        editProfileModal.classList.remove('hide')
        editProfileModal.classList.add('flex')
        lockScroll()
        editProfileForm.reset()
    })

    saveEditsBttn.addEventListener("click", async (e) => {
        e.preventDefault()
        const editFormElements = [...editProfileForm.elements]
        const body = {}

        editFormElements.forEach(async (elem) => {
            if (elem.tagName == "INPUT" && elem.value != '') {
                body[elem.id] = elem.value
            }
        })
        await editProfile(body)
        fillUserInfos()
        editProfileModal.classList.add('hide')
        editProfileModal.classList.remove('flex')
        unlockScroll()
    })


    closeModal.addEventListener('click', () => {
        editProfileModal.classList.add('hide')
        editProfileModal.classList.remove('flex')
        unlockScroll()
    })
}
editUserr()