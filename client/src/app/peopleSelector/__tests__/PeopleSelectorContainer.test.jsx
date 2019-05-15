import Chance from 'chance';
import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import PeopleSelector from '../PeopleSelector';
import PeopleSelectorContainerComponent from '../PeopleSelectorContainerComponent';
import { PersonResultContainer } from '../../personResult';

const chance = new Chance();

class HistoryMock {
  constructor() {
    this.push = jest.fn();
  }
}

class PersonAPIMock {
  constructor() {
    this.searchPersons = jest.fn();
  }
}

class LocalStateMock {
  constructor() {
    this.pageNumberChanged = jest.fn();
  }
}

describe('PeopleSelectorContainerComponent', () => {
  let selectedFilter;
  let component;
  let history;
  let personApi;
  let localState;

  beforeEach(() => {
    selectedFilter = chance.string();
    history = new HistoryMock();
    personApi = new PersonAPIMock();
    localState = new LocalStateMock();

    const injectedProps = {
      selectedFilter,
      history,
      personApiActions: personApi,
      localStateActions: localState,
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

  it('should dispatch searchPersons message to read everybody', () => {
    const injectedProps = {
      selectedFilter: 'everybody',
      personApiActions: personApi,
      localStateActions: localState,
    };

    shallow(<PeopleSelectorContainerComponent {...injectedProps} />);
    expect(personApi.searchPersons.mock.calls).toHaveLength(1);
    expect(personApi.searchPersons.mock.calls[0][0]).toBe(Map());
  });

  it('should dispatch searchPersons message to read male', () => {
    const injectedProps = {
      selectedFilter: 'male',
      personApiActions: personApi,
      localStateActions: localState,
    };

    shallow(<PeopleSelectorContainerComponent {...injectedProps} />);
    expect(personApi.searchPersons.mock.calls).toHaveLength(1);
    expect(personApi.searchPersons.mock.calls[0][0].getIn(['criteria', 'gender'])).toBe('male');
  });

  it('should dispatch searchPersons message to read female', () => {
    const injectedProps = {
      selectedFilter: 'female',
      personApiActions: personApi,
      localStateActions: localState,
    };

    shallow(<PeopleSelectorContainerComponent {...injectedProps} />);
    expect(personApi.searchPersons.mock.calls).toHaveLength(1);
    expect(personApi.searchPersons.mock.calls[0][0].getIn(['criteria', 'gender'])).toBe('female');
  });

  it('should dispatch searchPersons message to read over30', () => {
    const injectedProps = {
      selectedFilter: 'over30',
      personApiActions: personApi,
      localStateActions: localState,
    };

    shallow(<PeopleSelectorContainerComponent {...injectedProps} />);
    expect(personApi.searchPersons.mock.calls).toHaveLength(1);
    expect(personApi.searchPersons.mock.calls[0][0].getIn(['criteria', 'age_gte'])).toBe(30);
  });

  it('should dispatch searchPersons message to read under30', () => {
    const injectedProps = {
      selectedFilter: 'under30',
      personApiActions: personApi,
      localStateActions: localState,
    };

    shallow(<PeopleSelectorContainerComponent {...injectedProps} />);
    expect(personApi.searchPersons.mock.calls).toHaveLength(1);
    expect(personApi.searchPersons.mock.calls[0][0].getIn(['criteria', 'age_lt'])).toBe(30);
  });

  it('should dispatch message to reset page number', () => {
    expect(localState.pageNumberChanged.mock.calls).toHaveLength(1);
    expect(localState.pageNumberChanged.mock.calls[0][0].get('pageNumber')).toBe(0);
  });
});
