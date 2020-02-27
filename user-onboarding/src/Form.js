import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from "axios";
import "./App.css";

const UserForm = ({values, touched, errors, status}) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        console.log("user status changed!", status);
        status && setUser(user => [...user, status]);
    }, [status]);
    return (
        <div className="container">
            <div className="onboard">
                <Form>
                    <label htmlFor="name">
                        Name
                        <Field id="name" type="text" name="name" placeholder="name" />
                        {touched.name && errors.name && (<p className="red">{errors.name}</p>)}
                    </label>
                    <br />
                    <label htmlFor="email">
                        Email
                        <Field id="email" type="text" name="email" placeholder="your@email.here" />
                        {touched.email && errors.email && (<p className="red">{errors.email}</p>)}
                    </label>
                    <br />
                    <label htmlFor="password">
                        Password
                        <Field id="password" type="password" name="password" placeholder="password" />
                        {touched.password && errors.password && (<p className="red">{errors.password}</p>)}
                    </label>
                    <br />
                    <label htmlFor="terms">
                        Do you agree to our Terms and Services?
                        <Field id="terms" type="checkbox" name="terms" />
                        {touched.terms && errors.terms && (<p className="red">You must agree to our terms.</p>)}
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </Form>
            </div>
            <div className="userList">
                    {user.map(users => (
                        <ul>
                            <li> name: {users.name}</li>
                            <li> email: {users.email}</li>
                            <li> password: {users.password}</li>
                        </ul>
                    ))}
            </div>
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().min(5, 'Must be at least 5 characters').required(),
        terms: Yup.boolean().oneOf([true]).required()

    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log("submitting..", values);
        axios.post("https://reqres.in/api/users", values)
        .then(response => {
            console.log("success", response);
            setStatus(response.data);
            resetForm();
        });
    }
})(UserForm);

export default FormikUserForm;