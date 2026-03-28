import { Colors, MediaQueries } from "@/styles/variables";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styled from "styled-components";

const Footer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const id =
    session?.user &&
    ("id" in session.user ? session.user.id : session.user.email);

  const routerToProfile = (manage: boolean) => {
    if (id && manage) {
      router.push(`/user/${String(id)}?view=edit_user`);
    } else if (id) {
      router.push(`/user/${String(id)}`);
    } else {
      router.push("/auth?path=SignUp");
    }
  };

  return (
    <FooterContainer>
      <div className="text-column">
        <InfoColumnsContainer>
          <div className="info-column">
            <h4>News & Info</h4>

            <Link href="/news" className="footer-link">
              Newsfeed
            </Link>

            <Link href="/terms-of-service" className="footer-link">
              Terms of Service
            </Link>
          </div>
          <div className="info-column">
            <h4>Resources</h4>

            <Link href="/assets" className="footer-link">
              Assets
            </Link>

            <Link href="/education" className="footer-link">
              Education
            </Link>
          </div>
          <div className="info-column">
            <h4>Users</h4>
            <FooterTextButton
              type="button"
              onClick={() => routerToProfile(false)}
            >
              Profile
            </FooterTextButton>
            <FooterTextButton
              type="button"
              onClick={() => routerToProfile(true)}
            >
              Manage Account
            </FooterTextButton>
          </div>
        </InfoColumnsContainer>

        <div className="social-row">
          <FaInstagram size={36} aria-hidden />
          <FaFacebook size={36} aria-hidden />
          <FaTwitter size={36} aria-hidden />
        </div>
      </div>
    </FooterContainer>
  );
};

const FooterTextButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
`;

const InfoColumnsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  justify-content: center;
  padding-top: 2rem;

  @media ${MediaQueries.MD} {
    gap: 9rem;
  }

  .info-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-link {
    color: white;
    text-decoration: none;
  }

  .footer-link:hover {
    text-decoration: underline;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  background: ${Colors.midnight};

  color: white;
  padding: 2rem 2rem;
  border-top: 2px solid gray;

  .text-column {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    h4 {
      font-weight: bold;
    }

    h6 {
      color: white;
    }
  }

  .social-row {
    padding-top: 2rem;
    display: flex;
    flex-direction: row;
    gap: 3rem;
  }
`;

export default Footer;
