/*
MYSQL2
-------

mysql 2 params filling capability:
-----
- it will fill in things such as
  "id as ?"
  "where id=?"

  but it will not work when you do string replacement like

  "where ?" <= "id=20 and name=x"

  and it will not work with

  Select ? as ? <= ['id', 'testId']

  since it will not use the right column name in the string replacement


mjs
-----
- if the npm needs an import to be imported (ex. sql-template-tag) you can make the file an mjs file and run it differently

> node  --experimental-modules  mysql2.mjs
*/