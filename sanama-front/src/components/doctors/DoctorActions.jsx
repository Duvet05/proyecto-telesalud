import ActionButton from "@/components/buttons/ActionButton";

const DoctorActions = ({ id }) => {
  return (
    <section className="my-10 rounded-2xl h-full grid grid-rows-2 items-center bg-white shadow">
      <ActionButton
        url={`/doctors/profile/${id}/disponibilidad`}
        color={"bg-orange-400"}
        shadow={"shadow-orange-200"}
        name={"Editar disponibilidad"}
      />

      <ActionButton
        url={`/doctors/profile/${id}/misCitas`}
        color={"bg-red-400"}
        shadow={"shadow-red-200"}
        name={"Mis citas"}
      />
    </section>
  );
};

export default DoctorActions;
