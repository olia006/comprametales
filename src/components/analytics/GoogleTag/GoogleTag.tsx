interface GoogleTagProps {
  googleAdsId: string;
}

export const GoogleTag: React.FC<GoogleTagProps> = ({ googleAdsId }) => {
  return (
    <>
      {/* Google tag (gtag.js) */}
      {/* eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
      />
      {/* eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAdsId}');
          `,
        }}
      />
    </>
  );
};
