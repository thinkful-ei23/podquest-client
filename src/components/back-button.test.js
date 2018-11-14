import React from 'react';
import { shallow } from 'enzyme';
import BackButton from './back-button';

describe.only('<BackButton />', () => {
    it('Should render without crashing', () => {
        shallow(<BackButton />);
    });
});