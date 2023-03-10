import renderer from 'react-test-renderer';
import React from 'react';
import NewUser from '../index';

jest.mock('react-router-dom');

describe('Login Section', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NewUser />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
