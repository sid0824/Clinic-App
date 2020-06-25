import React from 'react';
import ReactDOM from 'react-dom';
import { Container, List } from 'semantic-ui-react';

import Example from './example';

const App = ({ children }) => (
  <Container style={{ margin: 20 }}>
    <List>
      <List.Item as="a" href="" target="_blank" />
      <List.Item target="_blank" />
    </List>

    {children}
  </Container>
);

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = document.head.appendChild(styleLink);

ReactDOM.render(
  <App>
    <Example />
  </App>,
  document.getElementById('root'),
);
