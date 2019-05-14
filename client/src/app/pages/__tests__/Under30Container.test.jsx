import React from 'react';
import { shallow } from 'enzyme';
import Under30Container from '../Under30Container';
import { PeopleSelectorContainer } from '../../peopleSelector';

describe('Under30Container', () => {
  it('should render PeopleSelectorContainer', () => {
    const component = shallow(<Under30Container />);
    const foundComponent = component.find(PeopleSelectorContainer);

    expect(foundComponent).toBeDefined();
    expect(foundComponent.props().selectedFilter).toBe('under30');
  });
});
