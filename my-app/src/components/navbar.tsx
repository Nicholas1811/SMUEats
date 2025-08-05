
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
  Image,
  Collapse,
  Space
} from '@mantine/core';
import { IconHome, IconMenuOrder, IconUser } from '@tabler/icons-react'; // or use any icon library you prefer
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
import { IconCaretDownFilled } from '@tabler/icons-react';



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
          <Button color='#00B14F'
            variant="light"
            radius="xl"
            size="sm"
            c="green"
            style={{
              fontWeight: 600,
              padding: '6px 16px',
              backgroundColor: '#E6F4EA', // soft mint green
              color: '#2E7D32',           // darker green text
              border: '1px solid #C8E6C9',
              transition: 'all 0.2s ease',
              fontFamily: 'Helvetica'
            }}
            leftSection={<IconUser size={20} />}
          >Profile</Button>
        </NavLink>
      </Group>

    );
  }
  return (
    <Group visibleFrom="cus">
      <NavLink to='/login'>
        <Button type="submit"

          color='#00B14F'
          variant="light"
          radius="xl"
          size="sm"
          c="green"
          h={35}
          style={{
            fontWeight: 600,
            padding: '6px 16px',
            backgroundColor: '#E6F4EA', // soft mint green
            color: '#2E7D32',           // darker green text
            border: '1px solid #C8E6C9',
            transition: 'all 0.2s ease',
            fontFamily: 'Helvetica',
            width: '100%'
          }} >Login</Button>
      </NavLink>

      <NavLink to='/signup'>
        <Button color='#00B14F' 
          variant="light"
          radius="xl"
          size="sm"
          c="green"
          h={35}
          style={{
            fontWeight: 600,
            padding: '6px 16px',
            backgroundColor: '#E6F4EA', // soft mint green
            color: '#2E7D32',           // darker green text
            border: '1px solid #C8E6C9',
            transition: 'all 0.2s ease',
            fontFamily: 'Helvetica',
            width: '100%'
          }}>Sign up</Button>
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
      <NavLink to='/profile' style={{ textDecoration: 'none' }}>
        <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui', textDecoration: 'none' }} >
          <Text c='#505050' fw={500} style={{ textDecoration: 'none' }}>Profile</Text>
        </Button>
        <Divider my="sm" />
      </NavLink>


      // <Stack style={{ alignItems: 'center' }}>
      //   <NavLink to='/profile'>
      //     <Button color='#00B14F' radius="md">
      //       <Text fw={400} size='lg' >Profile</Text>
      //     </Button>
      //   </NavLink>
      // </Stack>

    );
  }
  else {
    if (!session && !loading) {
      return (
        <Stack style={{ alignItems: 'center' }}>
          <NavLink to='/login'>
            <Button color='#00B14F' w={350} key='login'>Log in</Button>
          </NavLink>

          <NavLink to='/signup'>
            <Button color='#00B14F' w={350} key='signup'>Sign up</Button>
          </NavLink>
        </Stack>
      );
    }
  }

}


export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const location = useLocation();
  const { session, loading } = useLogin();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Box pb={0} style={{ width: '100%', border: 'none' }} c='#00B14F'>
      <header className={classes.header} color='#00B14F'>
        <Group justify="space-between" h="100%">
          <Image src='https://emmwtceslmtkkjpujrtk.supabase.co/storage/v1/object/public/logo//logoNew.png' h={50} w={250} ml={-15} />
          <Group h="100%" gap={0} visibleFrom="cus" className='alignGroup' justify='flex-end' style={{ flexGrow: 1, border: 'none' }}>
            <Button className={classes.link} component={NavLink} to='/'
              color='#00B14F'
              variant="light"
              radius="xl"
              size="sm"
              c="green"
              h={35}
              style={{
                fontWeight: 600,
                padding: '6px 16px',
                backgroundColor: '#E6F4EA', // soft mint green
                color: '#2E7D32',           // darker green text
                border: '1px solid #C8E6C9',
                transition: 'all 0.2s ease',
                fontFamily: 'Helvetica'
              }}
              leftSection={<IconHome size={20} />}

            >
              Home
            </Button>


            <Menu shadow="md" width={175} offset={0}>

              {
                session !== null &&
                <Menu.Target>
                  <Button className={classes.link}

                    color='#00B14F'
                    variant="light"
                    radius="xl"
                    size="sm"
                    c="green"
                    h={35}
                    ml={20}
                    style={{
                      fontWeight: 600,
                      padding: '6px 16px',
                      backgroundColor: '#E6F4EA', // soft mint green
                      color: '#2E7D32',           // darker green text
                      border: '1px solid #C8E6C9',
                      transition: 'all 0.2s ease',
                      fontFamily: 'system-ui'
                    }}
                    leftSection={<IconMenuOrder />}
                  >
                    Orders

                  </Button>
                </Menu.Target>
              }
              <Menu.Dropdown bg='#FFFAF0'>
                <Menu.Label color='black'>Order Selections</Menu.Label>
                <Menu.Item leftSection={<IconShoppingCart size={20} />} component={NavLink} to='/Orders'>
                  Current Cart
                </Menu.Item>
                <Menu.Item leftSection={<IconReceipt size={20} />} component={NavLink} to='/prevOrder'>
                  Previous Orders
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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
        lockScroll={false}
        title="SMUEats"
        hiddenFrom="cus"
        zIndex={1000000}
        styles={{
          content: {
            backgroundColor: '#FFFAF0', // Apply desired background color
          },
        }}

      >
        <ScrollArea h="calc(100vh - 80px" mx="-md" bg='#FFFAF0'>
          <Divider my="sm" />
          <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Text c='#505050' fw={500} >Home</Text>
            </NavLink>
          </Button>




          {session !== null &&
            <>
              <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui', width: '100%', justifyContent: 'space-between' }} onClick={toggle}
                fullWidth rightSection={<IconCaretDownFilled />}
              >


                <Group justify="space-between" styles={{
                  width: '100%'
                }}>
                  <Text c='#505050' fw={500}>Orders</Text>

                </Group>


              </Button>
              <Collapse in={opened} transitionDuration={500} transitionTimingFunction="linear">
                <Space w={10} />
                <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }} ml={10}>
                  <NavLink to='/Orders' style={{ textDecoration: 'none' }}>

                    <Text c='#505050' fw={500} size='xs'>Current Cart</Text>
                  </NavLink>

                </Button>

                <Space w={10} />
                <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }} ml={10} mt={-10}>
                  <NavLink to='/prevOrder' style={{ textDecoration: 'none' }}>

                    <Text c='#505050' fw={500} size='xs'>Previous Orders</Text>
                  </NavLink>
                </Button>
              </Collapse>
            </>

          }


          <Box>

            <PCheck />

          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

