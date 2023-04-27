// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: ' ',
    type: 'group',
    children: [
        {
            id: 'default',
            title: '프로그램 결과입력',
            type: 'item',
            url: '/dashboard/default',
            breadcrumbs: false
        }
    ]
};

export default dashboard;
