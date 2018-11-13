import React from 'react';
import { shallow } from 'enzyme';
import { Channel } from './channel';
import { join } from 'path';

describe.only('<Channel />', () => {
    it('Should render without crashing', () => {
        shallow(<Channel dispatch={jest.fn()}/>);
    });
});