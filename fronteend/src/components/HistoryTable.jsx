import React from "react";

const HistoryTable = ({ uploads }) => {
  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Thumbnail</th>
          <th>Date/Time</th>
          <th>Match Status</th>
          <th>Confidence</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {uploads.map((u) => (
          <tr key={u.id}>
            <td>
              <img src={u.thumbnailUrl} alt="thumb" style={{ width: 60 }} />
            </td>
            <td>{new Date(u.timestamp).toLocaleString()}</td>
            <td>{u.matched ? "Matched" : "Not Matched"}</td>
            <td>{u.confidence}</td>
            <td>
              <button className="btn btn-link">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryTable;
