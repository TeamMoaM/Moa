import React from 'react';
import cardImage from '../icons/card.svg';
function Main(){
    return(
        <div className='mainPage'>
            <div className='card'>
                <div className='title1'><h1>내 서비스를 공유하고<br/>손쉽게 테스트 해보세요.</h1></div>
                <div className='sub'>OOOO에서는 회원님의 서비스를 테스트하고,<br/>다른 사업자분들의 서비스도 체험해보실 수 있습니다.</div>
                <img className='cardImage' src={cardImage}/>
            </div>
        </div>
    )
}
export default Main;