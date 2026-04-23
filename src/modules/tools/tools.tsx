import { useToolsPage } from "./hooks/use-tools-page";
import { ToolsUi } from "./tools.ui";

export function ToolsPage  ()  {
  const data = useToolsPage();
  return <ToolsUi data={data} />;
};