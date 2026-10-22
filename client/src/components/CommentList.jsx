import styles from "./styles/CommentList.module.css";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import Avatar from "./Avatar";
import { fetchData } from "@/utils/js/fetchData";

export default function CommentList({ endpoint, sendToPost = true }) {
  const navigate = useNavigate();
  const comments = use(fetchData(endpoint));
  if (comments.error) throw Error(comments.error);

  return (
    <div className={styles.container}>
      {comments.data.map((comment) => (
        <div
          className={styles.comment}
          key={comment.id}
          onClick={() => {
            if (!sendToPost) return;
            navigate("/post", { state: { id: comment.postId } });
          }}
        >
          <Avatar src={comment.user.image} alt={comment.user.username} />
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
      ))}
    </div>
  );
}
