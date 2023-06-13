import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='flex justify-center bg-gray-900 p-3'>
      <img src='/logo.png' alt='Logo' className='h-8 w-auto' />
      <NavLink
        className={({ isActive }) =>
          "text-gray-300 mx-4 hover:text-white" +
          (isActive ? " border-b-2 border-blue-500 pb-1" : "")
        }
        end={true}
        to='/'>
        InvolveAi
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "text-gray-300 mx-4 hover:text-white" +
          (isActive ? " border-b-2 border-blue-500 pb-1" : "")
        }
        to='/personalize-email'>
        Personalize Email
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "text-gray-300 mx-4 hover:text-white" +
          (isActive ? " border-b-2 border-blue-500 pb-1" : "")
        }
        to='/market-research'>
        Market Research
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "text-gray-300 mx-4 hover:text-white" +
          (isActive ? " border-b-2 border-blue-500 pb-1" : "")
        }
        to='/crm'>
        CRM
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "text-gray-300 mx-4 hover:text-white" +
          (isActive ? " border-b-2 border-blue-500 pb-1" : "")
        }
        to='/marketing'>
        Marketing
      </NavLink>
    </nav>
  );
};

export default NavBar;
