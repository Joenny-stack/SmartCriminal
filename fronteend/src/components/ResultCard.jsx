import React from "react";

const ResultCard = ({ result }) => {
  if (!result) return null;
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">
          Match Result: {result.matched ? "Matched" : "Not Matched"}
        </h4>
        <p className="card-text">Confidence: {result.confidence}</p>
        {result.criminal && (
          <div>
            <h5>Criminal Record</h5>
            <pre>{JSON.stringify(result.criminal, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
