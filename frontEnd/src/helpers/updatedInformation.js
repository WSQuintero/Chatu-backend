function updatedInformation({ userFound, friends, actualMessages }) {
  const information = {
    email: userFound?.email?.stringValue,
    friends: friends,
    idConnection: userFound?.idConnection?.stringValue,
    messages: actualMessages,
    name: userFound?.name?.stringValue,
    uid: userFound?.uid?.stringValue,
    perfilPhoto: userFound?.perfilPhoto?.stringValue
  }
  return information
}

export {updatedInformation}