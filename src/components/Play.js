
import React, { useState, useEffect, Suspense } from 'react';

const Play = ({ pet, setPet }) => {


  if (!pet) {

    return (
      <div className="play">
        <h1>Select a pet to play</h1>
      </div>

    );
  } else {
    return (

      <div className="play">
        <h1>
          {pet}
        </h1>
  This is the play component

      </div>
    )
  }

}

export default Play
