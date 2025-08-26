import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import styles from './page.module.css';

export const metadata = {
  title: 'Política de Privacidad - KONSTANDER Lampa',
  description: 'Política de privacidad de KONSTANDER. Conoce cómo protegemos y utilizamos tus datos personales de acuerdo con la legislación chilena.',
  keywords: 'política privacidad, protección datos, KONSTANDER, Chile, ley datos personales',
  openGraph: {
    title: 'Política de Privacidad - KONSTANDER Lampa',
    description: 'Política de privacidad de KONSTANDER. Conoce cómo protegemos y utilizamos tus datos personales de acuerdo con la legislación chilena.',
    url: 'https://comprametales.cl/privacidad',
    siteName: 'Konstander SpA',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/images/konstander-chatarra-metales-twittercard.webp',
        width: 1200,
        height: 474,
        alt: 'Política de Privacidad KONSTANDER',
      },
    ],
  },
};

export default function PrivacidadPage() {
  return (
    <Layout>
      <SEOHead 
        title="Política de Privacidad - KONSTANDER Lampa"
        description="Política de privacidad de KONSTANDER. Conoce cómo protegemos y utilizamos tus datos personales de acuerdo con la legislación chilena."
        canonical="https://comprametales.cl/privacidad"
        keywords="política privacidad, protección datos, KONSTANDER, Chile, ley datos personales"
      />
      
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Política de Privacidad', href: '/privacidad' }
        ]}
      />
      
      <PageHero
        title="Política de Privacidad"
        subtitle="Protección de Datos Personales"
        description="En KONSTANDER respetamos tu privacidad y nos comprometemos a proteger tus datos personales de acuerdo con la legislación chilena vigente."
        backgroundType="minimal"
        size="sm"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Información General</h2>
            <p>
              KONSTANDER, RUT [Tu RUT], con domicilio en Panamericana Norte 17110, Lampa, 
              Región Metropolitana, Chile, es responsable del tratamiento de los datos personales 
              que nos proporciones a través de nuestros servicios.
            </p>
            <p>
              Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y 
              protegemos tu información personal de acuerdo con la Ley N° 19.628 sobre Protección 
              de la Vida Privada de Chile.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Datos Personales que Recopilamos</h2>
            <h3>2.1 Información que nos proporcionas directamente:</h3>
            <ul>
              <li>Nombre completo y RUT</li>
              <li>Dirección de contacto</li>
              <li>Número de teléfono</li>
              <li>Correo electrónico</li>
              <li>Información sobre los materiales que deseas vender</li>
            </ul>
            
            <h3>2.2 Información recopilada automáticamente:</h3>
            <ul>
              <li>Dirección IP</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas en nuestro sitio web</li>
              <li>Fecha y hora de las visitas</li>
              <li>Cookies y tecnologías similares</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Finalidad del Tratamiento</h2>
            <p>Utilizamos tus datos personales para:</p>
            <ul>
              <li>Proporcionar nuestros servicios de compra de metales y chatarra</li>
              <li>Procesar transacciones y pagos</li>
              <li>Comunicarnos contigo sobre nuestros servicios</li>
              <li>Enviar cotizaciones y información sobre precios</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
              <li>Mejorar nuestros servicios y experiencia del cliente</li>
              <li>Fines estadísticos y de análisis</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Compartir Información</h2>
            <p>
              No vendemos, alquilamos ni compartimos tus datos personales con terceros, 
              excepto en los siguientes casos:
            </p>
            <ul>
              <li>Cuando sea requerido por ley o autoridades competentes</li>
              <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
              <li>En caso de fusión, adquisición o venta de activos</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Seguridad de la Información</h2>
            <p>
              Implementamos medidas de seguridad técnicas, administrativas y físicas 
              apropiadas para proteger tus datos personales contra acceso no autorizado, 
              alteración, divulgación o destrucción.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Tus Derechos</h2>
            <p>De acuerdo con la legislación chilena, tienes derecho a:</p>
            <ul>
              <li>Conocer qué datos personales tenemos sobre ti</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tus datos (cuando sea legalmente posible)</li>
              <li>Oponerte al tratamiento de tus datos para fines específicos</li>
              <li>Revocar tu consentimiento cuando sea la base legal del tratamiento</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Retención de Datos</h2>
            <p>
              Mantenemos tus datos personales durante el tiempo necesario para cumplir 
              con las finalidades descritas en esta política y de acuerdo con las 
              obligaciones legales aplicables.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. 
              Puedes configurar tu navegador para rechazar las cookies, aunque esto 
              puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente. 
              Te notificaremos sobre cambios significativos publicando la nueva 
              política en nuestro sitio web.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer 
              tus derechos, puedes contactarnos:
            </p>
            <div className={styles.contactInfo}>
              <p><strong>Email:</strong> info@comprametales.cl</p>
              <p><strong>Teléfono:</strong> +56 9 5514 5437</p>
              <p><strong>Dirección:</strong> Panamericana Norte 17110, Lampa, Región Metropolitana</p>
            </div>
            <p className={styles.lastUpdated}>
              <strong>Última actualización:</strong> Diciembre 2024
            </p>
          </section>
        </div>
      </div>
      
      <BackToTop />
    </Layout>
  );
}
