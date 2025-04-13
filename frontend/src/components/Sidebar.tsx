"use client";

import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const menuItems = [
    { href: "/home", label: "Menu", icon: "/home.svg" },
    { href: "/dashboard", label: "Historico", icon: "archive.svg" },
    /*{ href: "/paywithbnb", label: "Create PayToken", icon: "info.svg" },*/
    { href: "/generatebnbqr", label: "Generate BNB QRCode", icon: "qrcode1.svg" },
    { href: "/generateqrcodecontract", label: "Generate QRCode Dapp", icon: "qrcode2.svg" },
    /*{ href: "/pay", label: "Pay", icon: "info.svg" },*/
    { href: "/about", label: "Sobre", icon: "about.svg" },
  ];

  return (
    <aside
      className="d-flex flex-column justify-between p-4"
      style={{
        width: "230px",
        height: "100vh",
        backgroundColor: "#f9f9fb",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <div className="d-flex flex-column gap-3">

        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="d-flex align-items-center gap-2 text-dark text-decoration-none fw-semibold py-2"
          >
            <Image
              src={`/icons/${item.icon}`}
              alt={item.label}
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="pt-4 border-top">
        <Link href="/" className="d-flex align-items-center gap-2 text-danger fw-bold text-decoration-none py-2">
          <Image
            src="/icons/logout.svg"
            alt="Logout"
            width={20}
            height={20}
            style={{ objectFit: "contain" }}
          />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
