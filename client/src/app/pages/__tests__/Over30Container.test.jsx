import React from 'react';
import { shallow } from 'enzyme';
import Over30Container from '../Over30Container';
import { PeopleSelectorContainer } from '../../peopleSelector';

describe('Over30Container', () => {
  it('should render PeopleSelectorContainer', () => {
    const component = shallow(<Over30Container />);
    const foundComponent = component.find(PeopleSelectorContainer);

    expect(foundComponent).toBeDefined();
    expect(foundComponent.props().selectedFilter).toBe('over30');
  });
});
