import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card, Icon, Col, Row } from "antd";

function LandingPage() {
 
return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#3e91f7", fontFamily: "Cursive" }}>
          {" "}
          <b>Sign In </b>OR <b></b>Sign Up <Icon type="ShopFilled" />{" "}
        </h1>
      </div>

      
         

     
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        
      </div>


      
    </div>
  );
}

export default LandingPage;
