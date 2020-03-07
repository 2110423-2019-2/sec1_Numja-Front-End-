import React from 'react'
import Head from 'next/head'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import WithLink from './withLink'
import NavItems from './nav-items'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }),
)

const links = [
  { href: '/help', label: 'Help', type: 'item' },
  { href: '/about-us', label: 'About Us', type: 'item' },
  { href: '/sign-up', label: 'Sign Up', type: 'button', variant: 'contained' },
  { href: '/login', label: 'Log In', type: 'button', variant: 'contained' },
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`,
}))

const sidebarItems = [
  { label: 'HOME', href: '/' },
  { label: 'APPOINTMENT', href: '/appointment' },
  { label: 'PROFILE', href: '/profile' },
  { label: 'CHAT', href: '/chat' },
]

export default function WithSidebar({ children, ...otherProps }) {
  const classes = useStyles()

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <NavItems items={links} />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {sidebarItems.map(({ label = '', href = '' }, index) => (
              <ListItem button key={label}>
                <WithLink href={href}>
                  <ListItemText primary={label} />
                </WithLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </>
  )
}
