import React from 'react';

import styles from "./FormError.modules.scss";

type FormErrorProps = {
    error: string;
}

const FormError: React.FC<FormErrorProps> = ({error}) => {
  return (
    <div>{error}</div>
  )
}

export default FormError