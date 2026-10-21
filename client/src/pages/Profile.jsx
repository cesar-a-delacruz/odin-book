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
import Loader from "@/components/Loader";

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

      setProfile(user);
      setProfilePosts(posts);
      setRecentComments(comments);
    })();
  }, []);

  return (
    <div className={`${styles.profilePage} ${pageStyles.default}`}>
      <section className={styles.user}>
        {profile.data ? (
          <UserCard data={profile.data} />
        ) : (
          <Loader loadingText={"Loading user..."} errorText={profile.error} />
        )}
      </section>
      <section className={styles.posts}>
        <TextForm
          fields={create[0].fields}
          initialData={{}}
          actions={[{ icon: "..." }]}
        />
        {profilePosts.data ? (
          profilePosts.data.map((p) => (
            <PostCard
              data={p}
              key={p.id}
              clickHandler={() => navigate("/post", { state: { id: p.id } })}
            />
          ))
        ) : (
          <Loader
            loadingText={"Loading posts..."}
            errorText={profilePosts.error}
          />
        )}
      </section>
      <section className={styles.comments}>
        <h2>Recent comments</h2>
        <CommentList comments={recentComments} />
      </section>
    </div>
  );
}
