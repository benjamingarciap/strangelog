import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
export const Navbar = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-900 w-full h-14">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button>
          <Bars3Icon className="w-6 h-6" />
        </button>
        <Link href="/">
          <MapPinIcon className="w-6 h-6" />
        </Link>
      </div>
      {/* Center input */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-1/2 min-w-[120px]">
          <input
            name="search"
            type="text"
            className="border border-gray-300 rounded-md p-2 h-6 pl-8 w-full"
            placeholder="Search..."
          />
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-2">
        <button>Create</button>
        <button>Login</button>
      </div>
    </div>
  )
}
