const loginBttn = document.getElementById('login-bttn')

const loginForm = document.querySelector('form')
const loginFormElements = [...loginForm.elements]

loginForm.addEventListener("submit", async (e) => {
    // verifyInputs()
		e.preventDefault()
		// registerBttn.innerHTML = '<img id="spiner" src="../../src/spinnerspiner.svg" alt="">'
		// registerBttn.style.height = '40px'
		const body = {}

		loginFormElements.forEach((elem) => {
            if (elem.tagName == "INPUT") {
                body[elem.id] = elem.value
            }
		})
		await login(body)
        
	})