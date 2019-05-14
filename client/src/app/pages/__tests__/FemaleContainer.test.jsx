import React from 'react';
import { shallow } from 'enzyme';
import FemaleContainer from '../FemaleContainer';
import { PeopleSelectorContainer } from '../../peopleSelector';

describe('FemaleContainer', () => {
  it('should render PeopleSelectorContainer', () => {
    const component = shallow(<FemaleContainer />);
    const foundComponent = component.find(PeopleSelectorContainer);

    expect(foundComponent).toBeDefined();
    expect(foundComponent.props().selectedFilter).toBe('female');
  });
});
