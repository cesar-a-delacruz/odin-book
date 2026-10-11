import styles from "./styles/CommentList.module.css";
import Avatar from "./Avatar";

export default function CommentList({ comments }) {
  return (
    <div className={styles.container}>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <Avatar src={comment.user.image} alt={comment.user.name} />
          <div className={styles.text}>
            <span className={styles.username}>@{comment.user.username}</span>
            <p className={styles.content}>{comment.content}</p>
            <span className={styles.date}>{comment.createdAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
