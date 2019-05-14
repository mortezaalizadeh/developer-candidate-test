import React from 'react';
import renderer from 'react-test-renderer';
import PersonResult from '../PersonResult';

it('should render correctly', () => {
  const persons = [
    { _id: 'person  unqiue id 1', name: 'Morteza Alizadeh 1', age: 37, gender: 'male' },
    { _id: 'person  unqiue id 2', name: 'Morteza Alizadeh 2', age: 38, gender: 'male' },
  ];
  const tree = renderer
    .create(
      <PersonResult
        sortColumn="name"
        sortOrder="asc"
        page={10}
        rowsPerPage={25}
        totalPersonCount={100}
        emptyRows={25}
        numSelected={0}
        persons={persons}
        isSelected={() => true}
        onChangePage={() => {}} />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
