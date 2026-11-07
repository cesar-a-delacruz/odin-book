import styles from "./styles/UserCard.module.css";
import Image from "./Image";
import { use, useContext } from "react";
import { fetchData, invalidateData } from "@/utils/js/fetchData";
import { PlusIcon } from "lucide-react";
import requestHandler from "@/handlers/requestHandler";
import { AlertContext } from "@/contexts/AlertContext";

export default function UserCard({ endpoint }) {
  const user = use(fetchData(endpoint));
  if (user.error) throw Error(user.error);
  const { setAlert } = useContext(AlertContext);

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

      <button onClick={submitFollower}>
        <PlusIcon /> Follow
      </button>
    </div>
  );

  async function submitFollower() {
    const response = await requestHandler.post(
      { followedId: user.data.id },
      "follower",
    );
    let alert = { text: "User followed successfully.", type: "success" };

    if (response.error) alert = { text: response.error, type: "error" };
    else invalidateData(endpoint);
    setAlert(alert);

    return response;
  }
}
