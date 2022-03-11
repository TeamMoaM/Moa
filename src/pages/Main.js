import React, { useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../firebase-config';
import cardImage from '../icons/card.svg';
function Main({setUser}){
    return(
        <div className='mainWrap'>
            <div className='mainPage'>
                <div className='card'>
                    <div className='title1'><h2 className='title150'>내 서비스를 공유하고<br/>손쉽게 테스트 해보세요.</h2></div>
                    <div className='sub'><h2 className='body150'>OOOO에서는 회원님의 서비스를 테스트하고,<br/>다른 사업자분들의 서비스도 체험해보실 수 있습니다.</h2></div>
                    <img className='cardImage' src={cardImage}/>
                </div>
            </div>
        </div>
    )
}
export default Main;