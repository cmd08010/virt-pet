
import React, { useState, useEffect, Suspense } from 'react';
import { Animated } from "react-animated-css";

const About = () => {


  return (
    <div className="App">
      {/* <Animated animationIn="bounceInDown" animationOut="bounceOutUp" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
        HI
      </Animated> */}
      {/*  animate__backInUp
      animate__backOutUp
      */}

      <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={false}>
        <div>
          hello world ;)
    </div>
      </Animated>
    </div>
  );
}


export default About
