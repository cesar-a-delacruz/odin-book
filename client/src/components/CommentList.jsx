import styles from "./styles/CommentList.module.css";
import { useNavigate } from "react-router-dom";
import { use, useState } from "react";
import Avatar from "./Avatar";
import { fetchData } from "@/utils/js/fetchData";
import requestHandler from "@/handlers/requestHandler";

export default function CommentList({ endpoint, sendToPost = true }) {
  const navigate = useNavigate();
  const initialComments = use(fetchData(endpoint));
  if (initialComments.error) throw Error(initialComments.error);
  const [comments, setComments] = useState(initialComments);

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
      <button
        onClick={async () => {
          const more = await requestHandler.get(
            `${endpoint}?q=${comments.data[comments.data.length - 1].id}`,
          );
          if (more.error) return alert(more.error);

          setComments((prev) => {
            const newComments = structuredClone(prev);
            newComments.data = [...newComments.data, ...more.data];
            return newComments;
          });
        }}
      >
        fetch more
      </button>
    </div>
  );
}
