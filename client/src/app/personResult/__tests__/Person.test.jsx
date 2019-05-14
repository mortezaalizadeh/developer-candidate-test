import React from 'react';
import renderer from 'react-test-renderer';
import Person from '../Person';

it('renders correctly when there are no items', () => {
  const person = { _id: 'person  unqiue id', name: 'Morteza Alizadeh', age: 37, gender: 'male' };
  const tree = renderer.create(<Person person={person} />).toJSON();

  expect(tree).toMatchSnapshot();
});
