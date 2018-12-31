import React from 'react';
import { shallow , mount} from 'enzyme';
import { mapStateToProps, mapDispatchToProps, App } from '../App/App';
import * as clean from '../../utils/cleaner'
import * as actions from '../../actions/index';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../utils/cleaner')

describe('App', () => {

  describe('App Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<App />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should get movies when the component mounts', async () => {
      const mockAdd = jest.fn()
      const wrapper = shallow(<App addMovies={mockAdd} />)

      await wrapper.instance().componentDidMount()

      expect(mockAdd).toBeCalled()
    }) 
  })

  describe('routes', () => {
    /// Can add routes if we want to / have time but not needed if we dont
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = {
        movies: [{ title: 'Movie', rating: 4, description: 'stuff'}]
      }
      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(mockState)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method addMovies', () => {
      const mockDispatch = jest.fn()
      const expected = actions.addMovies()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addMovies()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})