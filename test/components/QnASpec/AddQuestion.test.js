import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';

import AddQuestionForm from '../../../client/src/components/QnAcomponents/AddQuestionForm.jsx';
import AddQuestion from '../../../client/src/components/QnAcomponents/AddQuestion.jsx';



describe('Rendering add question parent component', function() {
  xit('should render without throwing an error', function() {
    expect(shallow(<AddQuestion />).contains( <div className='add-question-parent'></div>
    )).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddQuestion />).is('.add-question-parent')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AddQuestion />).find('.add-question-parent').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Add a new question';
    expect(render(<AddQuestion />).text()).toEqual(text);
  });
});

describe('Add new question form', function() {

  test('click on submit button without filling the form', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddQuestionForm/>);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');
    //wrapper.find('[type="submit"]').simulate('submit');
    expect(wrapper.find('form')).toHaveLength(1);
    //wrapper.find('form').simulate('submit', formEventMocked);
    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect(spy1).not.toHaveBeenCalled();

  });

  test('click on submit button when form not filled properly', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddQuestionForm/>);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      questionBody: 'This is a question from tests',
      nickname: 'gandalf',
      email: ''
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();
    //expect(wrapper.find('form')).toHaveLength(1);

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);

    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);

  });

  test('allows to type in the form fields', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = mount(<AddQuestionForm/>);
    //wrapper.find('input').simulate('change', {target: {value: 'Your new Value'}});
    const question = wrapper.find({name: 'questionBody'});
    question.props().value = 'foo';
    //question.simulate('change', { target: { value: 'bla' } });
    //console.log(question.debug());
    //wrapper.update();
    //wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(question.props().value).toBeTruthy();

  });

  test('handle validation should return false without input', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('', '', '')).toEqual(false);
  });

  test('handle validation should return false without question', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('', 'aragorn', 'kings@dunedain.com')).toEqual(false);
  });

  test('handle validation should return false without nickname', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', '', 'kings@dunedain.com')).toEqual(false);
  });

  test('handle validation should return false without email', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', 'bill the pony', '')).toEqual(false);
  });

  test('handle validation should return false with email in wrong format', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', 'bill the pony', 'dummyemail')).toEqual(false);
  });

  test('handle validation should return true with proper arguments', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', 'bill the pony', 'ponies@example.com')).toEqual(true);
  });

  it('should render without throwing an error', function() {
    expect(shallow(<AddQuestionForm />).contains(<div className = 'qna-add-question-main-title'>Ask a question</div>)).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddQuestionForm />).is('.qna-add-new-question-form')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AddQuestionForm />).find('.qna-add-new-question-form').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Ask a questionAbout the Your question*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailed';
    expect(render(<AddQuestionForm />).text()).toEqual(text);
  });

  it('should have properties at state', () => {
    const wrapper = mount(<AddQuestionForm
    />);
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.state().questionBody).toEqual('');
    expect(wrapper.state().nickname).toEqual('');
    expect(wrapper.state().email).toEqual('');
  });


});