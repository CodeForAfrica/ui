import React from 'react';
import { Select as MuiSelect, MenuItem, makeStyles } from '@material-ui/core';
import propTypes from './propTypes';

const useStyles = makeStyles({
  select: props => ({
    position: 'relative',
    '&:after': {
      display: props.showIndicator ? 'block' : 'none',
      position: 'absolute',
      content: "''",
      left: '.75em',
      top: '.875em',
      width: '.75em',
      height: '.75em',
      backgroundColor: props.indicatorColor || '#659db9',
      borderRadius: '.5em'
    }
  })
});

function Select({ options, value, onChange, ...props }) {
  const classes = useStyles(props);
  return (
    <MuiSelect
      classes={{ select: classes.select }}
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
