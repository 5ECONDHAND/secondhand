const isEmpty = (obj) => {
  if (Object.values(obj).every((x) => x === null || x === '')) return true
  return false
}

export const validateLogin = (values, err) => {
  let temp = {}
  temp.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email) ? '' : 'Email is not valid'
  temp.password = /^[\W\w]{6,}$/.test(values.password) ? '' : 'Min 6 characters'
  err({ ...temp })

  if (isEmpty(temp)) return true
  return false
}

export const validateRegister = (values, err) => {
  let temp = {}
  temp.fullname = /^[a-zA-Z][a-zA-Z ]+$/.test(values.fullname) ? '' : 'Name is not valid'
  temp.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email) ? '' : 'Email is not valid'
  temp.password = /^[\W\w]{6,}$/.test(values.password) ? '' : 'Min 6 characters'
  err({ ...temp })

  if (isEmpty(temp)) return true
  return false
}

export const validateProduct = (values, err) => {
  let temp = {}
  temp.nama = /^[\w\-\s]+$/.test(values.nama) ? '' : 'Name is not valid'
  temp.harga = /^\d+$/.test(values.harga) ? '' : 'Amount is not valid'
  temp.kategori = values.kategori ? '' : 'Category is required'
  temp.deskripsi = values.deskripsi ? '' : 'Description is required'
  // temp.gambar = values.gambar ? '' : 'Image is required'
  err({ ...temp })

  if (isEmpty(temp)) return true
  return false
}

export const validateProfile = (values, err) => {
  let temp = {}
  temp.nama = /^[a-zA-Z][a-zA-Z ]+$/.test(values.nama) ? '' : 'Name is not valid'
  temp.kota = /^[a-zA-Z][a-zA-Z ]+$/.test(values.kota) ? '' : 'City is not valid'
  temp.alamat = values.alamat ? '' : 'Address is required'
  temp.nomor = /^(\d!*){10,}$/.test(values.nomor) ? '' : 'Phone number must at least 10 digits'
  err({ ...temp })

  if (isEmpty(temp)) return true
  return false
}

export const validateNegotiateAmount = (values, err) => {
  let temp = {}
  /**
   * @desc This is a temporary solution, amount should be higher than current price
   */
  temp.amount = values.amount <= 0 ? 'Amount cannot be 0 or less' : ''
  err({ ...temp })

  if (isEmpty(temp)) return true
  return false
}
