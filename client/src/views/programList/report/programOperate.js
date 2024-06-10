import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getState } from 'store/reducers/programListReducer';
import { useSelector } from 'react-redux';

const headerList = [
  '산림교육',
  '예방교육',
  '산림치유',
  '에너제틱',
  '릴렉싱',
  '아트',
  '쿠킹',
  '이벤트',
];

// 프로그램 운영
const ProgramOperate = () => {
  const {
    PROGRAM_IN_OUT,
    SERVICE_TYPE,
    ROOM_PART_PEOPLE,
    ROOM_PART_ROOM,
    MEAL_TYPE,
    MEAL_PART,

    ROOM_LEAD_PEOPLE,
    ROOM_LEAD_ROOM,
    MEAL_LEAD,

    ROOM_ETC_PEOPLE,
    ROOM_ETC_ROOM,
    MEAL_ETC,
  } = useSelector((s) => getState(s).detailInfo);

  const programList = React.useMemo(() => {
    const values = PROGRAM_IN_OUT.split(',');
    const numRows = values.length / 5;
    const result = Array.from({ length: numRows }, (_, i) => {
      const [programName, type, teacherName, inTeacher, outTeacher] = values.slice(
        i * 5,
        i * 5 + 5,
      );
      return { programName, type, teacherName, inTeacher, outTeacher };
    });

    const returnVal = headerList.map((i) => {
      const pr = result.filter((item) => item.type === i);
      return {
        type: i,
        programCnt: pr.length,
        inTeacher: pr.reduce((acc, obj) => acc + +obj.inTeacher, 0),
        outTeacher: pr.reduce((acc, obj) => acc + +obj.outTeacher, 0),
      };
    });

    return returnVal;
  }, [PROGRAM_IN_OUT]);

  return (
    <>
      <TableContainer style={{ marginTop: '20px' }}>
        <h3 className="tableTitle">프로그램운영</h3>
        <Table className="report custom-table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header" align="center">
                서비스유형
              </TableCell>
              <TableCell className="table-header" align="center">
                구분
              </TableCell>
              <TableCell className="table-header" align="center">
                산림교육
              </TableCell>
              <TableCell className="table-header" align="center">
                예방교육
              </TableCell>
              <TableCell className="table-header" align="center">
                산림치유
              </TableCell>
              <TableCell className="table-header" align="center">
                에너제틱
              </TableCell>
              <TableCell className="table-header" align="center">
                릴렉싱
              </TableCell>
              <TableCell className="table-header" align="center">
                아트
              </TableCell>
              <TableCell className="table-header" align="center">
                쿠킹
              </TableCell>
              <TableCell className="table-header" align="center">
                이벤트
              </TableCell>
              <TableCell className="table-header" align="center">
                계
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 프로그램 운영 */}
            <TableRow>
              <TableCell rowSpan={3}>{SERVICE_TYPE}</TableCell>
              <TableCell>프로그램(개)</TableCell>
              {headerList.map((i, key) => (
                <TableCell key={key}>
                  {programList.find((item) => item.type === i).programCnt || 0}
                </TableCell>
              ))}
              <TableCell>{programList.reduce((acc, obj) => acc + +obj.programCnt, 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>내부강사(명)</TableCell>
              {headerList.map((i, key) => (
                <TableCell key={key}>
                  {programList.find((item) => item.type === i).inTeacher || 0}
                </TableCell>
              ))}
              <TableCell>{programList.reduce((acc, obj) => acc + +obj.inTeacher, 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>외부강사(명)</TableCell>
              {headerList.map((i, key) => (
                <TableCell key={key}>
                  {programList.find((item) => item.type === i).outTeacher || 0}
                </TableCell>
              ))}
              <TableCell>{programList.reduce((acc, obj) => acc + +obj.outTeacher, 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={5}>기타사항</TableCell>
              <TableCell className="table-header" align="center">
                분류
              </TableCell>
              <TableCell className="table-header" align="center" colSpan={3}>
                인원(명)
              </TableCell>
              <TableCell className="table-header" align="center" colSpan={3}>
                객실(실)
              </TableCell>
              <TableCell className="table-header" align="center" colSpan={3}>
                식사
              </TableCell>
              {/* <TableCell className="table-header" align="center" colSpan={3}>계</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell>참여자</TableCell>
              <TableCell colSpan={3}>{ROOM_PART_PEOPLE}</TableCell>
              <TableCell colSpan={3}>{ROOM_PART_ROOM}</TableCell>
              <TableCell colSpan={3}>{MEAL_TYPE * MEAL_PART}</TableCell>
              {/* <TableCell colSpan={3}>{+ROOM_PART_PEOPLE + +ROOM_PART_ROOM + (MEAL_TYPE * MEAL_PART)}</TableCell>     */}
            </TableRow>
            <TableRow>
              <TableCell>인솔자</TableCell>
              <TableCell colSpan={3}>{ROOM_LEAD_PEOPLE}</TableCell>
              <TableCell colSpan={3}>{ROOM_LEAD_ROOM}</TableCell>
              <TableCell colSpan={3}>{MEAL_TYPE * MEAL_LEAD}</TableCell>
              {/* <TableCell colSpan={3}>{+ROOM_LEAD_PEOPLE + +ROOM_LEAD_ROOM + (MEAL_TYPE * MEAL_LEAD)}</TableCell>     */}
            </TableRow>
            <TableRow>
              <TableCell>기타</TableCell>
              <TableCell colSpan={3}>{ROOM_ETC_PEOPLE}</TableCell>
              <TableCell colSpan={3}>{ROOM_ETC_ROOM}</TableCell>
              <TableCell colSpan={3}>{MEAL_TYPE * MEAL_ETC}</TableCell>
              {/* <TableCell colSpan={3}>{+ROOM_ETC_PEOPLE + +ROOM_ETC_ROOM + (MEAL_TYPE * MEAL_ETC)}</TableCell>     */}
            </TableRow>
            <TableRow>
              <TableCell>계</TableCell>
              <TableCell colSpan={3}>
                {+ROOM_PART_PEOPLE + +ROOM_LEAD_PEOPLE + +ROOM_ETC_PEOPLE}
              </TableCell>
              <TableCell colSpan={3}>
                {+ROOM_PART_ROOM + +ROOM_LEAD_ROOM + +ROOM_ETC_ROOM}
              </TableCell>
              <TableCell colSpan={3}>{MEAL_TYPE * (+MEAL_PART + +MEAL_LEAD + +MEAL_ETC)}</TableCell>
              {/* <TableCell colSpan={3}>{+ROOM_PART_PEOPLE + +ROOM_LEAD_PEOPLE + +ROOM_ETC_PEOPLE}</TableCell>
                        <TableCell colSpan={3}>{+ROOM_PART_ROOM + +ROOM_LEAD_ROOM + +ROOM_ETC_ROOM}</TableCell>
                        <TableCell colSpan={3}>{MEAL_TYPE * (+MEAL_PART + +MEAL_LEAD  + +MEAL_ETC)}</TableCell>     */}
              {/* <TableCell colSpan={3}>{+ROOM_PART_PEOPLE + +ROOM_LEAD_PEOPLE + +ROOM_ETC_PEOPLE + +ROOM_PART_ROOM + +ROOM_LEAD_ROOM + +ROOM_ETC_ROOM + (MEAL_TYPE * (+MEAL_PART + +MEAL_LEAD  + +MEAL_ETC))}</TableCell>     */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ProgramOperate;
