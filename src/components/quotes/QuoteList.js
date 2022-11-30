import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  //informacie o aktualnej stranke...napr. query-parameters
  const location = useLocation();
  //URLSearchParams() je built-in browser-funkcia...vrati key-value pole
  const queryParams = new URLSearchParams(location.search);
  const isSortAsc = queryParams.get('sort') === 'asc';
  //sorting quotes
  const sortedQuotes = sortQuotes(props.quotes, isSortAsc);

  const changeSortingHandler = () => {
    //history.push() sposobi re-renderovanie componentu!

    //klasicky s celou cestou
    //history.push('/quotes?sort=' + (isSortAsc ? 'desc' : 'asc'));
    //...alebo vyuzitie location
    //history.push(`${location.pathname}?sort=${isSortAsc ? 'desc' : 'asc'}`);
    //..alebo ako objekt+location...mozno o nieco mlao prehladnejsie
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortAsc ? 'desc' : 'asc'}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortAsc ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
