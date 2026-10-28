import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Home.module.css";
import { Suspense, use, useState } from "react";
import UserList from "@/components/UserList";
import PostCard from "@/components/PostCard";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { fetchData } from "@/utils/js/fetchData";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";
import { PlusIcon } from "lucide-react";
import requestHandler from "@/handlers/requestHandler";

export default function Home() {
  document.title = `${import.meta.env.VITE_TITLE}: Home`;
  const navigate = useNavigate();

  const initialPosts = use(fetchData("post"));
  if (initialPosts.error) throw Error(initialPosts.error);
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className={`${styles.homePage} ${pageStyles.default}`}>
      <section className={styles.followed}>
        <h2>Followed users</h2>
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <Suspense fallback={<Loader loadingText={"Loading users..."} />}>
            <UserList endpoint={"follower"} />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className={styles.feed}>
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
        <button
          onClick={async () => {
            const more = await requestHandler.get(
              `post?q=${posts.data[posts.data.length - 1].id}`,
            );
            if (more.error) return alert(more.error);

            setPosts((prev) => {
              const newPosts = structuredClone(prev);
              newPosts.data = [...newPosts.data, ...more.data];
              return newPosts;
            });
          }}
        >
          fetch more
        </button>
      </section>

      <section className={styles.more}>
        <h2>More users</h2>
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <Suspense fallback={<Loader loadingText={"Loading users..."} />}>
            <UserList
              endpoint={"user"}
              action={{ text: "Follow", icon: <PlusIcon /> }}
            />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}
