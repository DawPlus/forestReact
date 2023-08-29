// assets
import { IconFloatLeft, IconReportAnalytics, IconUserCircle, IconApiApp, IconAperture} from '@tabler/icons';
// assets
import { IconKey } from '@tabler/icons';


// ==============================|| MENU ITEMS ||============================== //
const icons = {
    IconKey
};

const menuItems = {
    items: [
        {
            id: 'program',
            title : "하이힐링원 통계서비스",
            type: 'group',
            children: [
                {
                    id: 'insertOperateResult',
                    title: '프로그램 결과입력',
                    type: 'item',
                    url: '/insertOperateResult',
                    icon: IconFloatLeft,
                },
                {
                    id: 'programList',
                    title: '운영결과 보고검색',
                    type: 'item',
                    url: '/programList',
                    icon: IconReportAnalytics,
                },
                {
                    id: 'authentication',
                    title: '운영통계검색',
                    type: 'collapse',
                    icon: IconApiApp,
                    children: [
                        {
                            id: 'year',
                            title: '연/월통계',
                            type: 'item',
                            url: '/yearMonthResult',
                        },
                        {
                            id: 'program',
                            title: '프로그램통계',
                            type: 'item',
                            url: '/searchProgramResult',
                        }
                    ]
                },
                {
                    id: 'userTemp',
                    title: '프로그램참가자입력',
                    type: 'item',
                    icon: IconUserCircle,
                    url: '/userTemp',   
                },
                {
                    id: 'insert',
                    title: '만족도및 효과평가 입력',
                    type: 'item',
                    url: '/serviceInsertForm',
                    icon: IconFloatLeft,
                },
                {
                    id: 'programResult',
                    title: '만족도 및 효과평가결과검색',
                    type: 'collapse',
                    icon: IconAperture,
                    children: [
                        {
                            id: 'agencyList',
                            title: '단체별 만족도 및 효과평가',
                            type: 'item',
                            url: '/sae/agencyList',
                        },
                        {
                            id: 'test3',
                            title: '주제어별 만족도 및 효과평가',
                            type: 'item',
                            url: '/sae/searchResult',
                        }
                    ]
                },
                {
                    id: 'management',
                    title: '관리자모드',  // USER Value =3 권한임
                    type: 'collapse',
                    icon: icons.IconKey,
                    children: [
                        {
                            id: 'userList',
                            title: '직원계정관리',
                            type: 'item',
                            url: '/userList',
                        },
                        {
                            id: 'history',
                            title: '사용자이용기록',
                            type: 'item',
                            url: '/history',
                        },
                        {
                            id: 'code',
                            title: '운영결과항목수정',
                            type: 'item',
                            url: '/code',   
                        },
                        {
                            id: 'programMng',
                            title: '프로그램관리',
                            type: 'item',
                            url: '/programMng',   
                        },
                        {
                            id: 'teacherMng',
                            title: '강사관리',
                            type: 'item',
                            url: '/teacherMng',   
                        },
                        {
                            id: 'excelDown',
                            title: '엑셀데이터',
                            type: 'item',
                            url: '/excelDownload',   
                        },
                    ]
                },
                {
                    id: 'updateDelete',
                    title: '수정/삭제',
                    type: 'item',
                    url: '/updateDelete',
                    icon: IconFloatLeft,
                    
                },
            ]
        }]
};

export default menuItems;
