import React from 'react';
import renderer from 'react-test-renderer';
import PersonResultToolbar from '../PersonResultToolbar';

it('should render correctly', () => {
  const tree = renderer.create(<PersonResultToolbar numSelected={10} />).toJSON();

  expect(tree).toMatchSnapshot();
});
