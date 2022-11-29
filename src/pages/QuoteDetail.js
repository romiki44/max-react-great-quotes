import { Fragment } from 'react';
import { Route, useParams } from 'react-router-dom';
import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
  const params = useParams();

  return (
    // takto...path={`/quotes/${params.quoteId}/comments`}>
    // alebo...path='/quotes/:quoteId/comments'
    <Fragment>
      <h1>Quote Detail Page</h1>
      <p>{params.quoteId}</p>
      <Route path='/quotes/:quoteId/comments'>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
