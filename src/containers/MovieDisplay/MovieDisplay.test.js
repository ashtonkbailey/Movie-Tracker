import React from 'react';
import ReactDOM from 'react-dom';
import {MovieDisplay, mapStateToProps} from './MovieDisplay';
import { shallow } from 'enzyme';

describe('MovieDisplay', () => {

  describe('MovieDisplay Component', () => {
    it('Related to which movies are displayed-- should match the snapshot, if type is home and the user has an e mail', () => {
      const mockUser = {name: 'bob', id: 123, email: 'something@anotherThing.com'}
      const mockFavoriteArray = [111]
      const mockMoviesArray = [{title: 'One', id: 111}, {title: 'two', id: 222}]
      const wrapper = shallow(<MovieDisplay type='home' user={mockUser} movies={mockMoviesArray} favorites={mockFavoriteArray}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('Related to which movies are displayed-- should match the snapshot, if type is home and there is not a user', () => {
      const mockUser = {}
      const mockFavoriteArray = [{title: 'movieTitle', id: 987}]
      const mockMoviesArray = [{title: 'One', id: 111}, {title: 'two', id: 222}]
      const wrapper = shallow(<MovieDisplay type='home' user={mockUser} movies={mockMoviesArray} favorites={mockFavoriteArray}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('Related to which movies are displayed-- should match the snapshot, if type is favorites and there is a user who does not have favorites saved', () => {
      const mockUser = {name: 'bob', id: 123, email: 'something@anotherThing.com'}
      const mockFavoriteArray = []
      const mockMoviesArray = [{title: 'One', id: 111}, {title: 'two', id: 222}]
      const wrapper = shallow(<MovieDisplay type='favorites' user={mockUser} movies={mockMoviesArray} favorites={mockFavoriteArray}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('Related to which movies are displayed-- should match the snapshot, if type is favorites and there is a user who does have favorites saved', () => {
      const mockUser = {name: 'bob', id: 123, email: 'something@anotherThing.com'}
      const mockFavoriteArray = [222]
      const mockMoviesArray = [{title: 'One', id: 111}, {title: 'two', id: 222}]
      const wrapper = shallow(<MovieDisplay type='favorites' user={mockUser} movies={mockMoviesArray} favorites={mockFavoriteArray}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('Related to Navigation Button-- should match the snapshot, if type is home and there is a user signed in', () => {
      const mockUser = {name: 'bob', id: 123, email: 'something@anotherThing.com'}
      const mockFavoriteArray = [{title: 'movieTitle', id: 987}]
      const mockMoviesArray = [{title: 'One', id: 111}, {title: 'two', id: 222}]
      const wrapper = shallow(<MovieDisplay type='home' user={mockUser} movies={mockMoviesArray} favorites={mockFavoriteArray}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('Related to Navigation Button-- should match the snapshot, if type is favorites and there is a user signed in', () => {
      const mockUser = {name: 'bob', id: 123, email: 'something@anotherThing.com'}
      const mockFavoriteArray = [{title: 'movieTitle', id: 987}]
      const mockMoviesArray = [{title: 'One', id: 111}, {title: 'two', id: 222}]
      const wrapper = shallow(<MovieDisplay type='favorites' user={mockUser} movies={mockMoviesArray} favorites={mockFavoriteArray}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('passes information regarding favorite status of movie if the movie is included in the list of favorites', () => {

    })
  })

  describe('mapStateToProps', () => {
    it('should parse the user, movies, and favorites from state', () => {
      const mockUser = {name: 'bob', id: 123}
      const mockFavoriteArray = [{title: 'movieTitle', id: 987}]
      const mockMoviesArray = [{title: 'One', id: 111}, {title: 'two', id: 222}]
      const mockState = {
        favorites: mockFavoriteArray,
        user: mockUser,
        other: 'other thing in state',
        movies: mockMoviesArray
        }
      const expectedFavorite = mockFavoriteArray
      const expectedUser = mockUser
      const expectedMovies = mockMoviesArray
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps.favorites).toEqual(expectedFavorite)
      expect(mappedProps.user).toEqual(expectedUser)
      expect(mappedProps.movies).toEqual(expectedMovies)
    })
  })
})