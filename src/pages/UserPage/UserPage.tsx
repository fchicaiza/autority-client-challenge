import React, { useState, useEffect } from 'react'
import {fetchAllUsers ,createUser, deleteUser, fetchUserById,  } from '../api/user'; 
export const UserPage = () => {

let test = fetchAllUsers()

    return (
        <div>UserPage</div>
    )
}

export default UserPage