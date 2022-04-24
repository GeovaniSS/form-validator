class ValidateCpf {
  #cpf
  constructor(cpf) {
    this.#cpf = cpf
  }
  
  get cpfClean() {
    return this.#cpf.replace(/\D+/g, '')
  }

  validate() {
    if(!this.cpfClean) return false
    if(this.cpfClean.length !== 11) return false
    if(this.isSequence()) return false
  
    const cpfPartial = this.cpfClean.slice(0, -2)
    const firstDigit = ValidateCpf.generateDigits(cpfPartial)
    const secondDigit = ValidateCpf.generateDigits(cpfPartial + firstDigit)

    const cpfGenerated = cpfPartial + firstDigit + secondDigit

    return cpfGenerated === this.cpfClean
  }

  isSequence() {
    return this.cpfClean[0].repeat(this.cpfClean.length) === this.cpfClean
  }

  // Obs: Esse método não precisa acessar os dados da instância, logo ele pode ser estático
  static generateDigits(cpfPartial) {
    const cpfArray = Array.from(cpfPartial)
    const regressive = cpfArray.length + 1
    
    const total = 
    cpfArray
      .map((digit, i) => Number(digit) * (regressive - i))
      .reduce((acc, multiplied) => acc + multiplied, 0)
    
    const digit = 11 - (total % 11)
    
    return digit > 9 ? 0 : digit
  }
}