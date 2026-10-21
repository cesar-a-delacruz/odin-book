import styles from "./styles/UserList.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { fetchData } from "@/utils/js/fetchData";
import { use } from "react";

export default function UserList({ endpoint, action }) {
  const navigate = useNavigate();
  const users = use(fetchData(endpoint));

  return (
    <div className={styles.container}>
      {users.data.map((user) => (
        <div
          className={styles.user}
          key={user.id}
          onClick={() => navigate("/profile", { state: { id: user.id } })}
        >
          <Avatar src={user.image} alt={user.name} />
          <div className={styles.text}>
            <span className={styles.username}>@{user.username}</span>
            <span className={styles.bio}>{user.bio}</span>
          </div>
          {action && (
            <div
              className={styles.action}
              onClick={(event) => {
                action.handler();
                event.stopPropagation();
              }}
            >
              {action.icon}
              <span>{action.text}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
