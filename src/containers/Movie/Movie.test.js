import React from 'react';
import { mapStateToProps, mapDispatchToProps, Movie } from './Movie';
import { shallow } from 'enzyme'; 
import { addFavoriteThunk } from '../../thunks/addFavorite';
import { getFavoritesThunk } from '../../thunks/getFavorites';
import { removeFavoriteThunk } from '../../thunks/removeFavorite';

jest.mock('../../thunks/addFavorite')
jest.mock('../../thunks/removeFavorite')
jest.mock('../../thunks/getFavorites')

describe('Movie', () => {
  describe('Movie Component', () => {
    it('should match the snapshot when there is not a user logged in', () => {
      const mockUser = {}
      const mockFav = {
        title: 'MovieTitle',
        id: 123,
        rating: 9,
        text: 'MovieText',
        release: 'May4bewithyou'
      }
      const wrapper = shallow(<Movie user={mockUser} {...mockFav} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot when there is a user logged in and it is a favorite', () => {
      const mockUser = {name: ''}
      const mockFav = {
        title: 'MovieTitle',
        id: 123,
        rating: 9,
        text: 'MovieText',
        release: 'May4bewithyou',
        favorite: true
      }
      const wrapper = shallow(<Movie user={mockUser} {...mockFav} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot when there is a user logged in and not a favorite', () => {
      const mockUser = {name: ''}
      const mockFav = {
        title: 'MovieTitle',
        id: 123,
        rating: 9,
        text: 'MovieText',
        release: 'May4bewithyou',
        favorite: false
      }
      const wrapper = shallow(<Movie user={mockUser} {...mockFav} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should parse the user and favorites from state', () => {
      let mockUser = {name: ''}
      let mockFav = {
        title: 'MovieTitle',
        id: 123,
        rating: 9,
        text: 'MovieText',
        release: 'May4bewithyou'
      }
      let mockFavoriteArray = [mockFav]
      let mockState = {
        favorites: mockFavoriteArray,
        user: mockUser,
        other: 'other thing in state'
      }
      const expectedFavorite = mockFavoriteArray
      const expectedUser = mockUser
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps.favorites).toEqual(expectedFavorite)
      expect(mappedProps.user).toEqual(expectedUser)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should return a props object with the method addFavoriteThunk', () => {
      const mockDispatch = jest.fn()
      addFavoriteThunk.mockImplementation(() => 'Added Fav')
      removeFavoriteThunk.mockImplementation(() => 'Removed Fav')
      getFavoritesThunk.mockImplementation(() => 'Got em!')


      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addFavoriteThunk()
      mappedProps.removeFavoriteThunk()
      mappedProps.getFavoritesThunk()

      expect(mockDispatch).toHaveBeenNthCalledWith(1, 'Added Fav')
      expect(mockDispatch).toHaveBeenNthCalledWith(2, 'Removed Fav')
      expect(mockDispatch).toHaveBeenNthCalledWith(3, 'Got em!')
    })
  })

  describe('handleAddFavorite', () => {
    it('should addFavorite and fetch that update when handleAddFavorite is called', async () => {
      const mockProps = { title: 'A movie', id: 123, rating: 5, text: 'Some stuff', release: 'A Date', poster: 'pretty pictures', user: 1 }
      const mockAddThunk = jest.fn()
      const mockGetThunk = jest.fn()
      const mockUser = { name: 'Bob' }
      const wrapper = shallow(<Movie {...mockProps} addFavoriteThunk={mockAddThunk} getFavoritesThunk={mockGetThunk} user={mockUser} />)

      await wrapper.find('.add-to-favs').simulate('click')

      expect(mockAddThunk).toBeCalled()
      expect(mockGetThunk).toBeCalled()
    })
  })

  describe('handleRemoveFavorite', () => {
    it('should removeFavorite and fetch update when called', async () => {
      const mockProps = { title: 'A movie', id: 123, rating: 5, text: 'Some stuff', release: 'A Date', poster: 'pretty pictures', user: 1, favorite: true }
      const mockRemoveThunk = jest.fn()
      const mockGetThunk = jest.fn()
      const mockUser = { name: 'Bob' }
      const wrapper = shallow(<Movie {...mockProps} removeFavoriteThunk={mockRemoveThunk} getFavoritesThunk={mockGetThunk} user={mockUser} />)

      await wrapper.find('.add-to-favs').simulate('click')

      expect(mockRemoveThunk).toBeCalled()
      expect(mockGetThunk).toBeCalled()
    })
  })
})