import { Fragment } from 'react';
import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
  { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
  { id: 'q2', author: 'Jack', text: 'Angular is great!' },
  { id: 'q3', author: 'Tom', text: 'Javascript is first' },
];

const AllQuotes = () => {
  return (
    <Fragment>
      <QuoteList quotes={DUMMY_QUOTES} />
    </Fragment>
  );
};

export default AllQuotes;
