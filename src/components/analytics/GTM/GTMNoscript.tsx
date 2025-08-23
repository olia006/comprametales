import styles from './GTMNoscript.module.css';

interface GTMNoscriptProps {
  gtmId: string;
}

export const GTMNoscript: React.FC<GTMNoscriptProps> = ({ gtmId }) => {
  return (
    /* GTM Noscript - Must be immediately after opening body tag */
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        className={styles.gtmIframe}
        title="Google Tag Manager"
      />
    </noscript>
  );
};
