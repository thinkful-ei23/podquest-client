import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './spinner';

describe.only('<Spinner />', () => {
    it('Should render without crashing', () => {
        shallow(<Spinner />);
    });
});