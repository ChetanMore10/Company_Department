import React from "react";

const Table = ({ columns, data, renderActions }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-3 px-4 text-left font-medium text-gray-700"
              >
                {col}
              </th>
            ))}
            {renderActions && (
              <th className="py-3 px-4 text-center font-medium text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {Object.keys(item).map((key, idx) => (
                  <td key={idx} className="py-3 px-4">
                    {item[key]}
                  </td>
                ))}

                {/* Action Buttons */}
                {renderActions && (
                  <td className="py-3 px-4 text-center">
                    {renderActions(item)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-gray-500"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
