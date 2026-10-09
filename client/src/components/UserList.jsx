import styles from "./styles/UserList.module.css";
import Avatar from "./Avatar";

export default function UserList({ users, action }) {
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <div className={styles.user} key={user.id}>
          <Avatar src={user.image} alt={user.name} />
          <div className={styles.text}>
            <span className={styles.username}>@{user.username}</span>
            <span className={styles.bio}>{user.bio}</span>
          </div>
          {action && (
            <div className={styles.action}>
              {action.icon}
              <span>{action.text}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
