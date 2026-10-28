import componentStyles from "@/utils/css/modules/listComponent.module.css";
import styles from "./styles/UserList.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { fetchData } from "@/utils/js/fetchData";
import { use, useState } from "react";
import requestHandler from "@/handlers/requestHandler";

export default function UserList({ endpoint, action }) {
  const navigate = useNavigate();
  const initialUsers = use(fetchData(endpoint));
  if (initialUsers.error) throw Error(initialUsers.error);
  const [users, setUsers] = useState(initialUsers);

  return (
    <div className={`${styles.list} ${componentStyles.container}`}>
      <div className={`${styles.users} ${componentStyles.items}`}>
        {users.data.map((user) => (
          <div
            className={`${styles.user} ${componentStyles.item}`}
            key={user.id}
            onClick={() => navigate("/profile", { state: { id: user.id } })}
          >
            <Avatar src={user.image} alt={user.username} />
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

      <p
        className={componentStyles.loader}
        onClick={async () => {
          const more = await requestHandler.get(
            `${endpoint}?q=${users.data[users.data.length - 1].id}`,
          );
          if (more.error) return alert(more.error);

          setUsers((prev) => {
            const newUsers = structuredClone(prev);
            newUsers.data = [...newUsers.data, ...more.data];
            return newUsers;
          });
        }}
      >
        Load more
      </p>
    </div>
  );
}
