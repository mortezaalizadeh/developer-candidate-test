import initialState from '../InitialState';

describe('Local State Initial State', () => {
  it('should set default sortOrder to asc', () => {
    expect(initialState.get('sortOrder')).toBe('asc');
  });

  it('should set default sortColumn to name', () => {
    expect(initialState.get('sortColumn')).toBe('name');
  });

  it('should set default page number to 0', () => {
    expect(initialState.get('pageNumber')).toBe(0);
  });

  it('should set default rowsPerPage to 5', () => {
    expect(initialState.get('rowsPerPage')).toBe(5);
  });
});
