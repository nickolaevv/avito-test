import React from 'react';
import Pictures from './components/Pictures';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return(
        <div style = {{height:'100vh'}}>
          <div className = 'app-header'> TEST APP </div>
            <Pictures/>
        </div>
      );
    }
}
export default App;
