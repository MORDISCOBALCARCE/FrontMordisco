import { useState } from "react";
import "./style.css";

import { SideBarAdmin } from "./components/SideBarAdmin";
import { TablaUsuarios } from "./components/TablaUsuarios";
import { TablaLocales } from "./components/TablaLocales";

export function Administrador() {
  const [vistaActiva, setVistaActiva] = useState<"usuarios" | "locales">(
    "usuarios"
  );

  return (
    <div className="min-h-screen bg-(--background) text-(--on-surface)">
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">

        {/* SIDEBAR */}
        <SideBarAdmin
          vistaActiva={vistaActiva}
          setVistaActiva={setVistaActiva}
        />

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {vistaActiva === "usuarios" && <TablaUsuarios />}

            {vistaActiva === "locales" && <TablaLocales />}

          </div>
        </main>
      </div>
    </div>
  );
}