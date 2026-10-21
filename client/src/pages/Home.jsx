import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Home.module.css";
import { Suspense, use, useState } from "react";
import UserList from "@/components/UserList";
import PostCard from "@/components/PostCard";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { fetchData } from "@/utils/js/fetchData";

export default function Home() {
  document.title = `${import.meta.env.VITE_TITLE}: Home`;
  const navigate = useNavigate();
  const initialPosts = use(fetchData("post"));
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className={`${styles.homePage} ${pageStyles.default}`}>
      <section className={styles.followed}>
        <h2>Followed users</h2>
        <Suspense fallback={<Loader loadingText={"Loading users..."} />}>
          <UserList endpoint={"user"} />
        </Suspense>
      </section>

      <section className={styles.feed}>
        {posts.data.map((p) => (
          <PostCard
            data={p}
            key={p.id}
            clickHandler={() => navigate("/post", { state: { id: p.id } })}
          />
        ))}
      </section>

      <section className={styles.more}>
        <h2>More users</h2>
        <Suspense fallback={<Loader loadingText={"Loading users..."} />}>
          <UserList
            endpoint={"user"}
            action={{ text: "Follow", icon: <div>...</div> }}
          />
        </Suspense>
      </section>
    </div>
  );
}
