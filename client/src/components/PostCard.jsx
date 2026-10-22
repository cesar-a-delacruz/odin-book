import styles from "./styles/PostCard.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Image from "./Image";
import { MessageSquareTextIcon, ThumbsUpIcon } from "lucide-react";

export default function PostCard({ data, clickHandler = () => {} }) {
  const navigate = useNavigate();

  return (
    <div className={styles.post} onClick={() => clickHandler()}>
      <div
        className={styles.user}
        onClick={(event) => {
          navigate("/profile", { state: { id: data.user.id } });
          event.stopPropagation();
        }}
      >
        <Avatar src={data.user.image} alt={data.user.username} />
        <span className={styles.username}>@{data.user.username}</span>
      </div>
      <p>{data.content}</p>
      {data.image && (
        <Image src={data.image} alt="post's image" className={styles.image} />
      )}

      <div className={styles.footer}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <ThumbsUpIcon />
            <span>{data._count.likes}</span>
          </div>
          <div className={styles.stat}>
            <MessageSquareTextIcon />
            <span>{data._count.comments}</span>
          </div>
        </div>
        <span className={styles.date}>
          {new Date(data.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
