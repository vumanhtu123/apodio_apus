import { ALERT_TYPE } from './config/ENV';
import { Dialog, IConfigDialog, IConfigToast,IConfigLoading, Root } from './containers';
import { Toast, Loading } from './containers';

export { Dialog, Toast,Loading, Root };
export { Dialog as AlertNotificationDialog, Toast as AlertNotificationToast, Loading as AlertNotificationLoading, Root as AlertNotificationRoot, ALERT_TYPE, IConfigDialog, IConfigToast, IConfigLoading };

export default { Dialog, Toast, Root, ALERT_TYPE };
