import { useToolsPage } from "./hooks/use-tools-page";
import { ToolsUi } from "./tools.ui";

export const ToolsPage = () => {
  const data = useToolsPage();
  return <ToolsUi data={data} />;
};