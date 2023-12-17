function setUserSstorage(data){
sessionStorage.setItem(
  'currentUser',
  JSON.stringify(data)
)
}

export { setUserSstorage }