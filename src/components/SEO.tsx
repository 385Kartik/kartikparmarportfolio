import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
}

export function SEO({
  title,
  description = "Kartik Parmar is a Full Stack Developer at Numberwale and Founder of Print-It. Explore projects including Uni-Brain, NavRang, AI automation systems, and web applications.",
  name = "Kartik Parmar Portfolio",
  type = "website",
  url = "https://kartikparmarportfolio.vercel.app/",
  image = "https://kartikparmarportfolio.vercel.app/og-image.jpg" // Placeholder for an actual OG image
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
