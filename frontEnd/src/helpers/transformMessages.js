function transformMessages(userFound) {
  const actualMessages =
    userFound?.messages?.arrayValue?.values?.map((mss) => {
      return {
        idConnection: mss.mapValue.fields.idConnection?.stringValue,
        message: mss.mapValue.fields.message?.stringValue,
        sender: mss.mapValue.fields.sender?.stringValue,
        user: mss.mapValue.fields.user?.stringValue
      }
    }) || []
  return actualMessages
}

export { transformMessages }
