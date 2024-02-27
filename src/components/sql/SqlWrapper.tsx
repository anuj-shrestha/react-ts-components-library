import React, { useState, useEffect } from "react";
import initSqlJs, { Database, QueryExecResult } from "sql.js";

export default function SqlWrapper() {
  const [db, setDb] = useState<Database | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../craco.config.js
    const connectToDb = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (filename) => `./node_modules/sql.js/dist/${filename}`,
        });
        setDb(new SQL.Database());
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    };
    connectToDb();
  }, []);

  if (error) return <pre>{error.toString()}</pre>;
  else if (!db) return <pre>Loading...</pre>;
  else return <SQLRepl db={db} />;
}

function SQLRepl({ db }: { db: Database }) {
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<QueryExecResult[]>([]);

  function exec(sql: string) {
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead
      setResults(db.exec(sql)); // an array of objects is returned
      setError(null);
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
      setError((err as Error).message);
      setResults([]);
    }
  }

  return (
    <div className="App">
      <h1>React SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder="Enter some SQL. No inspiration ? Try “select sqlite_version()”"
      ></textarea>

      <pre className="error">{(error || "").toString()}</pre>

      <pre>
        {
          // results contains one object per select statement in the query
          results.map(({ columns, values }, i) => (
            <ResultsTable key={i} columns={columns} values={values} />
          ))
        }
      </pre>
    </div>
  );
}

function ResultsTable({ columns, values }: QueryExecResult) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((columnName, i) => (
            <td key={i}>{columnName}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {
          // values is an array of arrays representing the results of the query
          values.map((row, i) => (
            <tr key={i}>
              {row.map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
