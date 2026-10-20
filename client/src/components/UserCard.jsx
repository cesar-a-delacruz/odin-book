import styles from "./styles/UserCard.module.css";
import Image from "./Image";

export default function UserCard({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={data.image}
          alt={`${data.name}'s avatar`}
          className={styles.image}
        />
        <span className={styles.username}>@{data.username}</span>
        <span className={styles.fullname}>{data.fullname}</span>
        {data.bio && <p>{data.bio}</p>}
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.number}>{data._count.followers}</span>
          <span className={styles.text}>followers</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.number}>{data._count.users}</span>
          <span className={styles.text}>following</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.number}>{data._count.posts}</span>
          <span className={styles.text}>posts</span>
        </div>
      </div>
    </div>
  );
}
