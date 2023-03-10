import renderer from 'react-test-renderer';
import React from 'react';
import Login from '../index';

jest.mock('react-router-dom');

describe('Login Section', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
