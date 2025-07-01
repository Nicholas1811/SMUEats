
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleHeader.module.css';
import React from 'react';
import { Stack } from '@mantine/core';
import { NavLink } from "react-router-dom";
import { useLogin } from '../backend/auth/authcheck';
import { useUserTable } from '../backend/auth/authcheck';


function ProfileCheck() {
  const { session, loading } = useLogin();
  let id = "null"
  if (session) {
    id = session.user.id
  }
  const currentData = useUserTable(id)

  if (loading) {
    return null;
  }
  let uname = "";
  if (session && currentData) {
    uname = currentData.username
    return (
      <Group visibleFrom="cus">
        <NavLink to='/profile'>
          <Button color='green' radius="md">{uname}'s Profile</Button>
        </NavLink>
      </Group>

    );
  }
  return(
          <Group visibleFrom="cus">
        <NavLink to='/login'>
          <Button color='green' radius="md" variant='gradient' gradient={{from: '#11998e', to: '#38ef7d', deg:135}}>Login</Button>
        </NavLink>

        <NavLink to='/signup'>
          <Button color='green' radius="md" variant='gradient' gradient={{from: '#11998e', to: '#38ef7d', deg:135}}>Sign up</Button>
        </NavLink>
      </Group>
  )
}
function PCheck() {
  const { session, loading } = useLogin();
  let id = "null"
  if (session) {
    id = session.user.id
  }
  const currentData = useUserTable(id)

  if (loading) {
    return null;
  }
  let uname = "";

  if (session && !loading && currentData) {
    uname = currentData.username
    return (
      <Stack style={{ alignItems: 'center' }}>
        <NavLink to='/profile'>
          <Button color='green' radius="md">{uname}'s Profile</Button>
        </NavLink>
      </Stack>

    );
  }
  else{
    if(!session && !loading){
        return (
    <Stack style={{ alignItems: 'center' }}>
      <NavLink to='/login'>
        <Button color='green' w={350}>Log in</Button>
      </NavLink>
        <Button color='green' w={350}>Sign up</Button>ƒ
      <NavLink to='/signup'>
      </NavLink>
    </Stack>
  );
    }
  }

}


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  return (
    <Box pb={0} style={{ width: '100%' }}>
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

            <PCheck />

          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

