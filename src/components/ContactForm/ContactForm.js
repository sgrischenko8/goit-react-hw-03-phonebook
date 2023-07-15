import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const initialValues = { name: '', number: '', id: '' };

const validationSchema = Yup.object({
  name: Yup.string().required(),
  number: Yup.string()
    .min(1, 'Need 7 numbers')
    .max(7, 'Need 7 numbers')
    .required(),
});

export class ContactForm extends React.Component {
  state = { name: '', number: '' };

  handleSubmit = (values, { resetForm }) => {
    initialValues.id = nanoid();
    this.props.onSubmit(values);
    resetForm();
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    initialValues[name] = value;
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        <Form className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Field
            className={styles.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я])$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />

          <label htmlFor="number" className={styles.label}>
            Number
          </label>
          <Field
            className={styles.input}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />

          <button className={styles.btn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
