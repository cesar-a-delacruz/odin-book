import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Home.module.css";
import { Suspense, use, useContext, useState } from "react";
import UserList from "@/components/UserList";
import PostCard from "@/components/PostCard";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { fetchData, invalidateData } from "@/utils/js/fetchData";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";
import { PlusIcon } from "lucide-react";
import requestHandler from "@/handlers/requestHandler";
import { AlertContext } from "@/contexts/AlertContext";

export default function Home() {
  document.title = `${import.meta.env.VITE_TITLE}: Home`;
  const navigate = useNavigate();

  const initialPosts = use(fetchData("post"));
  if (initialPosts.error) throw Error(initialPosts.error);
  const [posts, setPosts] = useState(initialPosts);
  const { setAlert } = useContext(AlertContext);

  document.onscroll = async () => {
    if (document.documentElement.scrollTop === 0) return;

    const scrollPostion =
      document.documentElement.clientHeight +
      document.documentElement.scrollTop;
    if (document.documentElement.scrollHeight === parseInt(scrollPostion)) {
      const more = await requestHandler.get(
        `post?q=${posts.data[posts.data.length - 1].id}`,
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
      </section>

      <section className={styles.more}>
        <h2>More users</h2>
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <Suspense fallback={<Loader loadingText={"Loading users..."} />}>
            <UserList
              endpoint={"user"}
              action={{
                text: "Follow",
                icon: <PlusIcon />,
                handler: submitFollower,
              }}
            />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );

  async function submitFollower(userId) {
    const response = await requestHandler.post(
      { followedId: userId },
      "follower",
    );
    let alert = { text: "User followed successfully.", type: "success" };

    if (response.error) alert = { text: response.error, type: "error" };
    else invalidateData("user");
    setAlert(alert);

    return response;
  }
}
