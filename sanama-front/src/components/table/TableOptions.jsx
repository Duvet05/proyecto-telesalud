import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import "font-awesome/css/font-awesome.min.css"

const TableOptions = ({ id, options, estado }) => {
  const [showOptions, setShowOptions] = useState(false)
  const dropdownRef = useRef(null)


  const handleDropdown = () => {
    setShowOptions(!showOptions)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
      <button id="options-dropdown-button" data-dropdown-toggle="options-dropdown" onClick={handleDropdown}
        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>

      <div ref={dropdownRef} id="options-dropdown" className={`${showOptions ? '' : 'hidden'} absolute z-10 w-fit bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
        <ul className=" text-sm text-gray-700 dark:text-gray-200" aria-labelledby="options-dropdown-button">
          {options.map((option, index) => (
            <li key={index}>
              <Link href={`${option.link}/${id}`} className="flex items-center w-full h-full py-2  hover:bg-gray-100">
                <i className={`${option.icon} px-2 `} aria-hidden="true"></i>
                <span className=" px-2">{option.text}</span>
              </Link>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default TableOptions
