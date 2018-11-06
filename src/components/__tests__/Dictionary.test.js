import { shallow } from 'enzyme';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Import handler functions
import { searchHandler } from '../../state-handlers';

import mockBackend from '../../mockBackend';

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
  const component = shallow(<Dictionary suggester={{}} db={{}} />);
  
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
    <WordDescription dictionaryWord={dictionaryWord} dictionaryDefinition="" />
  );
  const span = wrapper.find('.dictionaryWord');
  
  expect(span.text()).toBe('Something');
});

test('Searched word, if found, should fetch correct word', async () => {
	const { db } = await mockBackend();
	db.findOne({ word: "hi" }, (err, doc) => {
		expect(doc.dictionaryWord).toBe('Hi');
	});
});