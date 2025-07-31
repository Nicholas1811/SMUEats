
import {
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Drawer,
  Group,
  Menu,
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
import { useLocation } from 'react-router-dom';
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconReceipt, IconSearch, IconSettings, IconTrash } from '@tabler/icons-react';
import { IconShoppingCart } from '@tabler/icons-react';



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
          <Button color='#00B14F' radius="md" size='s' style={{ fontFamily: 'Helvetica' }}>Profile</Button>
        </NavLink>
      </Group>

    );
  }
  return (
    <Group visibleFrom="cus">
      <NavLink to='/login'>
        <Button color='green' radius="md" variant='gradient' gradient={{ from: '#11998e', to: '#38ef7d', deg: 135 }}>Login</Button>
      </NavLink>

      <NavLink to='/signup'>
        <Button color='green' radius="md" variant='gradient' gradient={{ from: '#11998e', to: '#38ef7d', deg: 135 }}>Sign up</Button>
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
          <Button color='#00B14F' radius="md">
            <Text fw={400} size='lg' >Profile</Text>
          </Button>
        </NavLink>
      </Stack>

    );
  }
  else {
    if (!session && !loading) {
      return (
        <Stack style={{ alignItems: 'center' }}>
          <NavLink to='/login'>
            <Button color='#00B14F' w={350}>Log in</Button>
          </NavLink>
          <Button color='#00B14F' w={350}>Sign up</Button>ƒ
          <NavLink to='/signup'>
          </NavLink>
        </Stack>
      );
    }
  }

}


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const location = useLocation();
  return (
    <Box pb={0} style={{ width: '100%' }} c='#00B14F'>
      <header className={classes.header} color='#00B14F'>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />

          <Group h="100%" gap={0} visibleFrom="cus" className='alignGroup' justify='flex-end' style={{ flexGrow: 1 }}>
            <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }} component={NavLink} to='/'>
              <Text fw={500} size='md' c='black' style={{ fontFamily: 'Helvetica' }}>Home</Text>
            </Button>


            <Menu shadow="md" width={175} offset={0}>
              <Menu.Target>
                <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
                  <Text fw={500} size='md' c='black' style={{ fontFamily: 'Helvetica' }}>Orders</Text>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Order Selections</Menu.Label>
                <Menu.Item leftSection={<IconShoppingCart size={20} />} component={NavLink} to='/Orders'>
                  Current Cart
                </Menu.Item>
                <Menu.Item leftSection={<IconReceipt size={20} />} component={NavLink} to ='/prevOrder'>
                  Previous Orders
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }} component={NavLink} to='/'>
              <Text fw={500} size='md' c='black' style={{ fontFamily: 'Helvetica' }}>Food</Text>
            </Button>
          </Group>

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
            <NavLink to='/Orders'>
              <Text c='#505050' fw={500}>Orders</Text>
            </NavLink>
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

