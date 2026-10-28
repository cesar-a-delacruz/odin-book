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
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";
import { ImagePlusIcon } from "lucide-react";
import requestHandler from "@/handlers/requestHandler";

export default function Profile() {
  document.title = `${import.meta.env.VITE_TITLE}: Profile`;
  const navigate = useNavigate();
  const locationState = useLocation().state;

  const initialPosts = use(fetchData(`post/user/${locationState.id}`));
  if (initialPosts.error) throw Error(initialPosts.error);
  const [posts, setPosts] = useState(initialPosts);

  document.onscroll = async () => {
    if (document.documentElement.scrollTop === 0) return;

    const scrollPostion =
      document.documentElement.clientHeight +
      document.documentElement.scrollTop;
    if (document.documentElement.scrollHeight === parseInt(scrollPostion)) {
      const more = await requestHandler.get(
        `post/user/${locationState.id}?q=${posts.data[posts.data.length - 1].id}`,
      );
      if (more.error) return alert(more.error);

      setPosts((prev) => {
        const newPosts = structuredClone(prev);
        newPosts.data = [...newPosts.data, ...more.data];
        return newPosts;
      });
    }
  };

  return (
    <div className={`${styles.profilePage} ${pageStyles.default}`}>
      <section className={styles.user}>
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <Suspense fallback={<Loader loadingText={"Loading user..."} />}>
            <UserCard endpoint={`user/${locationState.id}`} />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className={styles.posts}>
        <TextForm
          fields={create[0].fields}
          initialData={{}}
          actions={[{ icon: <ImagePlusIcon /> }]}
        />
        {posts.data.length ? (
          posts.data.map((p) => (
            <PostCard
              data={p}
              key={p.id}
              clickHandler={() => navigate("/post", { state: { id: p.id } })}
            />
          ))
        ) : (
          <Loader loadingText={`No post have been found.`} />
        )}
      </section>

      <section className={styles.comments}>
        <h2>Recent comments</h2>
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <Suspense fallback={<Loader loadingText={"Loading comments..."} />}>
            <CommentList endpoint={`comment/user/${locationState.id}`} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}
