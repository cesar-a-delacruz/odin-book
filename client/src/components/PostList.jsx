import styles from "./styles/PostList.module.css";
import Avatar from "./Avatar";

export default function PostList({ posts }) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.user}>
            <Avatar src={post.user.image} alt={post.user.name} />
            <span className={styles.username}>@{post.user.username}</span>
          </div>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="post's image" />}
          <div className={styles.footer}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div>...</div>
                <span>{post.likes}</span>
              </div>
              <div className={styles.stat}>
                <div>...</div>
                <span>{post.comments}</span>
              </div>
            </div>
            <span className={styles.date}>{post.createdAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
