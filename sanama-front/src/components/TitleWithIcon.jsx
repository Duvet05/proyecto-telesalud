const TitleWithIcon = ({ name, Icon }) => {
  return (
    <div className="flex items-center justify-between w-fit py-4">
      {Icon && <Icon />}
      <h1 style={{ color: "#28539E" }} className={`font-bold ml-${Icon ? "6" : "0"} text-6xl my-4`} >
        {name}
      </h1>
    </div>
  )
}

export default TitleWithIcon
