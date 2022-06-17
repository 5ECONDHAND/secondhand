export const validateLogin = (values, err) => {
  let temp = {}
  temp.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email) ? '' : 'Email is not valid'
  temp.password = values.password.length < 6 ? 'Password must be at least 6 characters' : ''
  err({ ...temp })
}

export const validateRegister = (values, err) => {
  let temp = {}
  temp.fullname = /^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/.test(values.fullname)
    ? ''
    : 'Name is not valid'
  temp.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email) ? '' : 'Email is not valid'
  temp.password = values.password.length < 6 ? 'Password must be at least 6 characters' : ''
  err({ ...temp })
}

export const validateNegotiateAmount = (values, err) => {
  let temp = {}
  /**
   * @desc This is a temporary solution, amount should be higher than current price
   */
  temp.amount = values.amount <= 0 ? 'Amount is too little' : ''
  err({ ...temp })
}
