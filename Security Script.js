// Snapshot Users
CREATE OR REPLACE PROCEDURE SNAPSHOT_USERS()
RETURNS VARCHAR
LANGUAGE JAVASCRIPT
COMMENT = "Captures the snapshot of users and inserts the records into dbusers"
EXECUTE AS CALLER
AS
$$
var result = 'SUCCESS';
try {
    snowflake.execute({
        sqlText: 'TRUNCATE TABLE DBUSERS;'
    });
    snowflake.execute({
        sqlText: 'show users;'
    });
    var dbusers_tbl_sql = `insert into dbusers select *, CURRENT_TIMESTAMP() from table(result_scan(last_query_id()));`;
    snowflake.execute({
        sqlText: dbusers_tbl_sql
    });
} catch (err) {
    result = 'FAILED: Code: '+err.code + '\n State: '+err.state;
    result += '\n Message: '+err.message;
    result += '\nStack Trace: \n' + err.stackTraceTxt;
}
return result;
$$;

// Snapshot Roles
CREATE OR REPLACE PROCEDURE SNAPSHOT_ROLES()
RETURNS VARCHAR
LANGUAGE JAVASCRIPT
COMMENT = "Captures the snapshot of roles and inserts the records into dbroles"
EXECUTE AS CALLER
AS

$$
var result = 'SUCCESS';

try {
    snowflake.execute({
        sqlText: 'TRUNCATE TABLE DBROLES;'
    });
    snowflake.execute({
        sqlText: 'SHOW ROLES;'
    });
    snowflake.execute({
        sqlText: `INSERT INTO DBROLES SELECT *, CURRENT_TIMESTAMP() FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()));`
    });
} catch (err) {
    result = 'FAILED: Code: ' + err.code + '\n State: ' + err.state;
    result += '\n Message: ' + err.message;
    result += '\nStack Trace: \n' + err.stackTraceTxt;
}

return result;
$$;

// Snapshot Grants
CREATE OR REPLACE PROCEDURE SNAPSHOT_GRANTS() 
RETURNS VARCHAR
LANGUAGE JAVASCRIPT
COMMENT = "Captures the snapshot of grants and inserts the records into dbgrants" 
EXECUTE AS CALLER
AS
$$

var result = 'SUCCESS';

try {
      var obj_rs = snowflake.execute({
          sqlText: `SELECT NAME FROM DBROLES;`
      });
      while (obj_rs.next()) {
          snowflake.execute({
              sqlText: 'show grants to role "' + obj_rs.getColumnValue(1) + '";'
          });
          snowflake.execute({
              sqlText: 'insert into dbgrants select *, CURRENT_TIMESTAMP() from table(result_scan(last_query_id()));'
          });
          snowflake.execute({
              sqlText: 'show grants on role "' + obj_rs.getColumnValue(1) + '";'
          });
          snowflake.execute({
              sqlText: `insert into dbgrants select *, CURRENT_TIMESTAMP() from table(result_scan(last_query_id()));`
          });
      }
} catch(err) {
    result = 'FAILED: Code: ' + err.code + '\n State: ' + err.state;
    result += '\n Message: ' + err.message;
    result += '\nStack Trace: \n' + err.stackTraceTxt;
}
return result;
$$;