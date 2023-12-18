function transformFriends(userFound) {
  const friends = userFound?.friends?.arrayValue?.values?.map((fOf) => {
    return {
      email: fOf?.mapValue.fields.email?.stringValue,
      name: fOf?.mapValue.fields.name?.stringValue,
      uid: fOf?.mapValue.fields.uid?.stringValue,
      perfilPhoto: fOf?.mapValue.fields.perfilPhoto?.stringValue
    }
  })
  return friends
}

export { transformFriends }
