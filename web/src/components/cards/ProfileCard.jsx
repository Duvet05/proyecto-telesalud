const ProfileCard = ({ name, phone, email, address }) => {
    return (
        <section className="w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow flex flex-col">

            <figure className="px-8 py-10 flex flex-row items-center">
                <img className="w-16 h-16 center rounded-full shadow-lg" src="/no-avatar.svg" alt="pfp" />
                <h3 className="ml-6 text-2xl font-bold tracking-wider text-gray-900">{name}</h3>
            </figure>

            <address className="px-10 not-italic">
                <h3 className="text-xl font-semibold tracking-wide">Datos de contacto</h3>
                <dl className="py-2">
                    <dd className="text-sm text-gray-500">Direccion: {address}</dd>
                    <dd className="text-sm text-gray-500">Correo electronico: {email}</dd>
                    <dd className="text-sm text-gray-500">Telefono: {phone}</dd>
                </dl>
            </address>

        </section >
    )
}

export default ProfileCard