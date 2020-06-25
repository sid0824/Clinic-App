import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";

import Example from "./example";

const App = ({ children }) => (
  <Container style={{ margin: 20 }}>
    <List bulleted>
      <List.Item
        as="a"
        content="💡 StackOverflow"
        href="https://stackoverflow.com/questions/tagged/semantic-ui-react?sort=frequent"
        target="_blank"
      />
    </List>

    {children}
  </Container>
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <App>
    <Example />
  </App>,
  document.getElementById("root")
);
export default Example;
