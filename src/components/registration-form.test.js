import React from 'react';
import { shallow } from 'enzyme';
import { RegistrationForm } from './registration-form';

describe.only('<RegistrationForm />', () => {
    it('Should render without crashing', () => {
        shallow(<RegistrationForm dispatch={jest.fn()} handleSubmit={jest.fn()}/>);
    });
});