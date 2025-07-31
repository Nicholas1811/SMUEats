import { Anchor, Container, Group,Image } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterSimple.module.css';
import React from 'react';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src = 'https://emmwtceslmtkkjpujrtk.supabase.co/storage/v1/object/public/logo//Screenshot%202025-07-31%20at%2014.03.00.png' h={50} w={200} ml={-17}/>
        {/* <MantineLogo size={28} /> */}
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}