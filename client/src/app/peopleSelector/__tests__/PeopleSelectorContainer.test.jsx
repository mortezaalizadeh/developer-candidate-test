import Chance from 'chance';
import React from 'react';
import { shallow } from 'enzyme';
import PeopleSelector from '../PeopleSelector';
import PeopleSelectorContainerComponent from '../PeopleSelectorContainerComponent';
import { PersonResultContainer } from '../../personResult';

const chance = new Chance();

class HistoryMock {
  constructor() {
    this.push = jest.fn();
  }
}

describe('PeopleSelectorContainerComponent', () => {
  let selectedFilter;
  let component;
  let history;

  beforeEach(() => {
    selectedFilter = chance.string();
    history = new HistoryMock();

    const injectedProps = {
      selectedFilter,
      history,
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

  it('should navigate to /everybody link when everybody button event raised', () => {
    const foundComponent = component.find(PeopleSelector);

    foundComponent.props().onSelectorSelected('everybody');

    expect(history.push.mock.calls).toHaveLength(1);
    expect(history.push.mock.calls[0][0]).toBe('/everybody');
  });

  it('should navigate to /male link when male button event raised', () => {
    const foundComponent = component.find(PeopleSelector);

    foundComponent.props().onSelectorSelected('male');

    expect(history.push.mock.calls).toHaveLength(1);
    expect(history.push.mock.calls[0][0]).toBe('/male');
  });

  it('should navigate to /female link when female button event raised', () => {
    const foundComponent = component.find(PeopleSelector);

    foundComponent.props().onSelectorSelected('female');

    expect(history.push.mock.calls).toHaveLength(1);
    expect(history.push.mock.calls[0][0]).toBe('/female');
  });

  it('should navigate to /over30 link when over30 button event raised', () => {
    const foundComponent = component.find(PeopleSelector);

    foundComponent.props().onSelectorSelected('over30');

    expect(history.push.mock.calls).toHaveLength(1);
    expect(history.push.mock.calls[0][0]).toBe('/over30');
  });

  it('should navigate to /under30 link when under30 button event raised', () => {
    const foundComponent = component.find(PeopleSelector);

    foundComponent.props().onSelectorSelected('under30');

    expect(history.push.mock.calls).toHaveLength(1);
    expect(history.push.mock.calls[0][0]).toBe('/under30');
  });
});
