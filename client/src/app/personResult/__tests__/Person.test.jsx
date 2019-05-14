import React from 'react';
import renderer from 'react-test-renderer';
import Person from '../Person';

it('should render correctly', () => {
  const person = { _id: 'person  unqiue id', name: 'Morteza Alizadeh', age: 37, gender: 'male' };
  const tree = renderer.create(<Person person={person} />).toJSON();

  expect(tree).toMatchSnapshot();
});
