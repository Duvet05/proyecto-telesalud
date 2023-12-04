import Link from 'next/link'

const ActionButton = ({ url, name, color, shadow }) => {
	return (
		<Link href={url} className="p-10 h-full flex flex-row items-center hover:bg-slate-100 rounded-2xl cursor-pointer">
			<span className={`p-5 rounded-full ${color} text-white shadow-lg ${shadow}`} />
			<p className="pl-5 text-lg font-medium text-slate-700 mt-3">{name}</p>
		</Link>
	)
}

export default ActionButton
