// treasure trove of examples found at:
// https://docs.snowflake.com/en/sql-reference/stored-procedures-usage.html

// Generic Logging Stored Procedure:
// https://docs.snowflake.com/en/sql-reference/stored-procedures-usage.html#logging-an-error-version-2

// snowflake.createStatement.execute(sqlText: [text :1, :2, :3], binds: [1st val, 2nd val, 3rd val])
// snowflake.execute()

// Bind something to a SQL statement. This example writes a timestamp to a table

CREATE OR REPLACE PROCEDURE string_to_timestamp_ltz(TSV VARCHAR) 
RETURNS TIMESTAMP_LTZ 
LANGUAGE JAVASCRIPT 
AS 
$$ 

// Convert the input varchar to a TIMESTAMP_LTZ.
var sql_command = "SELECT '" + TSV + "'::TIMESTAMP_LTZ;"; 
var stmt = snowflake.createStatement({sqlText: sql_command});
var resultSet = stmt.execute();
resultSet.next();
var my_sfDate = resultSet.getColumnValue(1);

// bind (same as '%s %s' % ('name', date))
snowflake.execute({
    sqlText: `INSERT INTO table1 VALUES (:1, :2);`,
    binds: ['name', my_sfDate]
});

return my_sfDate;

$$;

// Basic Error Handling:
try {
    if (True) {
        throw "throw an error!";
    }
} catch (err) {
    result = 'FAILED: Code: '+err.code + '\n State: '+err.state;
    result += '\n Message: '+err.message;
    result += '\nStack Trace: \n' + err.stackTraceTxt;
}
return result;

// Output to array (make sure RETURN column is VARIANT, will result in array)

// Output to table: Output to JSON then LATERAL FLATTEN to table format

// logging:
// see https://docs.snowflake.com/en/sql-reference/stored-procedures-usage.html#logging-an-error-version-2