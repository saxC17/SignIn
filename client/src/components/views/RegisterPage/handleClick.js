import React, { Component } from "react";
import firebase from "./fire";
import { Form, Input, Button } from "antd";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
export class Handle extends Component {
  handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    var number = "+91"+document.getElementById("number").value;
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        var code = prompt("Enter the otp", "");

        if (code === null) return;

        e.confirm(code)
          .then(function (result) {
            console.log(result.user);
            document.querySelector("p").textContent +=
              result.user.phoneNumber + "Number verified";
          })
          .catch(function (error) {
            console.error(error);
            var code = prompt("wrong otp enter again", "");
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  render() {
    return (
      <div>
        <Form style={{ minWidth: "500px" }}>
          <div className="app" id="recaptcha"></div>
          <Form.Item {...formItemLayout} required label="Mobile Number">
            <Input classname="app" id="number" type="text" placeholder="Enter the number"></Input>
            <Button required onClick={this.handleClick}>
              Click to Verify
            </Button>
            <p></p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Handle;
