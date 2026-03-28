import type { ClientSafeProvider } from "next-auth/react";
import { signIn } from "next-auth/react";
import {
  FaCoins,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import styled from "styled-components";

interface ProvidersAsProps {
  providers: Record<string, ClientSafeProvider> | null;
  isSubmitDisabled?: boolean;
}

const ProviderContainer = ({
  providers,
  isSubmitDisabled,
}: ProvidersAsProps) => {
  const selectIcon = (name: string | undefined) => {
    switch (name) {
      case "GitHub":
        return <FaGithub size={28} data-testid="login-github" />;
      case "Google":
        return <FaGoogle size={28} data-testid="login-google" />;
      case "Facebook":
        return <FaFacebook size={28} data-testid="login-facebook" />;
      case "Twitter":
        return <FaTwitter size={28} data-testid="login-twitter" />;
      case "Coinbase":
        return <FaCoins size={28} data-testid="login-coinbase" />;
      default:
        return <div data-testid="login-na">N/A</div>;
    }
  };

  return (
    <ButtonContainer>
      {providers &&
        Object.values(providers).map(
          (provider) =>
            provider.name !== "Credentials" && (
              <div key={provider.name}>
                <ProviderButton
                  disabled={isSubmitDisabled}
                  onClick={() => {
                    void signIn(provider.id, {
                      redirect: true,
                      callbackUrl: "/",
                    });
                  }}
                  type="button"
                >
                  <div className="button-content">
                    {selectIcon(provider?.name)}
                  </div>
                </ProviderButton>
              </div>
            )
        )}
    </ButtonContainer>
  );
};

const ProviderButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 2px 4px 8px gray;

  .button-content {
    display: flex;
    white-space: nowrap;
    gap: 1rem;
    padding: 0.5rem 0.5rem;
  }

  :hover {
    background-color: white;
    color: black;
  }

  :disabled {
    background-color: white;
    color: black;
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  white-space: nowrap;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
`;

export default ProviderContainer;
