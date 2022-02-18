import React, { useReducer } from 'react';
function MyPage({user}){
    return(
        <div><h1>{user.displayName}</h1></div>
    )
}
export default MyPage;