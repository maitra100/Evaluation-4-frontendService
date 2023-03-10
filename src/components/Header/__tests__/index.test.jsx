import renderer from 'react-test-renderer';
import React from 'react';
import Header from '../index';

jest.mock('react-router-dom');

describe('Login Section', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
