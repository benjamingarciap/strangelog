import Link from 'next/link'
import {
  UserGroupIcon,
  HomeIcon,
  MapPinIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
export const Navbar = () => {
  return (
    <div className="flex gap-4 p-4 bg-gray-900 w-full">
      <Link href="/" className="">
        <Bars3Icon className="w-4 h-4" />
      </Link>
      <Link href="/about">
        <MapPinIcon className="w-4 h-4" />
      </Link>
      <input type="text" className="border border-gray-300 rounded-md p-2" />
      <button>Create</button>
      <button>Login</button>
    </div>
  )
}
