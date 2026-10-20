import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import UserList from "@/components/UserList";
import PostCard from "@/components/PostCard";
import { useNavigate } from "react-router-dom";
import requestHandler from "@/handlers/requestHandler";

export default function Home() {
  document.title = `${import.meta.env.VITE_TITLE}: Home`;
  const navigate = useNavigate();
  const [followed, setFollowed] = useState([]);
  const [feed, setFeed] = useState([]);
  const [more, setMore] = useState([]);

  useEffect(() => {
    (async () => {
      const [users, posts] = await Promise.all([
        requestHandler.get("user"),
        requestHandler.get("post"),
      ]);
      if (users.data) {
        setFollowed(users.data);
        setMore(users.data);
      }
      if (posts.data) setFeed(posts.data);
    })();
  }, []);

  return (
    <div className={`${styles.homePage} ${pageStyles.default}`}>
      <section className={styles.followed}>
        <h2>Followed users</h2>
        <UserList users={followed} />
      </section>
      <section className={styles.feed}>
        {feed.length ? (
          feed.map((f) => (
            <PostCard
              data={f}
              key={f.id}
              clickHandler={() => navigate("/post", { state: { id: f.id } })}
            />
          ))
        ) : (
          <p className={styles.empty}>No posts yet</p>
        )}
      </section>
      <section className={styles.more}>
        <h2>More users</h2>
        <UserList
          users={more}
          action={{ text: "Follow", icon: <div>...</div> }}
        />
      </section>
    </div>
  );
}
