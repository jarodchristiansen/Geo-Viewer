import { Padding } from "@/styles/variables";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import styled from "styled-components";

import SEOHead from "../components/seo/SEOHead";

/**
 *
 * @param data: Response from GetNewsFeed query, renders the news feed at bottom of landing page
 * @returns Landing page with Info/Sign Up Pages
 */
export default function Home({ data }) {
  const { data: session, status } = useSession();

  let id = session?.user?.id;

  // }
  const position = [51.505, -0.09];
  const zoom = 13;

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <AlternateHomePageWrapper>
      <SEOHead
        isHomePage={true}
        metaTitle="Mesh - GIS Data Viewer"
        metaDescription="View GeoJson and Wkt data on a map."
        previewImage="/assets/assets-page.png"
      />

      <div className="top-row">
        <Map position={position} zoom={zoom} />
      </div>
    </AlternateHomePageWrapper>
  );
}

const AlternateHomePageWrapper = styled.div`
  .top-row {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: ${Padding.xxlarge} 24px;
    align-items: center;
  }
`;

export const getServerSideProps = async (context) => {
  let data = {};

  // const response = await getNewsFeed(); // any async promise here.

  // data = response.data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: data, // will be passed to the page component as props
  };
};
