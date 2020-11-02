/*
 https://community.snowflake.com/s/article/ERROR-SQL-compilation-error-Sequence-used-as-a-default-value-in-table-table-name-column-column-name-was-not-found-or-could-not-be-accessed
Take care when dropping sequences. If the dropped sequence is referenced in a column, it might cause an issue later down the track.
 */

 -- See sequences:
 select
    table_catalog,
    table_schema,
    table_name,
    column_name,
    column_default
from
    information_schema.columns
where
    column_default like '%<sequence-name>%';

/* Remove or change default sequence on tables affected: */

-- Remove the default value
alter table <table-name> modify column <column-name> drop default;

-- Or, change the referring sequence to new one
create or replace sequence <new-sequence-name>
alter table <table-name> modify column <column-name> default <new-sequence-name>.nextval;