import React from 'react';
import { shallow } from 'enzyme';
import SearchResults from '../searchResults';

describe.only('<SearchResults />', () => {
    it('Should render without crashing', () => {
        shallow(<SearchResults dispatch={jest.fn()} podcast={jest.fn()}/>);
    });
});