import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <div>
      <label>
        Find contacts by names
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={s.inputForm}
        />
      </label>
    </div>
  );
}
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
