DROP TABLE IF EXISTS account;

CREATE TABLE account (
  uuid VARCHAR(40) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  segment VARCHAR(200) NULL DEFAULT NULL,
  subsegment VARCHAR(200) NULL DEFAULT NULL,
  region VARCHAR(200) NULL DEFAULT NULL,
  account_id VARCHAR(30) NULL DEFAULT NULL,
  account_name VARCHAR(200) NULL DEFAULT NULL,
  flag_synergi VARCHAR(10) NULL DEFAULT NULL,
  flag_si VARCHAR(255) NULL DEFAULT NULL,
  flag_m2m VARCHAR(80) NULL DEFAULT NULL,
  crm_name VARCHAR(200) NULL DEFAULT NULL,
  crm_account_name VARCHAR(200) NULL DEFAULT NULL,
  rt VARCHAR(5) NULL DEFAULT NULL,
  ba_rt VARCHAR(5) NULL DEFAULT NULL,
  bill_cycle VARCHAR(5) NULL DEFAULT NULL,
  bill_cycle_crm VARCHAR(5) NULL DEFAULT NULL,
  total_fa DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_1 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_2 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_3 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_4 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_5 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_6 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_7 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_8 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_9 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_10 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_11 DECIMAL(30, 0) NULL DEFAULT 0,
  bill_amount_12 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_1 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_2 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_3 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_4 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_5 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_6 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_7 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_8 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_9 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_10 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_11 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_12 DECIMAL(30, 0) NULL DEFAULT 0,
  bucket_13 DECIMAL(30, 0) NULL DEFAULT 0,
  total_bucket DECIMAL(30, 0) NULL DEFAULT 0,
  bill_before_due DECIMAL(30, 0) NULL DEFAULT 0,
  os_before_due DECIMAL(30, 0) NULL DEFAULT 0,
  bill_due_date DECIMAL(30, 0) NULL DEFAULT 0,
  os_due_date DECIMAL(30, 0) NULL DEFAULT 0,
  bill_over_due DECIMAL(30, 0) NULL DEFAULT 0,
  os_over_due DECIMAL(30, 0) NULL DEFAULT 0,
  bill_next_due DECIMAL(30, 0) NULL DEFAULT 0,
  os_next_due DECIMAL(30, 0) NULL DEFAULT 0,
  total_billing DECIMAL(30, 0) NULL DEFAULT 0,
  event_date DATE NULL DEFAULT (CURRENT_DATE)
 )