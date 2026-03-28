import {
  Colors,
  FontFamily,
  FontWeight,
  MediaQueries,
} from "@/styles/variables";
import styled from "styled-components";

const FeatureGrid = () => {
  return (
    <GridContainer>
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon" />
          <h4>Portfolio Tracking</h4>
          <p>
            Stay on top of your crypto investments with our intuitive portfolio
            tracking feature.
          </p>
          <p>
            Monitor real-time prices, performance, and allocation across
            multiple assets.
          </p>
          <p>
            Visualize your portfolio growth and make data-driven decisions with
            ease.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon" />
          <h4>Comprehensive Metrics</h4>
          <p>
            Dive deep into financial and on-chain metrics to gain valuable
            insights into crypto assets.
          </p>
          <p>
            Analyze price movements, market capitalization, trading volume, and
            more.
          </p>
          <p>
            Evaluate token fundamentals and historical data to make informed
            investment choices.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon" />
          <h4>Social Community</h4>
          <p>
            Connect with a vibrant community of crypto enthusiasts and
            investors.
          </p>
          <p>
            Engage in discussions, share knowledge, and stay updated on the
            latest trends.
          </p>
          <p>
            Foster valuable connections, collaborate on projects, and explore
            new opportunities.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon" />
          <h4>News and Updates</h4>
          <p>
            Access a curated feed of crypto news, articles, and market updates
            in real-time.
          </p>
          <p>
            Stay informed about industry developments, regulatory changes, and
            market trends.
          </p>
          <p>
            Get a holistic view of the crypto ecosystem and make informed
            decisions based on the latest information.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon" />
          <h4>User-friendly Interface</h4>
          <p>
            Enjoy a sleek and intuitive interface designed for seamless user
            experience.
          </p>
          <p>
            Navigate effortlessly through the apps features and access
            information with ease.
          </p>
          <p>
            Experience the power of crypto in a user-friendly environment that
            simplifies complex concepts.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon" />
          <h4>Security and Privacy</h4>
          <p>
            Rest assured knowing that your data and assets are protected with
            robust security measures.
          </p>
          <p>
            Safeguard your privacy and maintain full control over your personal
            information.
          </p>
          <p>
            Mesh prioritizes the security and confidentiality of your crypto
            journey.
          </p>
        </div>
      </div>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.lightGray};
  padding: 36px 14px;
  text-align: center;

  h3 {
    align-self: center;
    font-weight: ${FontWeight.bold};
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 24px;
    margin-top: 24px;

    @media ${MediaQueries.MD} {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
  }
  .feature-card {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 32px;
    font-family: ${FontFamily.secondary};
    border-radius: 12px;
    box-shadow: 0px 2px 12px ${Colors.darkGray};
    position: relative;
    text-align: center;
    border: 2px solid ${Colors.accentBlue};

    h4 {
      font-weight: ${FontWeight.bold};
      padding: 0 0 12px 0;
    }

    .card-background {
      padding: 24px 0;
    }
  }
`;

export default FeatureGrid;
