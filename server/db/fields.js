// fields.js

const dbTable= {

    basic_info : {
        table : "basic_info" , 
        key : "basic_info",
        fields: [ 'OPENDAY', 'AGENCY', 'OM', 'ENDDAY', 'DAYS_TO_STAY', 'RESIDENCE', 'PART_MAN_CNT', 'PART_WOMAN_CNT', 'LEAD_MAN_CNT', 'LEAD_WOMAN_CNT', 'SUPPORT', 'INCOME_TYPE', 'PART_TYPE', 'AGE_TYPE', 'BIZ_PURPOSE', 'PROGRAM_IN_OUT', 'SERVICE_TYPE', 'ROOM_PART_PEOPLE', 'ROOM_PART_ROOM', 'ROOM_LEAD_PEOPLE', 'ROOM_LEAD_ROOM', 'ROOM_ETC_PEOPLE', 'ROOM_ETC_ROOM', 'MEAL_TYPE', 'MEAL_PART', 'MEAL_LEAD', 'MEAL_ETC', 'PROGRAM_OPINION', 'SERVICE_OPINION', 'OVERALL_OPINION', 'PROGRESS_STATE', 'REG_ID', ],
    },
    basic_info_page : {
        table : "basic_info_page" , 
        key : "SEQ",
        fields: [ 'SUPPORT', 'INCOME_TYPE', 'PART_TYPE', 'BIZ_PURPOSE', 'PROGRAM_IN_OUT', 'SERVICE_TYPE', 'AGE_TYPE', ],
    },
    counsel_service : {
        table : 'counsel_service', 
        key : 'COUNSEL_SEQ',
        fields : ['OPENDAY', 'AGENCY', 'NAME', 'SEX', 'AGE', 'COUNSEL_CONTENTS', 'SESSION', 'RESIDENCE', 'JOB', 'PAST_STRESS_EXPERIENCE', 'EVAL_DATE', 'PV', 'SCORE1', 'SCORE2', 'SCORE3', 'SCORE4', 'SCORE5', 'SCORE6', 'SCORE7', 'SCORE8', 'SCORE9', 'SCORE10', 'SCORE11', 'SCORE12', 'SCORE13', 'SCORE14', 'SCORE15', 'SCORE16', 'SCORE17', 'SCORE18', 'SCORE19', 'SCORE20', 'SCORE21', 'SCORE22', 'SCORE23', 'SCORE24', 'SCORE25', 'SCORE26', 'SCORE27', 'SCORE28', 'SCORE29', 'SCORE30', 'SCORE31', 'SCORE32', 'SCORE33', 'SCORE34', 'SCORE35', 'SCORE36', 'SCORE37', 'SCORE38', 'SCORE39', 'SCORE40', 'SCORE41', 'SCORE42', 'SCORE43', 'SCORE44', 'SCORE45', 'SCORE46', 'SCORE47', 'SCORE48', 'SCORE49', 'SCORE50', 'SCORE51', 'SCORE52', 'SCORE53', 'SCORE54', 'SCORE55', 'SCORE56', 'SCORE57', 'SCORE58', 'SCORE59', 'SCORE60', 'SCORE61', 'SCORE62']
    },
    expense : {
        table : 'expense', 
        key : 'EXPENSE_SEQ',
        fields : [ 'EXPENSE_TYPE', 'EXPENSE_PRICE', 'EXPENSE_DETAIL', 'EXPENSE_NOTE', 'BASIC_INFO_SEQ' ]
    },
    expense_info : {
        table : 'expense_info', 
        key : 'EXPENSE_ID',
        fields : [ 'OPENDAY', 'AGENCY', 'LEAD_BUDGET_INVITE', 'LEAD_BUDGET_TRANSPORT', 'LEAD_BUDGET_MEAL', 'LEAD_EXECUTE_INVITE', 'LEAD_EXECUTE_TRANSPORT', 'LEAD_EXECUTE_MEAL', 'LEAD_DETAIL_INVITE', 'LEAD_DETAIL_TRANSPORT', 'LEAD_DETAIL_MEAL', 'PART_BUDGET_STAY', 'PART_BUDGET_MEAL', 'PART_BUDGET_MATERIAL', 'PART_EXECUTE_STAY', 'PART_EXECUTE_MEAL', 'PART_EXECUTE_MATERIAL', 'PART_DETAIL_STAY', 'PART_DETAIL_MEAL', 'PART_DETAIL_MATERIAL', 'SUB_BUDGET', 'SUB_EXECUTE', 'SUB_DETAIL', ]
    },
    healing_service : {
        table : 'healing_service', 
        key : 'HEALING_SEQ',
        fields : [ 'OPENDAY', 'AGENCY', 'NAME', 'SEX', 'AGE', 'RESIDENCE', 'JOB', 'PTCPROGRAM', 'PAST_STRESS_EXPERIENCE', 'EVAL_DATE', 'PV', 'SCORE1', 'SCORE2', 'SCORE3', 'SCORE4', 'SCORE5', 'SCORE6', 'SCORE7', 'SCORE8', 'SCORE9', 'SCORE10', 'SCORE11', 'SCORE12', 'SCORE13', 'SCORE14', 'SCORE15', 'SCORE16', 'SCORE17', 'SCORE18', 'SCORE19', 'SCORE20', 'SCORE21', 'SCORE22', ]
    },
    history : {
        table : 'history', 
        key : 'SEQ',
        fields : [ 'REG_ID', 'DATE', 'DESCRIPTION' ]
    },
    hrv_service : {
        table : 'hrv_service', 
        key : 'HRV_SEQ',
        fields : [ 'DATE', 'AGENCY', 'PV', 'NAME', 'AGE', 'SEX', 'EQUIPMENT', 'ID', 'JUMIN', 'NUM1', 'NUM2', 'NUM3', 'NUM4', 'NUM5', 'NUM6', 'NUM7', 'NUM8' ]
    },
    income : {
        table : 'income', 
        key : 'INCOME_SEQ',
        fields : [ 'INCOME_TYPE', 'INCOME_PRICE', 'INCOME_DETAIL', 'INCOME_NOTE', 'BASIC_INFO_SEQ' ]
    },
    income_info : {
        table : 'income_info', 
        key : 'INCOME_ID',
        fields : [ 'OPENDAY', 'AGENCY', 'PROGRAM_INCOME', 'PROGRAM_DETAIL', 'STAY_INCOME', 'STAY_DETAIL', 'MEAL_INCOME', 'MEAL_DETAIL', 'RENTAL_INCOME', 'RENTAL_DETAIL', 'DISCOUNT', 'NOTE' ]
    },
    prevent_service : {
        table : 'prevent_service', 
        key : 'PREVENT_SEQ',
        fields : [ 'OPENDAY', 'AGENCY', 'NAME', 'SEX', 'AGE', 'RESIDENCE', 'JOB', 'PTCPROGRAM', 'PAST_STRESS_EXPERIENCE', 'EVAL_DATE', 'PV', 'SCORE1', 'SCORE2', 'SCORE3', 'SCORE4', 'SCORE5', 'SCORE6', 'SCORE7', 'SCORE8', 'SCORE9', 'SCORE10', 'SCORE11', 'SCORE12', 'SCORE13', 'SCORE14', 'SCORE15', 'SCORE16', 'SCORE17', 'SCORE18', 'SCORE19', 'SCORE20', ]
    },
    program_info : {
        table : 'program_info', 
        key : 'PROGRAM_SEQ',
        fields : [ 'OPENDAY', 'AGENCY', 'PROGRAMNAME', 'BUNYA', 'TEACHER', 'IN_TUTOR', 'OUT_TUTOR' ]
    },
    program_satisfaction : {
        table : "program_satisfaction" , 
        key : "PROGRAM_SEQ",
        fields: [ 'OPENDAY', 'AGENCY', 'EVAL_DATE', 'PTCPROGRAM', 'SEX', 'AGE', 'RESIDENCE', 'JOB', 'PROGRAM_NAME', 'TEACHER', 'PLACE', 'SCORE1', 'SCORE2', 'SCORE3', 'SCORE4', 'SCORE5', 'SCORE6', 'SCORE7', 'SCORE8', 'SCORE9', 'ETC_OPINION', 'TYPE', 'BUNYA' ],
    },
    service_env_satisfaction : {
        table : "service_env_satisfaction" , 
        key : "SERVICE_SEQ",
        fields: [ 'OPENDAY', 'SEX', 'AGE', 'RESIDENCE', 'JOB', 'PTCPROGRAM', 'AGENCY', 'EVAL_DATE', 'SCORE1', 'SCORE2', 'SCORE3', 'SCORE4', 'SCORE5', 'SCORE6', 'SCORE7', 'SCORE8', 'SCORE9', 'SCORE10', 'FACILITY_OPINION', 'SCORE11', 'SCORE12', 'SCORE13', 'SCORE14', 'SCORE15', 'SCORE16', 'OPERATION_OPINION', 'SCORE17', 'SCORE18', ],
    },
    user_info : {
        table : "user_info" , 
        key : "user_id",
        fields: [ 'user_name', 'user_pwd', 'value', ],
    },
    vibra_service : {
        table : "vibra_service" , 
        key : "VIBRA_SEQ",
        fields: [ 'DATE', 'AGENCY', 'PV', 'NAME', 'AGE', 'SEX', 'EQUIPMENT', 'ID', 'JUMIN', 'NUM1', 'NUM2', 'NUM3', 'NUM4', 'NUM5', 'NUM6', 'NUM7', 'NUM8', 'NUM9', 'NUM10'],
    },
}

module.exports = dbTable;