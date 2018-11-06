import { shallow } from 'enzyme';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Import handler functions
import { searchHandler } from '../../state-handlers';

// Import components
import Dictionary from '../Dictionary';
import WordSuggestion from '../WordSuggestion';
import WordDescription from '../WordDescription';

test('Search box should clear state if searched term is removed', () => {
	const searchTerm = 'something';
	const newSearchTerm = '';
	// Scenario where search term was cleared
	
	const returnData = searchHandler(searchTerm, newSearchTerm);

	expect(returnData).toEqual({
		searchTerm: '',
        wordSuggestions: [],
        noneFound: false,
	});
});

test('Dictionary component renders correctly', () => {
  const component = shallow(<Dictionary />);
  
  expect(component).toMatchSnapshot();
});

test('Clicking suggested word should call searchSuggestedWord method with that word', () => {
  const suggestedWord = "something";
  const searchSuggestedWord = jest.fn();
  const wrapper = mount(
    <WordSuggestion suggestedWord={suggestedWord} searchSuggestedWord={searchSuggestedWord} />
  );

  const btn = wrapper.find('.suggestedWord');
  btn.simulate('click');
  
  expect(searchSuggestedWord).toHaveBeenCalled();
});

test('WordDescription component should have proper word', () => {
  const dictionaryWord = "Something";
  const wrapper = mount(
    <WordDescription dictionaryWord={dictionaryWord} />
  );
  const span = wrapper.find('.dictionaryWord');
  
  expect(span.text()).toBe('Something');
});
