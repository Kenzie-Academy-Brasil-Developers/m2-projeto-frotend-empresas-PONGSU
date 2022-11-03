const companiesSelect = document.querySelector('#companies-select')
const main = document.querySelector('main')
let departmentsList = []

const fillCompanies = async ()=>{
    compList = await getCompanies()
    companiesSelect.innerHTML = ''
    companiesSelect.insertAdjacentHTML('beforeend', `
         <option value="todas" selected>Selecionar Empresa</option>
    `)
    compList.map(comp => {
        companiesSelect.insertAdjacentHTML('beforeend', `
        <option value="${comp.uuid}">${comp.name}</option>
        `)
    })
    
    companiesSelect.addEventListener('change', async ()=>{
        populateDepartments()
        populateAllUsers()
    })     
    populateDepartments()
    populateAllUsers()
}
fillCompanies()

const departmentsSection = document.getElementById('departments-list')

const populateDepartments = async ()=>{   
    console.log(companiesSelect.value);
    if(companiesSelect.value == 'todas'){
        departmentsList = await getCompaniesDepartments('')
    }else{
        departmentsList = await getCompaniesDepartments(`/${companiesSelect.value}`)
    }
    departmentsSection.innerHTML = ''
    departmentsList.map(department => {
        departmentsSection.insertAdjacentHTML('beforeend', `
            <li>
                <h4 class="department-name">${department.name}</h4>
                <p class="department-desc">${department.description}</p>
                <p class="company-name">${department.companies.name}</p>
                <div class="department-bttns">
                    <img class='manage-department' id='manage-${department.uuid}' src="../../src/lookICON.svg" alt="">
                    <img class='edit-department' id='edit-${department.uuid}' src="../../src/edit-dpt-icon.svg" alt="">
                    <img class='delete-department' id='delete-${department.uuid}' src="../../src/deleete-icon.svg" alt="">
                </div>
            </li> 
        `)
    })
    trackBttnsDepartments()
}

const trackBttnsDepartments = async ()=>{
    const departmentsBttns = [...departmentsSection.querySelectorAll('img')]
    departmentsBttns.map(bttn => {
        bttn.addEventListener('click', ()=>{
            if (bttn.id[0] == 'm') {
                manageDepartment(bttn.id.slice(7));
            }else if (bttn.id[0] == 'e') {
                editDepartmentModal(bttn.id.slice(5))
            }else if (bttn.id[0] == 'd') {
                deleteDepartmentModal(bttn.id.slice(7))
            }
        })
    })
}

const createDepartmentModal = async ()=>{
    const createBttn = document.querySelector('#create-department')
    createBttn.addEventListener('click', async()=>{
        main.insertAdjacentHTML('afterend', `
            <article id="create-department-modal">
                <img id="close-create-department" src="../../src/closeBTTN.png" alt="">
                <h2>Criar Departamento</h2>
                <input type="text" name="name" id="new-department-name" placeholder="Nome do departamento">
                <input type="text" name="description" id="new-department-description" placeholder="Descrição do departamento">
                <select name="companies" id="create-department-companies-select">
                    <option value="" disabled selected>Selecionar Empresa</option>
                </select>
                <button class="bttn-brand" id="bttn-department-create">Criar o departamento</button>
            </article>
        `)
        const createDepartmentCompaniesSelect = document.querySelector('#create-department-companies-select')
        
        compList.map(comp => {
            createDepartmentCompaniesSelect.insertAdjacentHTML('beforeend', `
            <option value="${comp.uuid}">${comp.name}</option>
            `)
        })

        let createDepartmentModal = document.getElementById('create-department-modal')
        let createModalClose = document.getElementById('close-create-department')
        let createDepartmentModalBttn = document.getElementById('bttn-department-create')
        let newDepartmentName = document.querySelector("#new-department-name")
        let newDepartmentDesc = document.querySelector("#new-department-description")


        createModalClose.addEventListener('click', ()=>{
            createDepartmentModal.remove()
        })
        let body = {}
        createDepartmentModalBttn.addEventListener('click', async ()=>{
            body[newDepartmentName.name] = newDepartmentName.value            
            body[newDepartmentDesc.name] = newDepartmentDesc.value            
            body['company_uuid'] = createDepartmentCompaniesSelect.value

            await createDepartment(body)
            createDepartmentModal.remove()
            populateDepartments()
        })    
    })       
}
createDepartmentModal()

const editDepartmentModal = async (id)=>{
    let departmentDesc = departmentsList.find(dptmnt => (dptmnt.uuid == id)).description
    main.insertAdjacentHTML('afterend', `
        <article id="edit-department-modal">
            <img id="close-edit-department" src="../../src/closeBTTN.png" alt="">
            <h2>Editar Departamento</h2>
            <input type="text" name="editing-dpt-description" id="editing-dpt-description" placeholder="Descrição do departamento">
            <button class="bttn-brand" id="edit-department-save">Salvar Alterações</button>
        </article>
    `)

    let departmentDescEdit = document.getElementById('editing-dpt-description')
    departmentDescEdit.value = departmentDesc
    let departmentModalEdit = document.getElementById('edit-department-modal')
    let departmentModalClose = document.getElementById('close-edit-department')
    let departmentModalSave = document.getElementById('edit-department-save')

    departmentModalClose.addEventListener('click', ()=>{
        departmentModalEdit.remove()
    })
    
    let body = {}

    departmentModalSave.addEventListener('click', async ()=>{
        body = {"description": departmentDescEdit.value}
        editDepartment(body,id)
        departmentModalEdit.remove()
        if(companiesSelect.value == 'todas'){
            departmentsList = await getCompaniesDepartments('')
        }else{
            departmentsList = await getCompaniesDepartments(`/${companiesSelect.value}`)
        }
        populateDepartments()
    })
}

const deleteDepartmentModal = async (id)=>{
    let departmentName = departmentsList.find(dptmnt => (dptmnt.uuid == id)).name
    main.insertAdjacentHTML('afterend', `
        <article id="delete-department-modal">
            <img id="close-delete-department" src="../../src/closeBTTN.png" alt="">
            <h2>Realmente deseja deletar o Departamento ${departmentName} e demitir seus funcionários?</h2>            
            <button class="bttn-green" id="delete-department-bttn">Confirmar</button>
        </article>
    `)
    
    let departmentModalDelete = document.getElementById('delete-department-modal')
    let deleteModalClose = document.getElementById('close-delete-department')
    let departmentModalSave = document.getElementById('delete-department-bttn')

    deleteModalClose.addEventListener('click', ()=>{
        departmentModalDelete.remove()
    })
    
    departmentModalSave.addEventListener('click', async ()=>{
        await deleteDepartment(id)
        departmentModalDelete.remove()
        populateDepartments()
    })    
}

const manageDepartment = async (id)=>{
    let departmentName = departmentsList.find(dptmnt => (dptmnt.uuid == id)).name
    let departmentDesc = departmentsList.find(dptmnt => (dptmnt.uuid == id)).description
    let departmentCompanie = departmentsList.find(dptmnt => (dptmnt.uuid == id)).companies.name
    main.insertAdjacentHTML('afterend', `
        <article id="manage-department-modal">
            <img id="close-manage-department" src="../../src/closeBTTN.png" alt="">
            <h2>${departmentName}</h2>
            <span>
            <div id='department-info'>
                <h4>${departmentDesc}</h4>
                <h5>${departmentCompanie}</h5>
            </div>
            <asside>
                <select name="users" id="hire-user-select">
                        <option value="" disabled selected>Selecionar Usuário</option>
                </select>
                <button class="bttn-green" id='hire-bttn'>Contratar</button>
            </asside>            
            </span>
            <section id='department-employees'>
            </section>
        </article>
    `)
    let unemployedUsers = await listUnemployedUsers()
    const hireList = document.querySelector("#hire-user-select")
    unemployedUsers.map(user => {
        hireList.insertAdjacentHTML('beforeend', `
        <option value="${user.uuid}">${user.username}</option>
        `)
    })
    let hireBttn = document.getElementById('hire-bttn')
    let listNames = [...hireList.querySelectorAll('option')]
    hireBttn.addEventListener('click', async ()=>{
        let body = {}
        body['user_uuid'] = hireList.value
        body['department_uuid'] = id
        await hire(body)        
        getManageDepartmentEmployers(id)
        listNames.find(usr => (usr.value == hireList.value)).remove()
    })

    let manageDepartmentModal = document.getElementById('manage-department-modal')
    let manageModalClose = document.getElementById('close-manage-department')
    
    manageModalClose.addEventListener('click', ()=>{        
        manageDepartmentModal.remove()
    })
    
    getManageDepartmentEmployers(id)
}

const getManageDepartmentEmployers = async (id)=>{
    const usersList = await listUsers()
    const departamentEmployesSection = document.getElementById('department-employees')
    let departmentCompanie = departmentsList.find(dptmnt => (dptmnt.uuid == id)).companies.name
    let usersFromDepartment = usersList.filter(user => user.department_uuid == id)
    usersFromDepartment.innerHTML = ''
    usersFromDepartment.map(user =>{
        departamentEmployesSection.insertAdjacentHTML('beforeend', `
            <div class='employe-card'>
                <span>
                    <h4>${user.username}</h4>
                    <p>${user.professional_level}</p>
                    <p>${departmentCompanie}</p>
                </span>
                <button id='dimiss-${user.uuid}' class='bttn-red dimiss-bttn'>Desligar</button>
            </div>
        `)
    })

    let manageDepartmentModal = document.getElementById('manage-department-modal')
    const dimissBttn = [...document.querySelectorAll('.dimiss-bttn')]

    dimissBttn.map(bttn =>{
        bttn.addEventListener('click', async()=>{
            dimiss(bttn.id.slice(7))
            manageDepartmentModal.remove()
            manageDepartment(id)
        })
    })    
}

let usersList = document.getElementById('users-list')

const populateAllUsers = async ()=>{
    const allUsersList = await listUsers()
    if(companiesSelect.value == 'todas'){
        departmentsList = await getCompaniesDepartments('')
    }else{
        departmentsList = await getCompaniesDepartments(`/${companiesSelect.value}`)
    }
    usersList.innerHTML = ''

    allUsersList.map(user => {
        if (!user.is_admin) {
            let dept = departmentsList.find(dptmnt => (dptmnt.uuid == user.department_uuid))
            if (dept != undefined) {
                dept = dept.companies.name
            }else{            
                dept = "Não Contratado"
            }
            usersList.insertAdjacentHTML('beforeend', `
            <li>
                <h4 class="user-name">${user.username}</h4>
                <p class="user-level">${user.professional_level}</p>
                <p class="user-company">${dept}</p>
                <div class="user-bttns">
                    <img id='edit-${user.uuid}' src="../../src/edit-icon.png" alt="">
                    <img data-name='${user.username}' id='delete-${user.uuid}' src="../../src/deleete-icon.svg" alt="">
                </div>
            </li> `)            
        }
    })
    trackBttnsUsers()
}


const trackBttnsUsers = async ()=>{
    const usersBttns = [...usersList.querySelectorAll('img')]
    usersBttns.map(bttn => {
        bttn.addEventListener('click', ()=>{
            if (bttn.id[0] == 'e') {
                editUserModal(bttn.id.slice(5))
            }else if (bttn.id[0] == 'd') {
                deleteUserModal(bttn.id.slice(7), bttn.getAttribute('data-name'))
            }
        })
    })
}



const deleteUserModal = async (id, userName)=>{
    main.insertAdjacentHTML('afterend', `
        <article id="delete-user-modal">
            <img id="close-delete-user" src="../../src/closeBTTN.png" alt="">
            <h2>Realmente deseja remover o usuário ${userName}?</h2>            
            <button class="bttn-green" id="delete-user-bttn">Deletar</button>
        </article>
    `)
    
    let userModalDelete = document.getElementById('delete-user-modal')
    let deleteUserModalClose = document.getElementById('close-delete-user')
    let deleteUserConfirm = document.getElementById('delete-user-bttn')

    deleteUserModalClose.addEventListener('click', ()=>{
        userModalDelete.remove()
    })
    
    deleteUserConfirm.addEventListener('click', async ()=>{
        await deleteUser(id)
        await populateDepartments()
        populateAllUsers()
        userModalDelete.remove()
    })    
    
}

const editUserModal = async (id)=>{
    main.insertAdjacentHTML('afterend', `
        <article id="edit-user-modal">
            <img id="close-edit-user" src="../../src/closeBTTN.png" alt="">
            <h2>Editar Usuário</h2>
            <select data-name="kind_of_work" id="edit-user-kind-of-work">
                <option value="" disabled selected>Selecionar modalidade de trabalho</option>
                <option value="HomeOffice">HomeOffice</option>
                <option value="Hibrido">Hibrido</option>
                <option value="Presencial">Presencial</option>
            </select>            
            <select data-name="professional_level" id="edit-user-professional-level">
                <option value="" disabled selected>Selecionar nível profissional</option>
                <option value="estágio">Estagio</option>
                <option value="júnior">Júnior</option>
                <option value="sênior">Sênior</option>
                <option value="pleno">Pleno</option>
            </select>            
            <button class="bttn-brand" id="edit-user-bttn">Salvar Alterações</button>
        </article>
    `)
    
    let editUserModal = document.getElementById('edit-user-modal')
    let editUserModalClose = document.getElementById('close-edit-user')
    let editUserConfirm = document.getElementById('edit-user-bttn')

    editUserModalClose.addEventListener('click', ()=>{
        editUserModal.remove()
    })
    const kindOfWork = document.getElementById('edit-user-kind-of-work')
    const professionalLevel = document.getElementById('edit-user-professional-level')
    
    editUserConfirm.addEventListener('click', async ()=>{
        let body = {}
        body["kindofwork"] = kindOfWork.value
        body["professional_level"] = professionalLevel.value
        console.log(body);
        await editUser(body, id)
        editUserModal.remove()
        await populateDepartments()
        populateAllUsers()
    })

}
