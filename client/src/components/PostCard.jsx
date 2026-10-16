import styles from "./styles/PostCard.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Image from "./Image";

export default function PostCard({ data, clickHandler = () => {} }) {
  const navigate = useNavigate();

  return (
    <div className={styles.post} onClick={() => clickHandler()}>
      <div className={styles.user}>
        <Avatar src={data.user.image} alt={data.user.name} />
        <span
          className={styles.username}
          onClick={(event) => {
            navigate("/profile", { state: { id: data.user.id } });
            event.stopPropagation();
          }}
        >
          @{data.user.username}
        </span>
      </div>
      <p>{data.content}</p>
      {data.image && (
        <Image src={data.image} alt="post's image" className={styles.image} />
      )}

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
