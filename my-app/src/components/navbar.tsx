
import { IconHome } from '@tabler/icons-react';
import { IconList } from '@tabler/icons-react';
import { IconSalad } from '@tabler/icons-react';
import {
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  useMantineTheme,
  Image
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleHeader.module.css';
import React from 'react';
import { Stack } from '@mantine/core';
import { NavLink } from "react-router-dom";
import { useLogin } from '../backend/auth/authcheck';
import { Outlet } from "react-router-dom";


function ProfileCheck() {
  const { session, loading } = useLogin();

  if (loading) {
    return null;
  }
  if (session) {
    return (
      <NavLink to='/profile'>
        <Button color='green' radius="md">Profile</Button>
      </NavLink>
    );
  }

  return (
    <Group visibleFrom="cus">
      <NavLink to='/login'>
        <Button color='green' radius="md">Log in</Button>
      </NavLink>
      <NavLink to='/signup'>
        <Button color='green' radius="md">Sign up</Button>
      </NavLink>
    </Group>
  );
}


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={30} style={{ width: '100%' }}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />
          <Center>
            <Group h="100%" gap={0} visibleFrom="cus" className='alignGroup'>
              <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                  <Text c='#505050' fw={500} >Home</Text>
                </NavLink>

              </Button>

              <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
                <Text c='#505050' fw={500}>Orders</Text>
              </Button>
              <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
                <Text c='#505050' fw={500}>Food</Text>
              </Button>
            </Group>
          </Center>

          <ProfileCheck />

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="cus" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="SMUEats"
        hiddenFrom="cus"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Text c='#505050' fw={500} >Home</Text>
            </NavLink>
          </Button>

          <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
            <Text c='#505050' fw={500}>Orders</Text>
          </Button>
          <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
            <Text c='#505050' fw={500}>Food</Text>
          </Button>


          <Divider my="sm" />
          <Box>
            <Stack style={{ alignItems: 'center' }}>
              <NavLink to='/login'>
                <Button color='green' w={350}>Log in</Button>
              </NavLink>
              <NavLink to='/signup'>
                <Button color='green' w={350}>Sign up</Button>
              </NavLink>
            </Stack>
          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

