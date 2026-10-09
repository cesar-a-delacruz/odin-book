import styles from "./styles/Avatar.module.css";

export default function Avatar({ src, alt }) {
  return <img className={styles.avatar} src={src} alt={`${alt}'s avatar`} />;
}
