import React from 'react';
import renderer from 'react-test-renderer';
import MessageBarContent from '../MessageBarContent';

it('should render correctly', () => {
  const tree = renderer.create(<MessageBarContent variant="error" message="This is a test error message" />).toJSON();

  expect(tree).toMatchSnapshot();
});
