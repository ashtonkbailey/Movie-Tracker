import React from 'react';
import ReactDOM from 'react-dom';
import MovieDisplay from './MovieDisplay';
import { shallow } from 'enzyme';

describe('MovieDisplay', () => {

  describe('MovieDisplay Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<MovieDisplay />)
      expect(wrapper).toMatchSnapshot()
    })

  })
})