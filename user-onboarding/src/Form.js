import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values}) => {
    return (
        <div>
            <Form>
                <label htmlFor="name">
                    Name
                    <Field id="name" type="text" name="name" placeholder="name" />
                </label>
                <label htmlFor="email">
                    Email
                    <Field id="email" type="text" name="email" placeholder="your@email.here" />
                </label>
                <label htmlFor="password">
                    Password
                    <Field id="password" type="password" name="password" placeholder="password" />
                </label>
                <label htmlFor="terms">
                    Do you agree to our Terms and Services?
                    <Field id="terms" type="checkbox" name="terms" />
                </label>
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}