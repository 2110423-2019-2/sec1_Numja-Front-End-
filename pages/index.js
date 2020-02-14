import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => <>hello homie</>;

Index.getInitialProps = async function() {
  return [];
};

export default Index;
