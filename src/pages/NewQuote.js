import { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  //useHistory()...nieco ako NavigateTo() v blazore
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    sendRequest(quoteData);

    //history.push()...prida novu stranku, moznost vratit sa spat
    //history.replace()....nahradi akt. stranku novou, nie je mozne vrati sa spat, nieco ako redirect
    //history.push('/quotes');
  };

  return (
    <Fragment>
      <QuoteForm
        isLoading={status === 'pending'}
        onAddQuote={addQuoteHandler}
      />
    </Fragment>
  );
};

export default NewQuote;
