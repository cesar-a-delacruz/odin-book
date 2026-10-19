import styles from "./styles/Profile.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dbFaker from "@/api/dbFaker";
import { create } from "@/fieldsets/postFieldsets";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import UserCard from "@/components/UserCard";
import TextForm from "@/components/TextForm";

export default function Profile() {
  document.title = `${import.meta.env.VITE_TITLE}: Profile`;
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const db = await dbFaker();
      const dbUser = locationState
        ? db.users.find((u) => u.id === locationState.id)
        : db.users[0];
      dbUser.followers = 0;
      dbUser.following = 0;
      db.followers.forEach((f) => {
        if (f.userId === dbUser.id) dbUser.followers++;
        if (f.id === dbUser.id) dbUser.following++;
      });
      const posts = db.posts.filter((p) => {
        const belongsToUser = p.userId === dbUser.id;
        if (belongsToUser) {
          p.user = dbUser;
          p.likes = db.likes.filter((l) => l.postId === p.id).length;
          p.comments = db.comments.filter((c) => c.postId === p.id).length;
        }
        return belongsToUser;
      });
      dbUser.posts = posts.length;
      setUser(dbUser);
      setPosts(posts);
      const dbComments = db.comments.filter((c) => {
        const belongsToUser = c.userId === dbUser.id;
        if (belongsToUser) c.user = dbUser;
        return belongsToUser;
      });
      setComments(dbComments);
    })();
  }, []);

  return (
    <div className={styles.profilePage}>
      <section className={styles.user}>
        <UserCard data={user} />
      </section>
      <section className={styles.posts}>
        <TextForm
          fields={create[0].fields}
          initialData={{}}
          actions={[{ icon: "..." }]}
        />
        {posts.length ? (
          posts.map((f) => (
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
      <section className={styles.comments}>
        <h2>Recent comments</h2>
        <CommentList comments={comments} />
      </section>
    </div>
  );
}
