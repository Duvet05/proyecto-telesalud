//Pagina de inicio al cargar por primera vez la aplicacion
//TODO: Un componente Dashboard que muestre datos iniciales.
"use client";
import React from "react";
import NewsFeed from "@/components/NewsFeed";
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid'
import TransactionChart from '../components/dashboard/TransactionChart'
import BuyerProfilePieChart from '../components/dashboard/BuyerProfilePieChart'
import CitasRecientes from '../components/dashboard/CitasRecientes'
import TitleWithIcon from "@/components/TitleWithIcon";
export default function Home() {
  return (
    // <main className="flex flex-col items-center justify-between p-10">
    //   <div className="font-bold text-blue-500">Noticias Medicas</div>
    //   <NewsFeed />
    // </main>
    <>
      <TitleWithIcon name={"Inicio"} />
      <div className="text-5xl font-bold text-black-500 px-4 text-center mb-6" style={{ color: "#28539E" }}>
        Indicadores - Noviembre 2023
      </div>
      <div className="flex flex-col gap-4">
        <DashboardStatsGrid />
        <div className="flex flex-row gap-4 w-full">
          <TransactionChart />
          <BuyerProfilePieChart />
        </div>
        
        <div className="flex flex-row gap-4 w-full">
          <CitasRecientes />
          <NewsFeed />
        </div>
      </div>
      {/* <div className="font-bold text-blue-500">Noticias Medicas</div> */}
    </>
  );
}
