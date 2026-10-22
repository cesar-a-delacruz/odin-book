import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Profile.module.css";
import { Suspense, use, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from "@/fieldsets/postFieldsets";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import UserCard from "@/components/UserCard";
import TextForm from "@/components/TextForm";
import Loader from "@/components/Loader";
import { fetchData } from "@/utils/js/fetchData";

export default function Profile() {
  document.title = `${import.meta.env.VITE_TITLE}: Profile`;
  const navigate = useNavigate();
  const locationState = useLocation().state;

  const initialPosts = use(fetchData(`post/user/${locationState.id}`));
  if (initialPosts.error) throw Error(initialPosts.error);
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className={`${styles.profilePage} ${pageStyles.default}`}>
      <section className={styles.user}>
        <Suspense fallback={<Loader loadingText={"Loading user..."} />}>
          <UserCard endpoint={`user/${locationState.id}`} />
        </Suspense>
      </section>

      <section className={styles.posts}>
        <TextForm
          fields={create[0].fields}
          initialData={{}}
          actions={[{ icon: "..." }]}
        />
        {posts.data.map((p) => (
          <PostCard
            data={p}
            key={p.id}
            clickHandler={() => navigate("/post", { state: { id: p.id } })}
          />
        ))}
      </section>

      <section className={styles.comments}>
        <h2>Recent comments</h2>
        <Suspense fallback={<Loader loadingText={"Loading comments..."} />}>
          <CommentList endpoint={`comment/user/${locationState.id}`} />
        </Suspense>
      </section>
    </div>
  );
}
