import Link from "next/link";
import React from "react";

export default function Navbar()  {
    
        return (
            <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <Link href="/" className="navbar-brand">Do-it</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link href="/" className="nav-link active">Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link href="/signout" className="nav-link">Sign Out</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </>
        );
    };

