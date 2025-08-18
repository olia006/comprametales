import { Layout } from '@/components/layout/Layout/Layout';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { SEOHead } from '@/components/seo/SEOHead/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav/BreadcrumbNav';
import { BackToTop } from '@/components/ui/BackToTop/BackToTop';
import styles from './page.module.css';

export default function TerminosPage() {
  return (
    <Layout>
      <SEOHead 
        title="Términos y Condiciones - KONSTANDER Lampa"
        description="Términos y condiciones de servicio de KONSTANDER. Conoce las condiciones para la compra y venta de metales y chatarra en Chile."
        canonical="https://konstander.cl/terminos"
        keywords="términos condiciones, servicio, KONSTANDER, compra metales, Chile"
      />
      
      <BreadcrumbNav 
        items={[
          { name: 'Inicio', href: '/' },
          { name: 'Términos y Condiciones', href: '/terminos' }
        ]}
      />
      
      <PageHero
        title="Términos y Condiciones"
        subtitle="Condiciones de Servicio"
        description="Estos términos y condiciones rigen el uso de nuestros servicios de compra y venta de metales y chatarra."
        backgroundType="minimal"
        size="sm"
      />
      
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Información de la Empresa</h2>
            <p>
              KONSTANDER, RUT [Tu RUT], con domicilio en Panamericana Norte 17110, Lampa, 
              Región Metropolitana, Chile, es una empresa dedicada a la compra y procesamiento 
              de metales y chatarra.
            </p>
            <p>
              Estos términos y condiciones regulan la prestación de nuestros servicios y 
              constituyen un acuerdo vinculante entre KONSTANDER y nuestros clientes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Servicios Ofrecidos</h2>
            <p>KONSTANDER ofrece los siguientes servicios:</p>
            <ul>
              <li>Compra de metales ferrosos y no ferrosos</li>
              <li>Adquisición de chatarra industrial y doméstica</li>
              <li>Evaluación y pesaje de materiales</li>
              <li>Pago inmediato por materiales aceptados</li>
              <li>Asesoría en clasificación de metales</li>
              <li>Servicio de retiro de materiales (según disponibilidad)</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Condiciones de Compra</h2>
            <h3>3.1 Materiales Aceptados:</h3>
            <ul>
              <li>Metales ferrosos: hierro, acero, fundición</li>
              <li>Metales no ferrosos: cobre, aluminio, bronce, latón</li>
              <li>Materiales especiales: acero inoxidable, plomo, zinc</li>
              <li>Chatarra industrial y doméstica limpia</li>
            </ul>

            <h3>3.2 Requisitos para la Venta:</h3>
            <ul>
              <li>Presentar cédula de identidad vigente</li>
              <li>Cantidad mínima: 50 kg por transacción</li>
              <li>Materiales limpios y separados por tipo</li>
              <li>Comprobante de procedencia cuando sea requerido</li>
              <li>Cumplir con las normativas ambientales vigentes</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Precios y Pagos</h2>
            <h3>4.1 Determinación de Precios:</h3>
            <ul>
              <li>Los precios se basan en las cotizaciones internacionales del día</li>
              <li>Varían según el tipo, calidad y cantidad del material</li>
              <li>Se actualizan diariamente según condiciones del mercado</li>
              <li>Están sujetos a evaluación y clasificación en planta</li>
            </ul>

            <h3>4.2 Modalidades de Pago:</h3>
            <ul>
              <li>Pago en efectivo inmediato</li>
              <li>Transferencia bancaria (para montos altos)</li>
              <li>Emisión de factura o boleta según corresponda</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Proceso de Evaluación</h2>
            <p>El proceso de evaluación y compra incluye:</p>
            <ul>
              <li>Inspección visual de los materiales</li>
              <li>Clasificación según tipo y calidad</li>
              <li>Pesaje en balanza certificada</li>
              <li>Aplicación de precios vigentes</li>
              <li>Cálculo del pago final</li>
              <li>Registro de la transacción</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Materiales No Aceptados</h2>
            <p>KONSTANDER se reserva el derecho de rechazar:</p>
            <ul>
              <li>Materiales contaminados con sustancias químicas</li>
              <li>Recipientes que hayan contenido combustibles</li>
              <li>Materiales radiactivos o peligrosos</li>
              <li>Cables con aislación de plomo</li>
              <li>Materiales de procedencia dudosa o ilegal</li>
              <li>Materiales que no cumplan con normativas ambientales</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Responsabilidades del Cliente</h2>
            <p>El cliente se compromete a:</p>
            <ul>
              <li>Proporcionar información veraz sobre los materiales</li>
              <li>Asegurar la procedencia legal de los materiales</li>
              <li>Cumplir con las normativas ambientales</li>
              <li>Presentar documentación requerida</li>
              <li>Respetar las normas de seguridad en nuestras instalaciones</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>8. Limitaciones de Responsabilidad</h2>
            <p>
              KONSTANDER no se hace responsable por:
            </p>
            <ul>
              <li>Fluctuaciones en los precios internacionales de metales</li>
              <li>Daños a vehículos en nuestras instalaciones</li>
              <li>Pérdida de materiales no reclamados en 30 días</li>
              <li>Variaciones en el peso debido a humedad o contaminantes</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>9. Horarios y Ubicación</h2>
            <p>
              <strong>Horarios de Atención:</strong> Lunes a Domingo de 8:00 a 18:00 hrs.
            </p>
            <p>
              <strong>Ubicación:</strong> Panamericana Norte 17110, Lampa, Región Metropolitana
            </p>
            <p>
              <strong>Teléfono:</strong> +56 9 3772 0208
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Normativa Aplicable</h2>
            <p>
              Estos términos se rigen por la legislación chilena, incluyendo:
            </p>
            <ul>
              <li>Código Civil chileno</li>
              <li>Ley del Consumidor (Ley N° 19.496)</li>
              <li>Normativas ambientales vigentes</li>
              <li>Regulaciones sobre metales y reciclaje</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>11. Modificaciones</h2>
            <p>
              KONSTANDER se reserva el derecho de modificar estos términos y condiciones 
              en cualquier momento. Los cambios serán publicados en nuestro sitio web 
              y entrarán en vigor inmediatamente.
            </p>
          </section>

          <section className={styles.section}>
            <h2>12. Contacto y Resolución de Controversias</h2>
            <p>
              Para consultas, reclamos o resolución de controversias, puedes contactarnos:
            </p>
            <div className={styles.contactInfo}>
              <p><strong>Email:</strong> info@konstander.cl</p>
              <p><strong>Teléfono:</strong> +56 9 3772 0208</p>
              <p><strong>Dirección:</strong> Panamericana Norte 17110, Lampa, Región Metropolitana</p>
            </div>
            <p>
              Las controversias serán resueltas de acuerdo con la legislación chilena 
              y sometidas a la jurisdicción de los tribunales competentes de Santiago.
            </p>
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
