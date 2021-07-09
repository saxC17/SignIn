import React, { Component } from "react";
import axios from "axios";
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

class Pincode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pincode: "",
      city: "",
      district: "",
      state: "",
      error: "",
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length === 6) {
      this.setState({
        error: "",
      });
      axios
        .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then((res) =>
          this.setState({
            state: res.data[0].PostOffice[0].State,
            city: res.data[0].PostOffice[0].Block,
            district: res.data[0].PostOffice[0].District,
          })
        )
        .then(() => {
          document.getElementById("pincode").classList.remove("error");
        })
        .catch((err) => {
          document.getElementById("pincode").className = "error";
          this.setState({
            error: "Invalid PIN Code",
          });
        });
    }
    if (e.target.value.length !== 6) {
      this.setState({
        city: "",
        district: "",
        state: "",
        error: "ZIP code must be of 6 digits",
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.error ? (
          <span className="error-display">{this.state.error}</span>
        ) : null}
        <Form style={{ minWidth: "500px" }}>
          <Form.Item {...formItemLayout} required label="Pin code">
            <Input
              name="pincode"
              className="app"
              onChange={(e) => this.onChange(e)}
              id="pincode"
              placeholder="Enter Pincode"
              maxLength={6}
              minLength={6}
              value={this.state.pincode}
              type="number"
            />
          </Form.Item>
          <Form.Item {...formItemLayout} required label="City">
            <Input
              id="city"
              className="app"
              type="String"
              placeholder="Enter City "
              value={this.state.city}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} required label="District">
            <Input
              id="district"
              type="String"
              className="app"
              placeholder="Enter District "
              value={this.state.district}
            />
          </Form.Item>
          <Form.Item {...formItemLayout} required label="State">
            <Input
              id="state"
              type="String"
              className="app"
              placeholder="Enter State "
              value={this.state.state}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Pincode;
