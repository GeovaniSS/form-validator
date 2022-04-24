class ValidateForm {
  constructor() {
    this.form = document.querySelector('.form')
    this.cpfField = document.querySelector('.cpf')
    this.userNameField = document.querySelector('.username')
    this.passwordField = document.querySelector('.password')
    this.confirmPasswordField = document.querySelector('.confirm-password')
    this.formEvents()
  }

  formEvents() {
    this.form.addEventListener('submit', e => this.handleSubmit(e))
  }

  handleSubmit(e) {
    e.preventDefault()
    const errorMessages = document.querySelectorAll('.error-message')
    errorMessages.forEach(error => error.remove())

    const validFields = this.validateFields()
    
    if(validFields) {
      alert('Formulário Enviado!')
      this.form.submit()
    }
  }

  validateFields() {
    const emptyFields = this.checkEmptyFields()
    const cpfIsValid = this.validateCpfField()
    const userNameIsValid = this.validateUserNameField()
    const passwordsIsValid = this.validatePasswordFields()

    if (!emptyFields && cpfIsValid && userNameIsValid && passwordsIsValid) return true
    return false
  }

  checkEmptyFields() {
    let emptyFields = false
    const formFields = [...document.querySelectorAll('form input')]
    
    formFields
      .filter(field => field.value.length === 0)
      .forEach(field => {
        const label = field.previousElementSibling.innerText
        this.createErrorMessage(`Campo ${label} não pode estar vazio`, field)
        emptyFields = true
      })
    
    return emptyFields
  }

  validateCpfField() {
    const cpf = new ValidateCpf(this.cpfField.value)
    
    if(!cpf.cpfClean.length) return
   
    if(!cpf.validate()) {
      this.createErrorMessage('CPF inválido', this.cpfField)
      return false
    }

    return true
  }

  validateUserNameField() {
    const userName = this.userNameField.value
    let userNameIsValid = true
    
    if(!userName.length) return
    
    if(!userName.match(/^[a-zA-Z0-9]+$/g)) {
      this.createErrorMessage('O usuário só poderá conter letras e ou números', this.userNameField)  
      userNameIsValid = false
    }

    if(userName.length < 3 || userName.length > 12) {
      this.createErrorMessage('O usuário deve ter entre 3 e 12 caracteres', this.userNameField)
      userNameIsValid = false
    }

    return userNameIsValid
  }

  validatePasswordFields() {
    let passwordsIsValid = true

    const password = this.passwordField.value
    const confirmPassword = this.confirmPasswordField.value  

    if(!password.length) return

    if(password.length < 6 || password.length > 12) {
      this.createErrorMessage('A senha precisa ter entre 6 e 12 caracteres', this.passwordField)
      passwordsIsValid = false
    }

    if(password !== confirmPassword) {
      this.createErrorMessage('As senhas não se coincidem', this.confirmPasswordField)
      passwordsIsValid = false
    }

    return passwordsIsValid
  }

  createErrorMessage(msg, field) {
    const error = document.createElement('small')
    error.classList.add('error-message')
    error.innerText = msg

    const formValidate = field.parentElement
    formValidate.appendChild(error)
  }
}

const validate = new ValidateForm()