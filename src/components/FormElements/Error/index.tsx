import React from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';
import styles from '../Form.module.scss';

export interface ErrorProps {
  error?: FieldError;
  className?: string;
}

const showErrorMessage = (error: FieldError) => {
  switch (error.type) {
    case 'required':
      return 'Field is required.';
    case 'min':
      return 'Your input required more characters';
    case 'minLength':
      return 'Your input required more characters';
    case 'maxLength':
      return 'Your input exceed maxLength';
    case 'max':
      return 'Your input exceed maxLength';
    case 'pattern':
      return error.message;
    default:
      return '';
  }
};

const Error: React.FC<ErrorProps> = ({ error, className }) => (
  <p className={classNames(styles.error, className)}>
    {error && showErrorMessage(error)}
  </p>
);

export default Error;
