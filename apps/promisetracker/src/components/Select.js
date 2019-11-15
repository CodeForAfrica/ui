import React from 'react';
import { Select as MuiSelect, MenuItem } from '@material-ui/core';

import propTypes from './propTypes';

function Select({ options, value, onChange }) {
  return (
    <MuiSelect
      value={value}
      onChange={e => {
        onChange(e.target.value);
      }}
    >
      {options.map(status => (
        <MenuItem key={status.value} value={status.value}>
          {status.name}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}

Select.propTypes = {
  options: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      value: propTypes.string
    })
  ).isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};

export default Select;
