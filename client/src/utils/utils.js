// utils.js

export function generateMergeInfo(headerInfo) {
    let mergeInfo = [];
    let startCol = 0;
    let prevVal = null;

    // 첫 번째 row를 순회하며 같은 값이 연달아 있는 경우를 찾는다.
    for (let c = 0; c < headerInfo[0].length; c++) {
        if (headerInfo[0][c] !== prevVal) {
            if (c - startCol > 1) {
                mergeInfo.push({
                    s: { r: 0, c: startCol },
                    e: { r: 0, c: c - 1 }
                });
            }
            startCol = c;
            prevVal = headerInfo[0][c];
        }
    }

    // 마지막 그룹에 대한 병합 정보를 추가한다.
    if (headerInfo[0].length - startCol > 1) {
        mergeInfo.push({
            s: { r: 0, c: startCol },
            e: { r: 0, c: headerInfo[0].length - 1 }
        });
    }

    // 두 번째 row를 순회하며 비어 있는 경우를 찾는다.
    for (let c = 0; c < headerInfo[1].length; c++) {
        if (headerInfo[1][c] === '') {
            mergeInfo.push({
                s: { r: 0, c: c },
                e: { r: 1, c: c }
            });
        }
    }

    return mergeInfo;
}
