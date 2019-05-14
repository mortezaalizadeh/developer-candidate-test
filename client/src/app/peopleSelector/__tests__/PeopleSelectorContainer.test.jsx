import Chance from 'chance';
import React from 'react';
import { shallow } from 'enzyme';
import PeopleSelector from '../PeopleSelector';
import PeopleSelectorContainerComponent from '../PeopleSelectorContainerComponent';
import { PersonResultContainer } from '../../personResult';

const chance = new Chance();

describe('PeopleSelectorContainerComponent', () => {
  let selectedFilter;
  let component;

  beforeEach(() => {
    selectedFilter = chance.string();

    const injectedProps = {
      selectedFilter,
    };

    component = shallow(<PeopleSelectorContainerComponent {...injectedProps} />);
  });

  it('should render PeopleSelector', () => {
    const foundComponent = component.find(PeopleSelector);

    expect(foundComponent).toBeDefined();
    expect(foundComponent.props().selectedFilter).toBe(selectedFilter);
  });

  it('should render PersonResultContainer', () => {
    const foundComponent = component.find(PersonResultContainer);

    expect(foundComponent).toBeDefined();
  });
});
