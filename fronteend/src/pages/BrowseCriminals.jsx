import React, { useState } from "react";
import "../styles/Dashboard.css";

// Example data - in a real app, fetch from API
const criminals = [
  {
    id: 1,
    name: "John Doe",
    alias: "The Shadow",
    crime: "Robbery, Burglary",
    status: "Wanted",
    lastSeen: "New York, NY",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Known for a string of high-profile burglaries. Considered dangerous.",
  },
  {
    id: 2,
    name: "Jane Smith",
    alias: "Black Widow",
    crime: "Fraud, Identity Theft",
    status: "In Custody",
    lastSeen: "Los Angeles, CA",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description:
      "Expert in financial fraud and identity theft. Arrested in 2024.",
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    alias: "El Zorro",
    crime: "Armed Robbery",
    status: "Wanted",
    lastSeen: "Houston, TX",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    description:
      "Armed and dangerous. Last seen fleeing a crime scene in Houston.",
  },
  {
    id: 4,
    name: "Fatima Al-Farsi",
    alias: "The Fox",
    crime: "Cybercrime, Hacking",
    status: "Wanted",
    lastSeen: "Dubai, UAE",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    description:
      "Mastermind behind several international cyber attacks. Highly skilled hacker.",
  },
  {
    id: 5,
    name: "Igor Petrov",
    alias: "The Bear",
    crime: "Extortion, Kidnapping",
    status: "In Custody",
    lastSeen: "Moscow, Russia",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    description:
      "Notorious for orchestrating high-profile kidnappings. Captured in 2023.",
  },
  {
    id: 6,
    name: "Maria Gonzalez",
    alias: "La Sombra",
    crime: "Drug Trafficking",
    status: "Wanted",
    lastSeen: "Mexico City, Mexico",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    description:
      "Leader of a major drug cartel. Known for evading law enforcement.",
  },
  {
    id: 7,
    name: "David Kim",
    alias: "Ghost",
    crime: "Money Laundering",
    status: "Wanted",
    lastSeen: "Seoul, South Korea",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    description:
      "Expert in financial crimes and money laundering. Uses advanced technology.",
  },
  {
    id: 8,
    name: "Amina Diallo",
    alias: "The Chameleon",
    crime: "Forgery, Passport Fraud",
    status: "In Custody",
    lastSeen: "Paris, France",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    description:
      "Specialist in document forgery. Arrested at Charles de Gaulle Airport.",
  },
  {
    id: 9,
    name: "Luca Romano",
    alias: "Il Lupo",
    crime: "Art Theft",
    status: "Wanted",
    lastSeen: "Rome, Italy",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    description: "Responsible for several high-value art heists across Europe.",
  },
  {
    id: 10,
    name: "Sophia Müller",
    alias: "The Whisper",
    crime: "Espionage",
    status: "Wanted",
    lastSeen: "Berlin, Germany",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    description:
      "Suspected of espionage and leaking classified information. Extremely elusive.",
  },
  {
    id: 12,
    name: "Emily Clark",
    alias: "The Siren",
    crime: "Human Trafficking",
    status: "In Custody",
    lastSeen: "London, UK",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    description:
      "Key figure in an international trafficking ring. Arrested in a sting operation.",
  },
  {
    id: 13,
    name: "Rajesh Patel",
    alias: "The Forger",
    crime: "Counterfeiting, Smuggling",
    status: "Wanted",
    lastSeen: "Mumbai, India",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    description:
      "Master forger and smuggler, known for producing high-quality counterfeit currency.",
  },
];

const BrowseCriminals = () => {
  const [search, setSearch] = useState("");
  const filteredCriminals = criminals.filter((criminal) => {
    const term = search.trim().toLowerCase();
    return (
      !term ||
      criminal.name.toLowerCase().includes(term) ||
      criminal.id.toString() === term
    );
  });

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">Browse Criminals</h1>
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row g-4 justify-content-center">
        {filteredCriminals.length === 0 ? (
          <div className="col-12 text-center text-danger fw-bold fs-4">
            No records found.
          </div>
        ) : (
          filteredCriminals.map((criminal) => (
            <div className="col-12 col-md-6 col-lg-4" key={criminal.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={criminal.image}
                  className="card-img-top"
                  alt={criminal.name}
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{criminal.name}</h5>
                  <p className="text-muted mb-2">
                    <strong>Alias:</strong> {criminal.alias}
                  </p>
                  <p className="mb-1">
                    <strong>Crimes:</strong> {criminal.crime}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        criminal.status === "Wanted"
                          ? "text-danger fw-bold"
                          : "text-success fw-bold"
                      }
                    >
                      {criminal.status}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Last Seen:</strong> {criminal.lastSeen}
                  </p>
                  <p className="mb-2">
                    <strong>Description:</strong> {criminal.description}
                  </p>
                  {criminal.status === "Wanted" && (
                    <a
                      href={`/report-sighting?criminalId=${criminal.id}`}
                      className="btn btn-danger mt-auto"
                      style={{ color: "#fff" }}
                    >
                      Upload Criminal Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseCriminals;
