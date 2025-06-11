import React from "react";

const HistoryTable = ({ uploads, loading }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: 16,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
          padding: "2rem 2.5rem 1.5rem 2.5rem",
          minWidth: 320,
          maxWidth: 900,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.13)",
          backdropFilter: "blur(2px)",
        }}
      >
        <span style={{ fontSize: 38, marginBottom: 12 }}>🕓</span>
        <h2
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 26,
            marginBottom: 18,
          }}
        >
          History
        </h2>
        {loading ? (
          <div
            style={{
              color: "#e3eaff",
              fontSize: 18,
              margin: "2rem 0",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        ) : (
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table
              className="table table-bordered mt-3"
              style={{
                background: "rgba(255,255,255,0.10)",
                color: "#e3eaff",
                borderRadius: 18,
                overflow: "hidden",
                borderCollapse: "separate",
                borderSpacing: 0,
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
                marginBottom: 0,
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(90deg, #0a6efd 0%, #0a3c6e 100%)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 18,
                    letterSpacing: 0.5,
                    border: "none",
                  }}
                >
                  <th
                    style={{
                      border: "none",
                      padding: "1rem 0.7rem",
                      textAlign: "center",
                      borderTopLeftRadius: 12,
                    }}
                  >
                    Thumbnail
                  </th>
                  <th
                    style={{
                      border: "none",
                      padding: "1rem 0.7rem",
                      textAlign: "center",
                    }}
                  >
                    Date/Time
                  </th>
                  <th
                    style={{
                      border: "none",
                      padding: "1rem 0.7rem",
                      textAlign: "center",
                    }}
                  >
                    Match Status
                  </th>
                  <th
                    style={{
                      border: "none",
                      padding: "1rem 0.7rem",
                      textAlign: "center",
                    }}
                  >
                    Confidence
                  </th>
                  <th
                    style={{
                      border: "none",
                      padding: "1rem 0.7rem",
                      textAlign: "center",
                      borderTopRightRadius: 12,
                    }}
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {uploads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "center",
                        color: "#b0b8c9",
                        padding: "1.5rem",
                        background: "rgba(255,255,255,0.03)",
                        fontWeight: 500,
                        fontSize: 17,
                      }}
                    >
                      No history found.
                    </td>
                  </tr>
                ) : (
                  uploads.map((u, idx) => (
                    <tr
                      key={u.id || u._id || u.timestamp}
                      style={{
                        background:
                          idx % 2 === 0
                            ? "rgba(10,30,60,0.10)"
                            : "rgba(255,255,255,0.02)",
                        transition: "background 0.3s",
                        borderBottom: "1.5px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {u.image_path ? (
                          <img
                            src={(() => {
                              // Clean up the image path for backend serving
                              let path = u.image_path;
                              // Remove Windows absolute path if present
                              path = path.replace(
                                /^.*uploads[\\/]/i,
                                "uploads/"
                              );
                              // Replace backslashes with slashes
                              path = path.replace(/\\/g, "/");
                              // Prepend 'api/' to the path if not already present
                              if (!path.startsWith("api/")) {
                                path = "api/" + path;
                              }

                              return `${
                                import.meta.env.VITE_API_BASE_URL
                              }/${path}`;
                            })()}
                            alt="thumb"
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 10,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                              border: "2px solid #0a6efd22",
                              background: "#e3eaff",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : null}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          fontWeight: 500,
                        }}
                      >
                        {new Date(u.timestamp).toLocaleString()}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          style={{
                            padding: "0.3em 1.1em",
                            borderRadius: 10,
                            background: u.matched
                              ? "linear-gradient(90deg, #0a6efd33 0%, #0a3c6e33 100%)"
                              : "linear-gradient(90deg, #dc354533 0%, #6e0a0a33 100%)",
                            color: u.matched ? "#0a6efd" : "#dc3545",
                            fontWeight: 700,
                            fontSize: 15,
                            letterSpacing: 0.2,
                            border: u.matched
                              ? "1.5px solid #0a6efd55"
                              : "1.5px solid #dc354555",
                            boxShadow: u.matched
                              ? "0 1px 6px #0a6efd22"
                              : "0 1px 6px #dc354522",
                          }}
                        >
                          {u.matched ? "Matched" : "Not Matched"}
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            color: u.confidence > 80 ? "#0a6efd" : "#ffc107",
                            fontSize: 16,
                            letterSpacing: 0.2,
                          }}
                        >
                          {u.confidence}
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <button
                          className="btn btn-link"
                          style={{
                            color: "#0a6efd",
                            fontWeight: 700,
                            padding: 0,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 15,
                            textDecoration: "underline",
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;
