import styles from "./styles/UserCard.module.css";
import Image from "./Image";

export default function UserCard({ data }) {
  return (
    <>
      <div className={styles.user}>
        <Image
          src={data.image}
          alt={`${data.name}'s avatar`}
          className={styles.image}
        />
        <span className={styles.username}>@{data.username}</span>
        <span className={styles.name}>{data.name}</span>
        {data.bio && <p>{data.bio}</p>}
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.number}>{data.followers}</span>
          <span className={styles.text}>followers</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.number}>{data.following}</span>
          <span className={styles.text}>following</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.number}>{data.posts}</span>
          <span className={styles.text}>posts</span>
        </div>
      </div>
    </>
  );
}
