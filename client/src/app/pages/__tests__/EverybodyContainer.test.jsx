import React from 'react';
import { shallow } from 'enzyme';
import EverybodyContainer from '../EverybodyContainer';
import { PeopleSelectorContainer } from '../../peopleSelector';

describe('EverybodyContainer', () => {
  it('should render PeopleSelectorContainer', () => {
    const component = shallow(<EverybodyContainer />);
    const foundComponent = component.find(PeopleSelectorContainer);

    expect(foundComponent).toBeDefined();
    expect(foundComponent.props().selectedFilter).toBe('everybody');
  });
});
