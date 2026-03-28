import { Colors, MediaQueries } from "@/styles/variables";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import styled from "styled-components";

type RouteItem = {
  key: number;
  route: string;
  guarded: boolean;
  text: string;
};

function Header() {
  const { data: session } = useSession();
  const [selectedRoute, setSelectedRoute] = useState<string | number>("");

  const router = useRouter();
  const { asPath } = router;

  const handleSignout = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedRoute("");
    void signOut();
  };

  const userRecord = session?.user as
    | { id?: string; username?: string }
    | undefined;
  const id = userRecord?.id ?? userRecord?.username;

  const routes: (RouteItem | false)[] = [
    ...(id
      ? [
          {
            key: 1,
            route: `/user/${id}`,
            guarded: false,
            text: "Profile",
          },
        ]
      : []),
    { key: 2, route: `/now-playing`, guarded: false, text: "Stream" },
    !session && {
      key: 3,
      route: "/auth?path=SignIn",
      guarded: false,
      text: "Sign In",
    },
  ];

  const routeList = routes.filter((r): r is RouteItem => Boolean(r));

  const setRouterAsPath = useCallback(() => {
    const matchingRoute = routeList.filter((item) =>
      asPath.includes(item.route)
    );

    if (matchingRoute.length > 0) {
      setSelectedRoute(matchingRoute[0].key);
    }
  }, [asPath, routeList]);

  useEffect(() => {
    setRouterAsPath();
  }, [setRouterAsPath]);

  const routeObjects = useMemo(() => {
    if (!routeList.length) return [];

    return routeList.map((route) => (
      <div key={route.route}>
        <TextContainer>
          <NavTextLink href={route.route}>{route.text}</NavTextLink>
          {selectedRoute === route.key ? (
            <span className="active-underline-span" />
          ) : null}
        </TextContainer>
      </div>
    ));
  }, [routeList, selectedRoute]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="navbar-main"
      style={{
        backgroundColor: Colors.midnight,
        color: Colors.white,
        position: "fixed",
        width: "100vw",
        zIndex: 1000,
      }}
    >
      <Container>
        <Navbar.Brand as="div">
          <Link href="/" aria-label="Home">
            <Image
              src={"/assets/cube-svgrepo-com.svg"}
              className={"pointer-link"}
              height={50}
              width={50}
              alt="Home"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <RouteRow>
            {routeObjects}
            {session ? (
              <SignOutButton
                type="button"
                onClick={handleSignout}
                className={"pointer-link fw-bold"}
              >
                <SignOutSpan>Sign Out</SignOutSpan>
              </SignOutButton>
            ) : null}
          </RouteRow>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const NavTextLink = styled(Link)`
  color: ${Colors.white};
  font-weight: bold;
  text-decoration: none;
`;

const SignOutButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const RouteRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: 600;
  text-align: center;
  padding: 12px 0;

  @media ${MediaQueries.MD} {
    flex-direction: row;
    width: 100%;
  }
`;

const SignOutSpan = styled.span`
  color: ${Colors.white};

  @media ${MediaQueries.MD} {
    white-space: nowrap;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  .active-underline-span {
    height: 2px;
    color: ${Colors.accentPurple};
  }
`;

export default Header;
