import React from "react";
import Foto from "./img/logo-1.jpeg"
import Graduacion from "./img/graduacion.png"
import Ticket from "./img/ticket.png"
import Reportes from "./img/analitica.png"



function Cards(){
    return(
        <>
        <div className="m-10 flex ">
            <a href="/students"  className="flex flex-col justify-center items-center w-3/4 h-60 bg-neutral-200 m-3 rounded-lg shadow-xl">
         <div  className="flex flex-col justify-center items-center  h-60 bg-neutral-200  rounded-lg hover:bg-neutral-300">
            <img src={Graduacion} alt="none" className="w-24 pb-2" />
            <h1 className="text-2xl text-center pb-2"><b>Estudiantes</b></h1> 
            <p className="text-center px-2">Seguimiento a estudiantes y mentores de Neuuni</p>
            </div></a>
            <a href="/tickets" className="flex flex-col justify-center items-center w-3/4 h-60 bg-neutral-200 m-3 rounded-lg shadow-xl">
         <div className="flex flex-col justify-center items-center  h-60 bg-neutral-200 rounded-lg  hover:bg-neutral-300">
         <img src={Ticket} alt="none" className="w-24 pb-2" />
            <h1 className="text-2xl text-center pb-2"><b>Tickets</b></h1> 
            <p className="text-center px-2">Seguimiento de tikets  para estudiantes y mentores</p> 
            </div></a>
            <a href="https://tailwindcss.com/docs/padding" className="flex flex-col justify-center items-center w-3/4 h-60 bg-neutral-200 m-3 rounded-lg shadow-xl " >
         <div className="flex flex-col justify-center items-center h-60 bg-neutral-200 rounded-lg  hover:bg-neutral-300">
         <img src={Reportes} alt="none" className="w-24 pb-2" />
            <h1 className="text-2xl text-center pb-2"><b>Reportes</b></h1> 
            <p className="text-center px-2">Generación de reportes mensuales con gráficos</p>
            </div></a>
         </div>
        </>
    );

}
export default Cards;

