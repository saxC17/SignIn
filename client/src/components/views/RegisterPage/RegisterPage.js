import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import Pincode from "./pincode";
import Handle from "./handleClick";
import moment from "moment";


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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        lastName: "",
        middlename: "",
        firstname: "",
        password: "",
        confirmPassword: "",
        addressline1: "",
        addressline2: "",
        dateOfBirth: "",
        education: "",
        attachement: "",
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required("Name is required"),
        middlename: Yup.string(),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
        addressline1: Yup.string().required("House Number is required"),
        addressline2: Yup.string().required("Street is required"),
        dateOfBirth: Yup.date().required("MM-DD-YYYY"),
        education: Yup.string(),
        attachement: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            firstname: values.firstname,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2>Sign up</h2>
            <Form
              style={{ minWidth: "375px" }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="First Name">
                <Input
                  id="firstname"
                  placeholder="Enter your first name"
                  type="text"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.firstname && touched.firstname
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.firstname && touched.firstname && (
                  <div className="input-feedback">{errors.firstname}</div>
                )}
              </Form.Item>
              <Form.Item label="Middle Name">
                <Input
                  id="middlename"
                  placeholder="Enter your middle Name"
                  type="text"
                  value={values.middlename}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.middlename && touched.middlename
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.middlename && touched.middlename && (
                  <div className="input-feedback">{errors.middlename}</div>
                )}
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>
              <Handle/>

              <Form.Item {...tailFormItemLayout}>
                <div id="recaptcha"></div>
              </Form.Item>
              <Pincode/>
              <Form.Item
                required
                label="Address Line 1"
                hasFeedback
                validateStatus={
                  errors.addressline1 && touched.addressline1
                    ? "error"
                    : "success"
                }
              >
                <Input
                  id="addressline1"
                  placeholder="House Number"
                  type="text"
                  value={values.addressline1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.addressline1 && touched.addressline1
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.addressline1 && touched.addressline1 && (
                  <div className="input-feedback">{errors.addressline1}</div>
                )}
              </Form.Item>
              <Form.Item
                required
                label="Address Line 2"
                hasFeedback
                validateStatus={
                  errors.addressline2 && touched.addressline2
                    ? "error"
                    : "success"
                }
              >
                <Input
                  id="addressline2"
                  placeholder="Street Name"
                  type="text"
                  value={values.addressline2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.addressline2 && touched.addressline2
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.addressline2 && touched.addressline2 && (
                  <div className="input-feedback">{errors.addressline2}</div>
                )}
              </Form.Item>
              <Form.Item
                required
                label="Date of Birth"
                hasFeedback
                validateStatus={
                  errors.dateOfBirth && touched.dateOfBirth
                    ? "error"
                    : "success"
                }
              >
                <Input
                  id="dateOfBirth"
                  placeholder="MM-DD-YYYY"
                  type="text"
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.dateOfBirth && touched.dateOfBirth
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <div className="input-feedback">{errors.dateOfBirth}</div>
                )}
              </Form.Item>
              <Form.Item
               
                label="Education"
                hasFeedback
                validateStatus={
                  errors.education && touched.education ? "error" : "success"
                }
              >
                <Input
                  id="education"
                  placeholder="For eg :BTech"
                  type="text"
                  value={values.education}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.education && touched.education
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.education && touched.education && (
                  <div className="input-feedback">{errors.education}</div>
                )}
              </Form.Item>
              <Form.Item
                label="Attachement"
                hasFeedback
                validateStatus={
                  errors.attachement && touched.attachement
                    ? "error"
                    : "success"
                }
              >
                <Input
                  id="attachement"
                  placeholder="Add a file"
                  type="file"
                  value={values.attachement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.attachement && touched.attachement
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.attachement && touched.attachement && (
                  <div className="input-feedback">{errors.attachement}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
