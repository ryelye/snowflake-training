create managed account reader_acct_test
    admin_name = reader1, admin_password='Reader123', type=reader;

/*
login URL: 
https://qd40804.australia-east.azure.snowflakecomputing.com

account name:
QD40804
*/

create database ac_poc_db_shared clone ac_poc_db;
create share share1;

GRANT USAGE ON DATABASE ac_poc_db_shared TO SHARE share1;
GRANT USAGE ON SCHEMA ac_poc_db_shared.public TO SHARE share1;
GRANT SELECT ON TABLE ac_poc_db_shared.public.playstore TO SHARE share1;
ALTER SHARE share1 ADD ACCOUNTS=QD40804;

/* On the Reader Account side */

USE ROLE ACCOUNTADMIN;
create database ac_poc_db_shared from share pm63139.share1;
use database ac_poc_db_shared;
show tables;
select * from playstore limit 10;

select * from ac_poc_db_shared.public.playstore where app = 'test';