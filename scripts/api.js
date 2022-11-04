let compList = []
let compList2 = []
let sectors = []

const getSectors = async () => {
    try {
        const request = await fetch('http://localhost:6278/sectors', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer null',
            },
        });

        if (request.ok) {
            const response = await request.json();            
            sectors = response
            return sectors
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}


const getCompanies = async () => {
    try {
        const request = await fetch('http://localhost:6278/companies', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer null',
            },
        });

        if (request.ok) {
            const response = await request.json();
            localStorage.setItem("compList", JSON.stringify(response));
            compList = response
            return compList
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

getCompanies()

const getCompaniesBySector = async (sector) => {
    try {
        const request = await fetch(`http://localhost:6278/companies/${sector}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer null',
            },
        });

        if (request.ok) {
            const response = await request.json();
            localStorage.setItem("compList", JSON.stringify(response));
            compList2 = response
            return compList2
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const registerUser = async (body) => {
    try {
        const request = await fetch('http://localhost:6278/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (request.ok) {
            const response = await request.json();
            toastfy('ok', 'Usuário cadastrado! Você sera direcionado a página de login.')
            setTimeout(() => {
                window.location.replace("../login/index.html");
            }, 4300);
        } else {
            const response = await request.json();
            console.log(response.error);
            if (response.error == 'email alread exists!') {
                toastfy('fail', 'Email já cadastrado')
            }else{
                toastfy('fail', 'OPS! Algo deu errado')
            }
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const login = async (body) => {
    try {
        const request = await fetch('http://localhost:6278/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (request.ok) {
            const response = await request.json();
            localStorage.setItem("user", JSON.stringify(response));
            toastfy('ok', 'Login bem sucedido!')
            setTimeout(() => {
                userTypeVerification()
            }, 2300);
        } else {
            const response = await request.json();
            if (response.error == 'password invalid!') {
                toastfy('fail', 'Senha incorreta!')
            }else if (response.error == 'email invalid!') {
                toastfy('fail', 'Email não encontrado, verifique a digitação ou faça seu cadastro')
            }else{
                toastfy('fail', 'OPS! Algo deu errado')
            }
        }
    } catch (err) {        
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const userTypeVerification = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch('http://localhost:6278/auth/validate_user', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        if (request.ok) {
            const response = await request.json();
            if (response.is_admin) {
                setTimeout(() => {
                    if (window.location.pathname != '/pages/admin-page/index.html') {
                        window.location.replace("../admin-page/index.html");
                    }
                }, 1300);
            } else {
                setTimeout(() => {
                    if (window.location.pathname != '/pages/user-page/index.html') {
                        window.location.replace("../user-page/index.html");
                    }
                }, 1300);
            }
        } else {
            console.log(request);
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const getUserProfile = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch('http://localhost:6278/users/profile', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        if (request.ok) {
            const response = await request.json();
            return response
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const getUserCoWorkers = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch('http://localhost:6278/users/departments/coworkers', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        if (request.ok) {
            const response = await request.json();
            return response
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const editProfile = async (body) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch('http://localhost:6278/users', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(body),
        });

        if (request.ok) {            
            toastfy('ok', 'Dados do usuário atualizados!')
            const response = await request.json();
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const getCompaniesDepartments = async (comp) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/departments${comp}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (request.ok) {
            const response = await request.json();
            return response
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const editDepartment = async (body, id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/departments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(body),
        });

        if (request.ok) {
            toastfy('ok', 'Informações do departamento atualizadas!')
            const response = await request.json();
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const deleteDepartment = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/departments/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        console.log('==');
        console.log(request);
        console.log('==');
        if (request.ok) {
            toastfy('ok', 'Departamento removido, usuarios relacionados foram desassociados!')
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const createDepartment = async (body) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/departments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(body),
        });

        if (request.ok) {
            toastfy('ok', 'Novo departamento criado com sucesso!')
            const response = await request.json();
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}


const listUsers = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/users/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (request.ok) {
            const response = await request.json();
            return response
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}


const listUnemployedUsers = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/admin/out_of_work`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (request.ok) {
            const response = await request.json();
            return response
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const hire = async (body) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(body),
        });

        if (request.ok) {            
            toastfy('ok', 'Usuário contratado!')
            const response = await request.json();
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}


const dimiss = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/departments/dismiss/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (request.ok) {
            toastfy('ok', 'Usuário desligado do departamento!')
            const response = await request.json();
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}


const deleteUser = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        if (request.ok) {
            toastfy('ok', 'Usuário removido!')
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}


const editUser = async (body, id) => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        const request = await fetch(`http://localhost:6278/admin/update_user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(body),
        });

        if (request.ok) {           
            toastfy('ok', 'Dados do usuário atualizados!')
        } else {
            toastfy('fail', 'OPS! Algo deu errado')
        }
    } catch (err) {
        toastfy('fail', `Falha na comunicação com o servidor, caso persista contate os administradores`)
    }
}

const logout = () => {
    const bttnLogout = document.getElementById('logout-bttn')
    bttnLogout.addEventListener('click', () => {
        localStorage.removeItem('user')
        toastfy('ok', 'Você está saindo, aguardamos seu retorno')
        setTimeout(() => {
            window.location.replace("../home/index.html");
        }, 3300);        
    })
}