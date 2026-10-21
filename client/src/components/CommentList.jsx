import styles from "./styles/CommentList.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Loader from "./Loader";

export default function CommentList({ comments, sendToPost = true }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {comments.data ? (
        comments.data.map((comment) => (
          <div
            className={styles.comment}
            key={comment.id}
            onClick={() => {
              if (!sendToPost) return;
              navigate("/post", { state: { id: comment.postId } });
            }}
          >
            <Avatar src={comment.user.image} alt={comment.user.name} />
            <div className={styles.text}>
              <span
                className={styles.username}
                onClick={(event) => {
                  navigate("/profile", { state: { id: comment.user.id } });
                  event.stopPropagation();
                }}
              >
                @{comment.user.username}
              </span>
              <p className={styles.content}>{comment.content}</p>
              <span className={styles.date}>
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      ) : (
        <Loader
          loadingText={"Loading comments..."}
          errorText={comments.error}
        />
      )}
    </div>
  );
}
