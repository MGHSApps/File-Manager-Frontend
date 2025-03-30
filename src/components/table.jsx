import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto flex flex-grow z-10 bg-primary-content rounded shadow border-base-100">
      <table className="table table-zebra">
        <thead className='bg-accent text-white'>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.accessorFn ? column.accessorFn(row) : row[column.accessorKey]}
                </td>
              ))}
              {actions && <td>{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
