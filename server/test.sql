SELECT 
    COUNT(case when AGE_TYPE ="아동" then 1 end ) as count_kidboy,
    COUNT(case when AGE_TYPE ="청소년" then 1 end ) as count_boy,
    COUNT(case when AGE_TYPE ="성인" then 1 end ) as count_adult,
    COUNT(case when AGE_TYPE ="노인" then 1 end ) as count_old,
    IFNULL(SUM(case when AGE_TYPE ="아동" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_kidboy,
    IFNULL(SUM(case when AGE_TYPE ="청소년" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_boy,
    IFNULL(SUM(case when AGE_TYPE ="성인" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_adult,
    IFNULL(SUM(case when AGE_TYPE ="노인" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_old,
    COUNT(case when PART_TYPE ="장애인" then 1 end ) as count_handicap,
    COUNT(case when PART_TYPE ="저소득" then 1 end ) as count_lowincome,
    COUNT(case when PART_TYPE ="가족" then 1 end ) as count_family,
    COUNT(case when PART_TYPE ="교직원" then 1 end ) as count_teacher,
    COUNT(case when PART_TYPE ="중독" then 1 end ) as count_addict,
    COUNT(case when PART_TYPE ="기타" then 1 end ) as count_etc,
    IFNULL(SUM(case when PART_TYPE ="장애인" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_handicap,
    IFNULL(SUM(case when PART_TYPE ="저소득" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_lowincome,
    IFNULL(SUM(case when PART_TYPE ="가족" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_family,
    IFNULL(SUM(case when PART_TYPE ="교직원" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_teacher,
    IFNULL(SUM(case when PART_TYPE ="중독" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_addict,
    IFNULL(SUM(case when PART_TYPE ="기타" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_etc,
    COUNT(case when INCOME_TYPE ="기타" then 1 end ) as count_income_etc,
    COUNT(case when INCOME_TYPE ="녹색자금" then 1 end ) as count_income_green,
    COUNT(case when INCOME_TYPE ="산림복지바우처" then 1 end ) as count_income_voucher,
    IFNULL(SUM(case when INCOME_TYPE ="기타" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_income_etc,
    IFNULL(SUM(case when INCOME_TYPE ="녹색자금" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_income_green,
    IFNULL(SUM(case when INCOME_TYPE ="산림복지바우처" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_income_voucher,
    COUNT(case when BIZ_PURPOSE ="수익사업" then 1 end ) as count_benefit,
    COUNT(case when BIZ_PURPOSE ="사회공헌" then 1 end ) as count_society,
    IFNULL(SUM(case when BIZ_PURPOSE ="수익사업" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_benefit,
    IFNULL(SUM(case when BIZ_PURPOSE ="사회공헌" then PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT else 0 end),0) as part_society
FROM BASIC_INFO
WHERE PROGRESS_STATE ="E"



SELECT 
    AGE_TYPE as category_type,
    COUNT(*) as count,
    IFNULL(SUM(PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT),0) as sum
FROM BASIC_INFO
WHERE PROGRESS_STATE ="E"
GROUP BY AGE_TYPE

UNION ALL

SELECT 
    PART_TYPE as category_type,
    COUNT(*) as count,
    IFNULL(SUM(PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT),0) as sum
FROM BASIC_INFO
WHERE PROGRESS_STATE ="E"
GROUP BY PART_TYPE

UNION ALL

SELECT 
    INCOME_TYPE as category_type,
    COUNT(*) as count,
    IFNULL(SUM(PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT),0) as sum
FROM BASIC_INFO
WHERE PROGRESS_STATE ="E"
GROUP BY INCOME_TYPE

UNION ALL

SELECT 
    BIZ_PURPOSE as category_type,
    COUNT(*) as count,
    IFNULL(SUM(PART_MAN_CNT+PART_WOMAN_CNT+LEAD_MAN_CNT+LEAD_WOMAN_CNT),0) as sum
FROM BASIC_INFO
WHERE PROGRESS_STATE ="E"
GROUP BY BIZ_PURPOSE;
