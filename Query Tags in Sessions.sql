-- Set a query tag for your session
ALTER SESSION SET query_tag = 'my_query_tag';

-- We can later query all the queries ran with this query tag
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY WHERE query_tag = 'my_query_tag';