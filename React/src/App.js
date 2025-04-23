import logo from './logo.svg';
import './App.css';
import { Provider, useDispatch } from 'react-redux'
import store from './redux/store'
import { Main } from './comps/Main';
function App() {
  return (
  <Provider store={store}>
    <Main></Main>
  </Provider>
  );
}

export default App;
