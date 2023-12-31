CREATE TABLE IF NOT EXISTS payment (
  uuid VARCHAR(40) NOT NULL DEFAULT (uuid()) PRIMARY KEY,
  payment_source VARCHAR(200) NULL DEFAULT NULL,
  payment_date DATE NULL DEFAULT NULL,
  channel_name VARCHAR(200) NULL DEFAULT NULL,
  account_number VARCHAR(20) NULL DEFAULT NULL,
  total_payment DECIMAL(30, 0) NULL DEFAULT 0,
  segment VARCHAR(200) NULL DEFAULT NULL,
  subsegment VARCHAR(200) NULL DEFAULT NULL,
  region VARCHAR(200) NULL DEFAULT NULL,
  account_id VARCHAR(30) NULL DEFAULT NULL,
  account_name VARCHAR(200) NULL DEFAULT NULL,
  project_id VARCHAR(30) NULL DEFAULT NULL,
  project_name VARCHAR(200) NULL DEFAULT NULL,
  am_id VARCHAR(50) NULL DEFAULT NULL,
  am_name VARCHAR(80) NULL DEFAULT NULL
);