let compList = []
let sectors = ['Alimenticio', 'Varejo', 'Textil', 'Manufatura', 'Aeroespacial', 'Automotiva', 'TI', 'Atacado']

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
            alert('Algo deu errado')
        }
    } catch (err) {
        alert('Algo deu errado')
    }
}

getCompanies()

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
            console.log(await response);
            console.log('CADASTRO CONCLUÍDO');
            // setTimeout(() => {
            //     window.location.replace("../login/index.html");
            //   }, 1300);
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            console.log(await response);
            console.log('LOGIN CONCLUÍDO');
            localStorage.setItem("user", JSON.stringify(response));
            userTypeVerification()
            // setTimeout(() => {
            //   window.location.replace("../user-page/index.html");
            // }, 1300);
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
    }
}

const userTypeVerification = async () =>{
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
                  window.location.replace("../admin-page/index.html");
                }, 1300);
            }else{
                setTimeout(() => {
                    window.location.replace("../user-page/index.html");
                  }, 1300);
            }
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
    }
}

const getUserProfile = async () =>{
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
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
    }
}

const getUserCoWorkers = async () =>{
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
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            const response = await request.json();
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            alert('Algo deu errado')
        }
    } catch (err) {
        alert('Algo deu errado')
    }
}

const editDepartment = async (body,id) => {
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
            const response = await request.json();
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            alert('Departamento excluído')
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            const response = await request.json();
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            const response = await request.json();
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            const response = await request.json();
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
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
            alert('Usuário excluído')
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
    }
}


const editUser = async (body,id) => {
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
            const response = await request.json();
            console.log(response);
        } else {
            console.log(request);
            alert('Algo deu errado')
        }
    } catch (err) {
        console.log(err);
        alert('Algo deu errado')
    }
}
