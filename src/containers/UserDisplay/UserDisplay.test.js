import React from 'react';
import ReactDOM from 'react-dom';
import UserDisplay from './UserDisplay';
import { shallow } from 'enzyme';

describe('UserDisplay', () => {

  describe('UserDisplay Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<UserDisplay />)
      expect(wrapper).toMatchSnapshot()
    })

  })
})