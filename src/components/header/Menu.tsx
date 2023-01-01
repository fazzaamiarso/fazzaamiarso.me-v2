import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { navigations } from "common";
import { Fragment } from "react";

export const MobileNav = ({}) => {
  return (
    <Menu as='div' className='flex justify-center md:hidden'>
      {({ close }) => (
        <Fragment>
          <Menu.Button className=''>
            <BarSVG />
          </Menu.Button>
          <Menu.Items as='div' className='fixed inset-0 z-50 flex flex-col bg-white p-8'>
            <button onClick={close} className='ml-auto'>
              <XmarkSVG />
            </button>
            <ul className='space-y-8'>
              {navigations.map((nav) => {
                return (
                  <Menu.Item key={nav.href} as='li'>
                    {({ active }) => (
                      <a
                        href={nav.href}
                        className={clsx(active && "text-red-500", "py-2 font-semibold")}>
                        {nav.name}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </ul>
          </Menu.Items>
        </Fragment>
      )}
    </Menu>
  );
};

const XmarkSVG = () => {
  return (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='h-10 w-10'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
    </svg>
  );
};
const BarSVG = () => {
  return (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='h-6 w-6'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 9h16.5m-16.5 6.75h16.5' />
    </svg>
  );
};
