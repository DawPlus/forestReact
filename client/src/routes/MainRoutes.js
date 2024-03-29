import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
//const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
// ProGram
const InsertOperateResult = Loadable(lazy(() => import('views/program/insertOperateResult')));
const ProgramList = Loadable(lazy(() => import('views/programList')));

// Management

const Code = Loadable(lazy(() => import('views/management/code')));
const History = Loadable(lazy(() => import('views/management/history')));
const UserList = Loadable(lazy(() => import('views/management/userList')));
const TeacherMng = Loadable(lazy(() => import('views/management/teacherMng')));
const ProgramMng = Loadable(lazy(() => import('views/management/programMng')));
const UserTemp = Loadable(lazy(() => import('views/management/userTemp')));


// Program List 
const AgencyList = Loadable(lazy(() => import('views/programResult/agencyList')));
const SearchResult = Loadable(lazy(() => import('views/programResult/searchResult')));

const UpdateDelete = Loadable(lazy(() => import('views/common/updateDelete')));
const ServiceInsertForm = Loadable(lazy(() => import('views/serviceInsertForm')));
const YearMonthResult = Loadable(lazy(() => import('views/yearMonthResult')));
const SearchProgramResult = Loadable(lazy(() => import('views/searchProgramResult')));
const ExcelDownload = Loadable(lazy(() => import('views/excelDownload')));





// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = [{
    path: '/',
    element: <MainLayout />,
    children: [
        { path: '/', element: <InsertOperateResult /> },
        { path: '/main', element: <InsertOperateResult /> },
        { path: 'insertOperateResult', element : <InsertOperateResult/> },
        { path: 'programList', element : <ProgramList/> },
        {
            path: 'utils',
            children: [
                { path: 'util-typography', element: <UtilsTypography /> }
            ]
        },
        {
            path: 'utils',
            children: [
                { path: 'util-color', element: <UtilsColor /> }
            ]
        },
        {
            path: 'utils',
            children: [
                { path: 'util-shadow', element: <UtilsShadow /> }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                { path: 'material-icons', element: <UtilsMaterialIcons /> }
            ]
        },


        { path: 'userList', element: <UserList /> },
        { path: 'code', element: <Code /> },
        { path: 'history', element: <History /> },
        { path: 'teacherMng', element: <TeacherMng /> },
        { path: 'programMng', element: <ProgramMng /> },
        { path: 'userTemp', element: <UserTemp /> },
        {
            path: 'sae',
            children: [
                { path: 'agencyList', element: <AgencyList /> }, // 만족도및 효과평가 
                { path: 'searchResult', element: <SearchResult /> }, // 주제어별 만족도 및 효과평가 
            ]
        },


        // 수정 / 삭제 
        { path: 'updateDelete', element: <UpdateDelete /> },
        { path: 'serviceInsertForm', element: <ServiceInsertForm /> },
        // 운영통계
        { path: 'yearMonthResult', element: <YearMonthResult /> },
        // 주제어별 프로그램통계검색
        { path: 'searchProgramResult', element: <SearchProgramResult /> },
        { path: 'excelDownload', element: <ExcelDownload /> },
    ]
}];

export default MainRoutes;
