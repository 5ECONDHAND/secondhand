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

export const validateProduct = (values, err) => {
  let temp = {}
  temp.nama = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(values.nama) ? '' : 'Name can only be a letter of at least three characters'
  temp.harga = /^[1-9]\d*$/.test(values.harga) ? '' : 'Can only be filled with numbers'
  temp.kategori = values.kategori ? '' : 'Category is required'
  temp.deskripsi = values.deskripsi ? '' : 'Description is required'
  err({ ...temp })
}

export const validateProfile = (values, err) => {
  let temp = {}
  temp.nama = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(values.nama) ? '' : 'Name can only be a letter of at least three characters'
  temp.kota = values.kota ? '' : 'City is required'
  temp.alamat = values.alamat ? '' : 'Address is required'
  temp.nomor = /^[\+?\d*]{10,}$/.test(values.nomor) ? '' : 'Can only be filled with a minimum number of 10 characters'
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
