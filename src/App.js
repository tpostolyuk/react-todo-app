import React, { useState } from 'react';
import { TodoContainer } from './components';
import { themes, ThemeContext } from './ThemeContext.js';

function App() {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
  };

  // style={{background: theme}} //NOT WORKING I DONT KNOW WHY :(
  return (
    <ThemeContext.Provider value={theme}>      
      <TodoContainer handleDarkMode={toggleTheme} />}
    </ThemeContext.Provider>
  );
}

export default App;
