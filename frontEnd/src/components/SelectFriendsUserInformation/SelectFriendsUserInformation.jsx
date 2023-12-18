import React, { useEffect } from 'react'
import { Friend } from '../Friend/Friend'

function SelectFriendsUserInformation({
  userFriends,
  currentUser,
  handleOpenFriendChat
}) {
  useEffect(() => {
    console.log(userFriends)
    console.log(currentUser)
  }, [userFriends])

  return (
    <>
      {userFriends?.friends?.map((friend) => (
        <Friend
          handleOpenFriendChat={handleOpenFriendChat}
          friend={friend}
          key={friend.uid}
        />
      )) ||
        currentUser.friends.map((friend) => (
          <Friend
            handleOpenFriendChat={handleOpenFriendChat}
            friend={friend}
            key={friend.uid}
          />
        ))}
    </>
  )
}

export { SelectFriendsUserInformation }
