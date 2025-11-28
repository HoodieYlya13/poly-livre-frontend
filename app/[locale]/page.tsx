import PageBuilder from '../components/UI/PageBuilder/PageBuilder';
import Home from '../components/Pages/Home/Home';

export default function HomePage() {
  return (
    <PageBuilder padding={false}>
      <Home />
    </PageBuilder>
  );
}