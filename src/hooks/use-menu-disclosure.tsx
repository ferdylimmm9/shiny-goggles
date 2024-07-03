import { useDisclosure } from '@mantine/hooks';
import React from 'react';

export type MenuDisclosureProps = [
  boolean,
  {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  },
];

export const MenuDisclosure = React.createContext<MenuDisclosureProps>([
  true,
  {
    close() {},
    open() {},
    toggle() {},
  },
]);

export function MenuDisclosureProvider({ children }) {
  const [value, handler] = useDisclosure(true);
  return (
    <MenuDisclosure.Provider value={[value, handler]}>
      {children}
    </MenuDisclosure.Provider>
  );
}

export function useMenuDisclosure() {
  const context = React.useContext(MenuDisclosure);
  return context;
}
