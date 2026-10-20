import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Profile.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "@/fieldsets/postFieldsets";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import UserCard from "@/components/UserCard";
import TextForm from "@/components/TextForm";
import requestHandler from "@/handlers/requestHandler";

export default function Profile() {
  document.title = `${import.meta.env.VITE_TITLE}: Profile`;
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const [profile, setProfile] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);
  const [recentComments, setRecentComments] = useState([]);

  useEffect(() => {
    (async () => {
      const [user, posts, comments] = await Promise.all([
        requestHandler.get(`user/${locationState.id}`),
        requestHandler.get(`post/user/${locationState.id}`),
        requestHandler.get(`comment/user/${locationState.id}`),
      ]);

      if (user.data) setProfile(user.data);
      if (posts.data) setProfilePosts(posts.data);
      if (comments.data) setRecentComments(comments.data);
    })();
  }, []);

  return (
    <div className={`${styles.profilePage} ${pageStyles.default}`}>
      <section className={styles.user}>
        {Object.keys(profile).length ? <UserCard data={profile} /> : ""}
      </section>
      <section className={styles.posts}>
        <TextForm
          fields={create[0].fields}
          initialData={{}}
          actions={[{ icon: "..." }]}
        />
        {profilePosts.length ? (
          profilePosts.map((p) => (
            <PostCard
              data={p}
              key={p.id}
              clickHandler={() => navigate("/post", { state: { id: p.id } })}
            />
          ))
        ) : (
          <p className={styles.empty}>No posts yet</p>
        )}
      </section>
      <section className={styles.comments}>
        <h2>Recent comments</h2>
        <CommentList comments={recentComments} />
      </section>
    </div>
  );
}
