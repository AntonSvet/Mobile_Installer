import { WithErrorBoundary } from "../../../../utils/ErrorBoundary/ErrorBoundary";
import MonitoringPage from "../Monitoring/MonitoringPage";

import ZonesPage from "../Zones/ZonesPage";
import GeneralSettingsPage from "../GeneralSettings/GeneralSettingsPage";

import UserCodesPage from "../UserCodes/UserCodesPage";
import SMSnotificationPage from "../SMSnotification/SMSnotificationPage";
import ConnectionPage from "../Connection/ConnectionPage";

const GeneralSettingsPageWithErrorBoundary = WithErrorBoundary(GeneralSettingsPage);
const MonitoringPageWithErrorBoundary = WithErrorBoundary(MonitoringPage);
const ZonesPageWithErrorBoundary = WithErrorBoundary(ZonesPage);
const ConnectionPageWithErrorBoundary = WithErrorBoundary(ConnectionPage);
const UserCodesPageWithErrorBoundary = WithErrorBoundary(UserCodesPage);
const SMSnotificationPageWithErrorBoundary = WithErrorBoundary(SMSnotificationPage);

const PageRoute = ({ route }: { route: string }) => {
  switch (route) {
    case "Общие":
      return <GeneralSettingsPageWithErrorBoundary />;
    case "Устройства":
      return <MonitoringPageWithErrorBoundary />;
    case "Зоны":
      return <ZonesPageWithErrorBoundary />;
    case "Коды пользователя":
      return <UserCodesPageWithErrorBoundary />;
    case "SMS оповещение":
      return <SMSnotificationPageWithErrorBoundary />;
    case "Подключение к ПЦО":
      return <ConnectionPageWithErrorBoundary />;

    default:
      return <MonitoringPageWithErrorBoundary />;
  }
};
export default PageRoute;
