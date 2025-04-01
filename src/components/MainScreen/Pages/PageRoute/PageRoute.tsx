import { WithErrorBoundary } from "../../../../utils/ErrorBoundary/ErrorBoundary";
import MonitoringPage from "../Monitoring/MonitoringPage";

import ZonesPage from "../Zones/ZonesPage";
import GeneralSettingsPage from "../GeneralSettings/GeneralSettingsPage";
import ParametersPage from "../Parameters/ParametersPage";
import UserCodesPage from "../UserCodes/UserCodesPage";

const GeneralSettingsPageWithErrorBoundary = WithErrorBoundary(GeneralSettingsPage);
const MonitoringPageWithErrorBoundary = WithErrorBoundary(MonitoringPage);
const ZonesPageWithErrorBoundary = WithErrorBoundary(ZonesPage);
const ParametersPageWithErrorBoundary = WithErrorBoundary(ParametersPage);
const UserCodesPageWithErrorBoundary = WithErrorBoundary(UserCodesPage);

const PageRoute = ({ route }: { route: string }) => {
  switch (route) {
    case "Общие":
      return <GeneralSettingsPageWithErrorBoundary />;
    case "Устройства":
      return <MonitoringPageWithErrorBoundary />;
    case "Зоны":
      return <ZonesPageWithErrorBoundary />;
    case "Параметры связи":
      return <ParametersPageWithErrorBoundary />;
    case "Коды пользователя":
      return <UserCodesPageWithErrorBoundary />;
    default:
      return <MonitoringPageWithErrorBoundary />;
  }
};
export default PageRoute;
