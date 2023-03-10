import renderer from 'react-test-renderer';
import React from 'react';
import ImageContainer from '../index';

jest.mock('react-router-dom');

describe('Login Section', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ImageContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
