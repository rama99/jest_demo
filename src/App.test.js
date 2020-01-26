import React from 'react';
//import { render } from '@testing-library/react';
import App from './App';

import Enzyme , {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
//import { exportAllDeclaration } from '@babel/types';

Enzyme.configure({
  adapter: new EnzymeAdapter()
})

const setup = (props={} , state=null) => {

  const wrapper = shallow(<App {...props}  />);
  if(state) wrapper.setState(state);
  return wrapper;
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test(`renders without error` , () => {
  const wrapper = setup(); 
  const appComponent = findByTestAttr(wrapper , "component-app"); // wrapper.find("[data-test='component-app']");  
  expect(appComponent.length).toBe(1);
})

test(`renders increment button` , () => {
  const wrapper = setup(); 
  const button = findByTestAttr(wrapper , "increment-button"); // wrapper.find("[data-test='increment-button']");  
  expect(button.length).toBe(1);
})

test(`renders counter display` , () => {
  const wrapper = setup(); 
  const counterDisplay =  findByTestAttr(wrapper , "counter-display"); //wrapper.find("[data-test='counter-display']");  
  expect(counterDisplay.length).toBe(1);
})

test(`counter starts at zero` , () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state(`counter`);
  expect(initialCounterState).toBe(0);
})

test(`clicking button increments counter in display` , () => {
  const counter = 7;
  const wrapper = setup(null, {counter});
  const button = findByTestAttr(wrapper , `increment-button`);
  button.simulate(`click`);

  const counterDisplay =  findByTestAttr(wrapper , "counter-display"); //wrapper.find("[data-test='counter-display']");  
  expect(counterDisplay.text()).toContain(counter + 1);

})