import { useProperties } from "../../hooks/useProperties";
import { CollapsibleTable } from "./CollapsibleTable";

const ListProperties = () => {
  const { isFetching, isLoading, data } = useProperties();

  if (isFetching || isLoading) {
    return <p>loading</p>;
  }

  return <CollapsibleTable properties={data?.data} />;
};

export { ListProperties };
