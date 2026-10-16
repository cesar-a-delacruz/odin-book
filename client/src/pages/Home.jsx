import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import dbFaker from "@/api/dbFaker";
import UserList from "@/components/UserList";
import PostCard from "@/components/PostCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  document.title = `${import.meta.env.VITE_TITLE}: Home`;
  const navigate = useNavigate();
  const [followed, setFollowed] = useState([]);
  const [feed, setFeed] = useState([]);
  const [more, setMore] = useState([]);

  useEffect(() => {
    (async () => {
      const db = await dbFaker();
      setFollowed(db.users);
      const posts = db.posts.map((p) => {
        p.user = db.users.find((u) => u.id === p.userId);
        p.likes = db.likes.filter((l) => l.postId === p.id).length;
        p.comments = db.comments.filter((c) => c.postId === p.id).length;
        return p;
      });
      setFeed(posts);
      setMore(db.users);
    })();
  }, []);

  return (
    <div className={styles.homePage}>
      <div className={styles.followed}>
        <h2>Followed users</h2>
        <UserList users={followed} />
      </div>
      <div className={styles.feed}>
        {feed.map((f) => (
          <PostCard
            data={f}
            key={f.id}
            clickHandler={() => navigate("/post", { state: { id: f.id } })}
          />
        ))}
      </div>
      <div className={styles.more}>
        <h2>More users</h2>
        <UserList
          users={more}
          action={{ text: "Follow", icon: <div>...</div> }}
        />
      </div>
    </div>
  );
}
