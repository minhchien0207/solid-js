import { MetaProvider, Title } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import './app.css';
import Layout from './layout';

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <Layout children={props.children}></Layout>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
