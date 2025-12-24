import styles from './Landing.module.css';

function Landing() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Election Monitoring System...</h1>
      </header>
      <p className={styles.description}>Developed a system to monitor elections...</p>
      <section className={styles.rolesSection}>
        <h2 className={styles.rolesTitle}>User Roles & Responsibilities</h2>
        <div className={styles.rolesGrid}>
          <div className={styles.roleCard}>...</div>
          {/* other cards */}
        </div>
      </section>
    </div>
  );
}

export default Landing;