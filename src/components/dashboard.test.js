import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './dashboard';

describe.only('<Dashboard />', () => {
    it('Should render without crashing', () => {
        shallow(<Dashboard dispatch={jest.fn()}/>);
    });
});