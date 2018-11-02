import React from 'react';
import { shallow } from 'enzyme';
import { About } from './about';

describe.only('<About />', () => {
    it('Should render without crashing', () => {
        shallow(<About />);
    });
});