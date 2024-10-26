import React from 'react'
import { useUser } from './UserContext'
function Welcome() {
const {user} = useUser(); 
  return (
    <div className="container">
        <div className="header">
            Welcome {user.first_name}.
        </div>
        <div className="text">
            Select users from the left panel to Chat.
        </div>
    </div>
  )
}

export default Welcome