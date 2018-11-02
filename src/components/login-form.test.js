import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './login-form';

describe.only('<LoginForm />', () => {
    it('Should render without crashing', () => {
        shallow(<LoginForm dispatch={jest.fn()} handleSubmit={jest.fn()}/>);
    });
});