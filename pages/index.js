import { Padding } from "@/styles/variables";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import styled from "styled-components";

import SEOHead from "../components/seo/SEOHead";

const MapLoading = () => <p>A map is loading</p>;

/**
 * Landing page with map widget.
 */
export default function Home() {
  const MapView = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: MapLoading,
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
        <MapView />
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

export async function getServerSideProps() {
  return { props: {} };
}
