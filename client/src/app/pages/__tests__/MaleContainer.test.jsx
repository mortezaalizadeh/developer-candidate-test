import React from 'react';
import { shallow } from 'enzyme';
import MaleContainer from '../MaleContainer';
import { PeopleSelectorContainer } from '../../peopleSelector';

describe('MaleContainer', () => {
  it('should render PeopleSelectorContainer', () => {
    const component = shallow(<MaleContainer />);
    const foundComponent = component.find(PeopleSelectorContainer);

    expect(foundComponent).toBeDefined();
    expect(foundComponent.props().selectedFilter).toBe('male');
  });
});
