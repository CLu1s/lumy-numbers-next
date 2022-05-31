import Redirect from "../../components/Redirect";

const Index = () => {
  return <Redirect href="/app/home" />;
};
export async function getServerSideProps() {
  // Fetch data from external API
  const data = 1;
  // Pass data to the page via props
  return { props: { data } };
}
export default Index;
