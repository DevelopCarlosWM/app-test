import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainScreen from './screens/MainScreen';
import { Provider } from 'react-redux';
import store from './redux/store/createStore';
import ProjectScreen from './screens/ProjectScreen';
import NewProjectScreen from './screens/NewProjectScreen';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/project/:projectName" element={<ProjectScreen />} />
          <Route path="/project/new" element={<NewProjectScreen />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
