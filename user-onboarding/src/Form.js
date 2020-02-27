import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, touched, errors, status}) => {
    return (
        <div>
            <Form>
                <label htmlFor="name">
                    Name
                    <Field id="name" type="text" name="name" placeholder="name" />
                    {touched.name && errors.name && (<p>{errors.name}</p>)}
                </label>
                <label htmlFor="email">
                    Email
                    <Field id="email" type="text" name="email" placeholder="your@email.here" />
                    {touched.email && errors.email && (<p>{errors.email}</p>)}
                </label>
                <label htmlFor="password">
                    Password
                    <Field id="password" type="password" name="password" placeholder="password" />
                    {touched.password && errors.password && (<p>{errors.password}</p>)}
                </label>
                <label htmlFor="terms">
                    Do you agree to our Terms and Services?
                    <Field id="terms" type="checkbox" name="terms" />
                </label>
                <button type="submit">Submit</button>
            </Form>
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
        terms: Yup.boolean().oneOf([true]).required('You must agree to our terms.')

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
})(UserForm)