import { useProperties } from "../../hooks/useProperties";
import { Loading } from "../Loading";
import { CollapsibleTable } from "./CollapsibleTable";

const ListProperties = () => {
  const { isLoading, data } = useProperties();

  if (isLoading) {
    return <Loading height="300px" />;
  }

  return <CollapsibleTable properties={data?.data} />;
};

export { ListProperties };
