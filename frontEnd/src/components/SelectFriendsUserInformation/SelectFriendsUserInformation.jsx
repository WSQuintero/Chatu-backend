import { Friend } from '../Friend/Friend'

function SelectFriendsUserInformation({
  userFriends,
  currentUser,
  handleOpenFriendChat
}) {


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
