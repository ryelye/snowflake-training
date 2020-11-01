--  Performance Monitoring

-- Checking the performance of queries (here checking Stored Procedures)
SELECT query_text,
      start_time,
      end_time,
      total_elapsed_time,
      compilation_time,
      execution_time,
      execution_status,
      error_code,
      error_message
FROM   Table(information_schema.Query_history_by_warehouse('OLIVER_WH')) WHERE  query_text ilike 'call snapshot%';

-- Performance of COPY INTOs. Note that VALIDATION_MODE copy into queries are stored as query_type = 'SELECT'
SELECT query_text,
      query_type,
      start_time,
      end_time,
      total_elapsed_time,
      compilation_time,
      execution_time,
      execution_status,
      bytes_written,
      rows_produced,
      rows_inserted,
      error_code,
      error_message
FROM   Table(information_schema.Query_history_by_warehouse('OLIVER_WH')) WHERE  query_type = 'COPY';
