import React from 'react';
import AppRouter from "./router";
import ApplicationContainer from "pages/common/applicationContainer/container";

function App() {
  return (
    <ApplicationContainer>
      <AppRouter/>
    </ApplicationContainer>
  );
}

export default App;
