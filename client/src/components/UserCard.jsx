import styles from "./styles/UserCard.module.css";
import Image from "./Image";
import { use } from "react";
import { fetchData } from "@/utils/js/fetchData";

export default function UserCard({ endpoint }) {
  const user = use(fetchData(endpoint));
  if (user.error) throw Error(user.error);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={user.data.image}
          alt={`${user.data.name}'s avatar`}
          className={styles.image}
        />
        <span className={styles.username}>@{user.data.username}</span>
        <span className={styles.fullname}>{user.data.fullname}</span>
        {user.data.bio && <p>{user.data.bio}</p>}
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.number}>{user.data._count.followed}</span>
          <span className={styles.text}>followers</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.number}>{user.data._count.followers}</span>
          <span className={styles.text}>following</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.number}>{user.data._count.posts}</span>
          <span className={styles.text}>posts</span>
        </div>
      </div>
    </div>
  );
}
