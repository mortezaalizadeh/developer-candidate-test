import React from 'react';
import renderer from 'react-test-renderer';
import PeopleSelector from '../PeopleSelector';

it('should render correctly', () => {
  const tree = renderer.create(<PeopleSelector />).toJSON();

  expect(tree).toMatchSnapshot();
});
