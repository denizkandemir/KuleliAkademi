import React from "react";
import { Link } from "@inertiajs/react";

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: "#333", padding: "10px" }}>
            <ul style={{ listStyle: "none", display: "flex", gap: "20px", margin: 0, padding: 0 }}>
                <li><Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link></li>
                <li><Link href="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link></li>
                <li><Link href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;