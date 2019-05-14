import React from 'react';
import renderer from 'react-test-renderer';
import PeopleSelector from '../PeopleSelector';

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<PeopleSelector />).toJSON();

  expect(tree).toMatchSnapshot();
});
