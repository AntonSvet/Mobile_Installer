import { Provider } from "react-redux";
import "./App.css";
import AuthPage from "./components/AuthPage/AuthPage";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthPage />
      </Provider>
    </div>
  );
}

export default App;
