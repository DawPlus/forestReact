UPDATE foresthealing.basic_info
SET AGE_TYPE = "아동청소년"
WHERE AGE_TYPE ='아동' or AGE_TYPE = '청소년'


ALTER TABLE foresthealing.basic_info ADD ORG_NATURE varchar(100) NULL COMMENT '단체성격';
ALTER TABLE foresthealing.basic_info ADD PART_FORM varchar(100) NULL COMMENT '참여형태';


CREATE TABLE foresthealing.program_mng (
	program_seq BIGINT auto_increment NULL,
	name varchar(500) NULL,
	bunya varchar(100) NULL,
	teacher varchar(100) NULL,
	create_dtm varchar(100) NULL,
	create_user varchar(100) NULL,
	update_dtm varchar(100) NULL,
	update_user varchar(100) NULL,
	CONSTRAINT program_mng_pk PRIMARY KEY (program_seq)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb3
COLLATE=utf8mb3_bin;
