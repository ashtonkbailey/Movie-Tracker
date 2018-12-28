import React from 'react';
import ReactDOM from 'react-dom';
import Movie, { mapStateToProps, mapDispatchToProps }from './Movie';
import { shallow } from 'enzyme'; 
import { addFavoriteThunk } from '../../thunks/addFavorite';
import { getFavoritesThunk } from '../../thunks/getFavorites';
import { removeFavoriteThunk } from '../../thunks/removeFavorite';


describe('Movie', () => {

  describe('Movie Component', () => {
    it('should match the snapshot when there is not a user loged in', () => {
      const mockUser = {name: ''}
      const wrapper = shallow(<Movie user={mockUser}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot when there is a user logged in and it is a favorite', () => {
      const mockUser = {name: ''}
      const mockFav = {
        title: 'MovieTitle',
        id: 123,
        rating: 9,
        text: 'MovieText',
        release: 'May4bewithyou'
      }
      const wrapper = shallow(<Movie favorites={[mockFav]} user={mockUser}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot when there is a user logged in and not a favorite', () => {
      const mockUser = {name: ''}
      const wrapper = shallow(<Movie favorites={[]} user={mockUser}/>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  // describe('mapStateToProps', () => {
  //   it('should parse the user and favorites from state', () => {
  //     let mockUser = {name: ''}
  //     let mockFav = {
  //       title: 'MovieTitle',
  //       id: 123,
  //       rating: 9,
  //       text: 'MovieText',
  //       release: 'May4bewithyou'
  //     }
  //     let mockFavoriteArray = [mockFav]
  //     let mockState = {
  //       favorites: mockFavoriteArray,
  //       user: mockUser,
  //       other: 'other thing in state'
  //     }
  //     const expectedFavorite = mockFavoriteArray
  //     const expectedUser = mockUser
  //     const mappedProps = mapStateToProps(mockState)
  //     expect(mappedProps.favorites).toEqual(expectedFavorite)
  //     expect(mappedProps.user).toEqual(expectedUser)
  //   })
  // })
  describe('mapDispatchToProps', () => {

    it('should return a props object with the method addFavoriteThunk', () => {
      const favoriteObj = {
        title: 'MovieTitle',
        id: 123,
        rating: 9,
        text: 'MovieText',
        release: 'Maythe4thbewithyou'
      }
      const favorites = []
      const mockDispatch = jest.fn()
      const action = addFavoriteThunk(favoriteObj, favorites)

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addFavoriteThunk(favoriteObj, favorites)

      expect(mockDispatch).toHaveBeenCalledWith(action)
    })
  })
})