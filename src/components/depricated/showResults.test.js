import React from 'react';
import { shallow } from 'enzyme';
import  ShowResults  from './showResults';

describe.only('<ShowResults />', () => {
    it('Should render without crashing', () => {
        shallow(<ShowResults dispatch={jest.fn()}/>);
    });
});