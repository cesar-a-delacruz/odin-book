import styles from "./styles/Post.module.css";
import Avatar from "./Avatar";

export default function Post({ data }) {
  return (
    <div className={styles.post}>
      <div className={styles.user}>
        <Avatar src={data.user.image} alt={data.user.name} />
        <span className={styles.username}>@{data.user.username}</span>
      </div>
      <p>{data.content}</p>
      {data.image && <img src={data.image} alt="post's image" />}
      <div className={styles.footer}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div>...</div>
            <span>{data.likes}</span>
          </div>
          <div className={styles.stat}>
            <div>...</div>
            <span>{data.comments}</span>
          </div>
        </div>
        <span className={styles.date}>{data.createdAt}</span>
      </div>
    </div>
  );
}
