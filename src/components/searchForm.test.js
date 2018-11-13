import React from 'react';
import { shallow } from 'enzyme';
import  SearchForm  from './searchForm';

describe.only('<SearchForm />', () => {
    it('Should render without crashing', () => {
        shallow(<SearchForm dispatch={jest.fn()}/>);
    });
});