"use client";
import React from "react";
import Link from "next/link";
import noPerfil from "../cards/noPerfil.png";

const ProfileCardDoctor = ({
  imagenPerfil,
  name,
  email,
  phone,
  address,
  doctor,
  module,
  id,
  urlEdit,
}) => {
  return (
    <>
      <section className="w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow flex flex-row">
        <figure className="px-8 py-10 flex flex-row items-center">
          {imagenPerfil === undefined ? (
            <img
              className="w-16 h-16 center rounded-full shadow-lg"
              src="/no-avatar.svg"
              alt="pfp"
            />
          ) : (
            <>
              {imagenPerfil ? (
                <div
                  className="mt-2"
                  style={{
                    width: "12rem",
                    height: "12rem",
                    position: "relative",
                  }}
                >
                  <img
                    src={imagenPerfil}
                    alt="Vista previa de la imagen"
                    className="object-cover w-full h-full rounded-full aspect-w-1"
                    style={{ objectFit: "cover", margin: "auto" }}
                  />
                </div>
              ) : (
                <div
                  className="mt-2"
                  style={{
                    width: "12rem",
                    height: "12rem",
                    position: "relative",
                  }}
                >
                  <img
                    src={noPerfil.src}
                    alt="Vista previa de la imagen"
                    className="object-cover w-full h-full rounded-full"
                    style={{ objectFit: "cover", margin: "auto" }}
                  />
                </div>
              )}
            </>
          )}
        </figure>

        <address className="p-11 not-italic">
          <h3 className="text-2xl font-bold tracking-wider text-gray-900">
            {name}
          </h3>
          <div className="mt-6">
            <h3 className="text-lg font-semibold tracking-wide text-black">
              Datos de contacto
            </h3>
          </div>

          <dl className="py-2">
            <dd className="text-sm text-gray-500">
              Correo electrónico: {email}
            </dd>
            <dd className="text-sm text-gray-500">Teléfono: {phone}</dd>
            <dd className="text-sm text-gray-500">Dirección: {address}</dd>
          </dl>

          {doctor ? (
            <Link href={`/${module}/profile/${id}/${urlEdit}`} state={doctor}>
              <div className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Modificar datos
              </div>
            </Link>
          ) : (
            <Link href={`/${module}/profile/${id}/${urlEdit}`}>
              <div className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Modificar datos
              </div>
            </Link>
          )}
        </address>
      </section>
    </>
  );
};

export default ProfileCardDoctor;
