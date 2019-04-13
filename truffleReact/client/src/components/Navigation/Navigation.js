import React from 'react';

const Navigation = ({ onActionClicked, isEnrolled, toggleModal }) => {
  
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        { !isEnrolled && <p onClick={() => onActionClicked('enroll')} className='f3 link dim black underline pa3 pointer'>Enroll</p> }
        <p onClick={() => onActionClicked('donate')} className='f3 link dim black underline pa3 pointer'>Donate</p>
      </nav>
    );
    
}

export default Navigation;