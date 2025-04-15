import { Provider } from "react-redux";
import "./App.css";
import AuthPage from "./components/AuthPage/AuthPage";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthPage />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
