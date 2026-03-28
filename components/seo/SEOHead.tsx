import Head from "next/head";
import { useRouter } from "next/router";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hodl-watch.vercel.app";

const DEFAULT_TITLE = "Mesh: Web3 data explorer";
const DEFAULT_DESCRIPTION = "Web3 data explorer";
const DEFAULT_PREVIEW = `${SITE_ORIGIN}/assets/assets-page.png`;

interface SEOHeadProps {
  isHomePage?: boolean;
  metaTitle: string;
  metaDescription: string;
  previewImage?: string;
}

const SEOHead = ({
  isHomePage = false,
  metaTitle,
  metaDescription,
  previewImage,
}: SEOHeadProps) => {
  const router = useRouter();
  const { pathname } = router;

  const title = metaTitle?.trim() ? metaTitle : DEFAULT_TITLE;
  const description = metaDescription ?? DEFAULT_DESCRIPTION;
  const trimmedPreview = previewImage?.trim() ?? "";
  const ogImage =
    trimmedPreview !== ""
      ? trimmedPreview.startsWith("http")
        ? trimmedPreview
        : `${SITE_ORIGIN}${
            trimmedPreview.startsWith("/")
              ? trimmedPreview
              : `/${trimmedPreview}`
          }`
      : DEFAULT_PREVIEW;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />

      <title>{title}</title>
      {isHomePage ? (
        <>
          <meta
            name="google-site-verification"
            content="sYZ6VaJuOfDFRSGlLK4-ISx-yHIfZVRdiEK6RXh3eUM"
          />
          <meta
            name="ahrefs-site-verification"
            content="36afae7f6a8e6e641fd27c84b465e990d8323de93402b68c2c27779626abd7b1"
          />
        </>
      ) : null}

      <meta
        property="og:url"
        content={`https://hodl-watch.vercel.app${pathname}`}
      />

      <meta property="og:type" content="website" />

      <meta property="og:title" content={title} />

      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
    </Head>
  );
};

export default SEOHead;
