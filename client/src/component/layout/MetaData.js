import Helment from "react-helmet";
const MetaData = ({ title }) => {
  return (
    <Helment>
      <title>{title}</title>
    </Helment>
  );
};

export default MetaData;
