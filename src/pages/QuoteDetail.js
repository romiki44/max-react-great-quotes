import { Fragment, useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
//   { id: 'q2', author: 'Jack', text: 'Angular is great!' },
//   { id: 'q3', author: 'Tom', text: 'Javascript is first' },
// ];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  //vraj vzdy existuje nejaky loadedQuote...preto text...tak neviem
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  // if (!quote) {
  //   return <p>No quote found!</p>;
  // }

  return (
    //plus pouzite useMatchRoute()
    //match.path....route s parametrom /quotes/:quoteId ako palceholder
    //match.url...route s konkrenou url, napr. /quotes/q1...
    //match.url treba pouzit do Linku, lebo Link potrebuje presnu url, nie definiciu route...inac nefunguje!!!
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link to={`${match.url}/comments`} className='btn--flat'>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );

  /*return (
     //da sa vyuzit Route na zobrazenie/skrytie linku Load Comments podla url!!
    //cize takto sa da pouzit Route napr. na podmienene zobrazovanie komplexnych komponentov
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path='/quotes/:quoteId' exact>
        <div className='centered'>
          <Link to={`/quotes/${params.quoteId}/comments`} className='btn--flat'>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path='/quotes/:quoteId/comments'>
        <Comments />
      </Route>
    </Fragment>
  );*/

  //klasicky...s tym, ze link Load Comments stale zostava viditelny
  /*return (
    // takto...path={`/quotes/${params.quoteId}/comments`}>
    // alebo...path='/quotes/:quoteId/comments'
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <div className='centered'>
        <Link to={`/quotes/${params.quoteId}/comments`} className='btn--flat'>
          Load Comments
        </Link>
      </div>
      <Route path='/quotes/:quoteId/comments'>
        <Comments />
      </Route>
    </Fragment>
  );*/
};

export default QuoteDetail;
