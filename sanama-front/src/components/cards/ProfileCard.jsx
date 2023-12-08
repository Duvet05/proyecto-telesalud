import Link from 'next/link'
const ProfileCard = ({ name, phone, email, address, id, module, urlEdit, imagenPerfil }) => {
	return (
		<section className="my-10 w-full h-[300px] bg-white border border-gray-200 rounded-xl shadow flex p-10 justify-center flex-col">
			<h3 className="text-blue-900 text-3xl font-bold ">{name}</h3>

			<div className="py-4">
				<h3 className="mt-3 text-lg font-semibold tracking-wide text-black">Datos de contacto</h3>
				<p className="text-md text-gray-500 truncate ">Correo electrónico: {email}</p>
				<p className="text-md text-gray-500 truncate ">Telefono: {phone}</p>
				<p className="text-md text-gray-500 truncate">Direccion: {address}</p>
			</div>

			<Link
				className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-500 flex justify-end"
				href={`/${module}/profile/${id}/${urlEdit}`}>
				Modificar datos
			</Link>
		</section>
	)
}

export default ProfileCard
