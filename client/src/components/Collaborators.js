import React from 'react';
import "../components/Collaborators.css";

const Collaborators = ({ wishListId }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wishListId);
      alert('CollabCart ID copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className='wrapper'>

      
      <div className='grp'>
        <div className='collaborator'></div>
        <div className='collaborator'></div>
        <div className='collaborator'></div>
      </div>
      <div 
        className='id' 
        onClick={copyToClipboard} 
        style={{ cursor: 'pointer', userSelect: 'none' }}
        title="Click to copy">
        CollabCart ID: {wishListId}
      </div>
    </div>
  );
};

export default Collaborators;
