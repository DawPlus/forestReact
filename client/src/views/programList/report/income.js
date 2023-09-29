import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getState } from "store/reducers/programListReducer";
import { useSelector } from "react-redux";
import { decodeSpecialCharacters } from "utils/utils";


// 수입금액 
const IncomeContainer = ()=>{
    
    
    const { income}  = useSelector(s=> getState(s).inExpense);


    // 할인율 제외목록
    const incomeList = income.filter(i=> i.INCOME_TYPE !=="할인율").sort((a, b) => a.INCOME_TYPE.localeCompare(b.INCOME_TYPE));;
    // 할인율
    const disCount  = income.find(i=> i.INCOME_TYPE === "할인율") || {}
    console.log(disCount)
    // 계
    const totalIncomeList = incomeList.reduce( (acc, cur)=>{
        acc += +cur.INCOME_PRICE
        return acc;
    }, 0)
    

    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
        // 문자열을 숫자로 형변환 (parseFloat를 사용하여 소수로 변환)
        originalPrice = parseFloat(originalPrice);
        discountPercentage = parseFloat(discountPercentage);
      
        // 숫자가 아닌 경우, 또는 할인율이 100 이상인 경우 유효하지 않은 값으로 간주하여 오류 처리
        if (isNaN(originalPrice) || isNaN(discountPercentage) || discountPercentage >= 100) {
          return "할인율 계산중 오류가 발생했습니다";
        }
      
        // 할인율이 10이면 0.1로 변환
        if (discountPercentage <= 100) {
          discountPercentage /= 100;
        }
      
        const finalPrice = originalPrice - (originalPrice * discountPercentage);
        return finalPrice;
      }


      function formatNumberWithCommas(value) {
        const numberValue = parseInt(value, 10); // 형 변환 시도
        if (!isNaN(numberValue)) { // 형 변환이 성공한 경우
          return numberValue.toLocaleString();
        }
        return value; // 형 변환이 실패한 경우 그대로 반환
      }
      

    return <>
        <TableContainer style={{marginTop : "20px"}}>
        <h3 className="tableTitle">수입금액</h3>
            <Table className="report custom-table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header" align="center" style={{ width: "15%" }}>수입항목</TableCell>
                        <TableCell className="table-header" align="center" style={{ width: "15%" }}>수입금액</TableCell>
                        <TableCell className="table-header" align="center" style={{ width: "40%" }}>세부내역</TableCell>
                        <TableCell className="table-header" align="center" style={{ width: "15%" }}>비고</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    {incomeList.map((i, idx)=> 
                        <TableRow key={idx}>
                            <TableCell>{`${i.INCOME_TYPE}(천원)`}</TableCell>
                            <TableCell>{formatNumberWithCommas(i.INCOME_PRICE)}</TableCell>
                            <TableCell>{decodeSpecialCharacters(i.INCOME_DETAIL)}</TableCell>
                            <TableCell>{decodeSpecialCharacters(i.INCOME_NOTE)}</TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell>계(천원)</TableCell>
                        <TableCell>{formatNumberWithCommas(totalIncomeList)}</TableCell>
                        <TableCell>{`${disCount.INCOME_PRICE} %`} </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="table-header">최종금액(천원)</TableCell>
                        <TableCell className="table-header"colSpan={3}>{calculateDiscountedPrice(totalIncomeList, disCount.INCOME_PRICE)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default IncomeContainer;