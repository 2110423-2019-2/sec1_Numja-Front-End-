import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import NavItems from './nav-items'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
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

const WithNav = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <NavItems items={links} />
        </AppBar>
      </div>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </div>

      <style jsx>{`
        * {
          font-family: 'Roboto', sans-serif;
        }
        nav {
          margin-bottom: 110px;
        }
      `}</style>
    </>
  )
}

export default WithNav
