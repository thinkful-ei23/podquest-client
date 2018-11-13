import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from './landing-page';

describe.only('<LandingPage />', () => {
    it('Should render without crashing', () => {
        shallow(<LandingPage dispatch={jest.fn()}/>);
    });
});