import PropTypes from 'prop-types';

export const PersonPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
});

export const PersonsPropType = PropTypes.arrayOf(PersonPropType);
