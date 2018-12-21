import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie';
import { shallow } from 'enzyme';

describe('Movie', () => {

  describe('Movie Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Movie />)
      expect(wrapper).toMatchSnapshot()
    })

  })
})