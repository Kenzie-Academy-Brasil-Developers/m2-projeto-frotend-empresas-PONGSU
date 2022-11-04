const loginBttn = document.getElementById('login-bttn')

const loginForm = document.querySelector('form')
const loginFormElements = [...loginForm.elements]
setTimeout(() => {	
loginForm.reset()
}, 30);

loginForm.addEventListener("submit", async (e) => {
    // verifyInputs()
		e.preventDefault()
		loginBttn.innerHTML = '<img id="spiner" src="../../src/spinnerspiner.svg" alt="">'
		loginBttn.style.height = '52px'
		const body = {}

		loginFormElements.forEach((elem) => {
            if (elem.tagName == "INPUT") {
                body[elem.id] = elem.value
            }
		})
		await login(body)
        
	})