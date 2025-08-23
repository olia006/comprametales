interface GTMScriptProps {
  gtmId: string;
}

export const GTMScript: React.FC<GTMScriptProps> = ({ gtmId }) => {
  return (
    /* GTM Script - Direct script tag for head placement */
    /* eslint-disable-next-line @next/next/next-script-for-ga */
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
};
