import React from 'react';
import renderer from 'react-test-renderer';
import PersonResultTableHead from '../PersonResultTableHead';

it('should render correctly', () => {
  const tree = renderer.create(<PersonResultTableHead sortColumn="name" sortOrder="asc" />).toJSON();

  expect(tree).toMatchSnapshot();
});
