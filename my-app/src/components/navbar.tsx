
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
import classes from './ui/DoubleHeader.module.css';
import React from 'react';
import { Stack } from '@mantine/core';
import { NavLink } from "react-router-dom";



export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box pb={30} style={{width:'100%'}}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} /> 
            <Center>
              <Group h="100%" gap={0} visibleFrom="cus" className='alignGroup'>
            <Button variant='transparent' className={classes.link} style={{ fontFamily: 'system-ui' }}>
              <NavLink to="/" style={{textDecoration: 'none'}}>
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
          

          <Group visibleFrom="cus">
            <NavLink to='/login'>
              <Button color='green'>Log in</Button>
            </NavLink>
            <NavLink to ='/signup'>
              <Button color='green'>Sign up</Button>
            </NavLink>
            
          </Group>

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

          <a href="#" className={classes.link}>
            Home &nbsp; <IconHome stroke={2} />
          </a>

          <a href="#" className={classes.link}>
            Orders &nbsp; <IconList stroke={2} />
          </a>
          <a href="#" className={classes.link}>
            Food &nbsp; <IconSalad stroke={2} />
          </a>

          <Divider my="sm" />
          <Box>
            <Stack style={{ alignItems: 'center' }}>
              <Button w="70%" color='green'>Log in</Button>
              <Button w="70%" color='green'>Sign up</Button>
            </Stack>
          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

