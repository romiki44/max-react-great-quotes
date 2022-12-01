import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
//import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';
//import QuoteDetail from './pages/QuoteDetail';

//optimalizacia importu iba ked je component potrebny
//aby to fungovalo, treba nastavit Suspense falllback, to jest kym prebieha
//lazy import zobrazi sa napr. Loading, alebo LoadingSpinner....inac by to krachlo
//...apropo, ten lazy import sa urobi iba raz, pri prvom pouziti...potom je uz natiahnuty v pamati a vsetko je ok
//..je to dolezite hlavne pri velkych apkach, nei pri takejto malej...
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes />
          </Route>
          <Route path='/quotes/:quoteId'>
            <QuoteDetail />
          </Route>
          <Route path='/new-quote'>
            <NewQuote />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
