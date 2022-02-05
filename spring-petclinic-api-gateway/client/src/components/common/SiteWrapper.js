import { Button, Grid, List, Nav, Site } from 'tabler-react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const navBarItems = [
  {
    value: "Home",
    to: "/",
    icon: "home",
    LinkComponent: NavLink,
    useExact: true
  },
  {
    value: "Find Owners",
    to: "/owners/find",
    icon: "search",
    LinkComponent: NavLink,
  },
  {
    value: "Veterinarians",
    to: "/vets",
    icon: "list",
    LinkComponent: NavLink,
    useExact: true
  },
  {
    value: "Error",
    to: "/error",
    icon: "alert-triangle",
    LinkComponent: NavLink,
    useExact: true
  }
];

const FullHeight = styled.div`
  height: 100vh;
`

export function SiteWrapper({ children }) {
  return (
    <FullHeight>
      <Site.Wrapper
        className="d-flex flex-col"
        headerProps={{
          href: "/",
          alt: "Petclinic",
          imageURL: "/images/spring-pivotal-logo.png",
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex">
              <Button
                href="https://github.com/htekgulds/spring-petclinic-microservices-react"
                target="_blank"
                outline
                size="sm"
                RootComponent="a"
                color="primary"
              >
                Source code
              </Button>
            </Nav.Item>
          )
        }}
        navProps={{ itemsObjects: navBarItems }}
        navIsSide={true}
        footerProps={{
          copyright: (
            <>
              Copyright © 2022
              <a href="."> Spring Petclinic</a>. Theme by
              <a
                href="https://codecalm.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                codecalm.net
              </a>{" "}
              All rights reserved.
            </>
          ),
          nav: (
            <>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}>
                <Button
                  href="https://github.com/tabler/tabler-react"
                  size="sm"
                  outline
                  color="primary"
                  RootComponent="a"
                >
                  Source code
                </Button>
              </Grid.Col>
            </>
          ),
        }}
      >
        {children}
      </Site.Wrapper>
    </FullHeight>
  )
}
