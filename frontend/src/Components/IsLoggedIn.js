
function IsLoggedIn() {
  let token = localStorage.getItem('jwt-token')

  if (token) {
    return true
  }
  else {
    return false
  }
}

export default IsLoggedIn