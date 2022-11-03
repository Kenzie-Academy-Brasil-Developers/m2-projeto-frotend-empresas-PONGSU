const registerBttn = document.getElementById('register-bttn')

const registerForm = document.querySelector('form')
const registerFormElements = [...registerForm.elements]

registerBttn.addEventListener("submit", async (e) => {
    // verifyInputs()
		e.preventDefault()
		// registerBttn.innerHTML = '<img id="spiner" src="../../src/spinnerspiner.svg" alt="">'
		// registerBttn.style.height = '40px'
		const body = {}

		registerFormElements.forEach((elem) => {
            if (elem.tagName != "BUTTON") {
                body[elem.id] = elem.value
            }
		})
		await registerUser(body)
	})