import { Anchor, Container, Flex, Group, Image, Space,Text } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterSimple.module.css';
import React from 'react';
import { NavLink } from "react-router-dom";


const links = [
  { link: '/', label: 'Home' },
  { link: '/Orders', label: 'Orders' },
  { link: '/Profile', label: 'Profile' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <NavLink to={link.link} style={{ textDecoration: 'none' }}>
      <Text<'a'>
        c="dimmed"
        size="md"
        fw={700}
      >
        {link.label}
      </Text>
    </NavLink>

  ));

  return (
    <>
      {/* <Space h={30} /> */}

        <div className={classes.footer}>

          <Container className={classes.inner}>
                      <Image src='https://emmwtceslmtkkjpujrtk.supabase.co/storage/v1/object/public/logo//logoNew.png' h={50} w={250} ml={-15} />
            
            {/* <MantineLogo size={28} /> */}
            <Group className={classes.links}>{items}</Group>
          </Container>
        </div>

    </>
  );
}