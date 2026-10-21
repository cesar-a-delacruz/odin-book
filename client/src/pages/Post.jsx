import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Post.module.css";
import { Suspense, use } from "react";
import { create } from "@/fieldsets/commentFieldsets";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import TextForm from "@/components/TextForm";
import { useLocation } from "react-router-dom";
import Loader from "@/components/Loader";
import { fetchData } from "@/utils/js/fetchData";

export default function Post() {
  document.title = `${import.meta.env.VITE_TITLE}: Post`;
  const locationState = useLocation().state;
  const post = use(fetchData(`post/${locationState.id}`));

  return (
    <div className={`${styles.postPage} ${pageStyles.default}`}>
      <section className={styles.post}>
        <PostCard data={post.data} />
      </section>

      <section className={styles.comments}>
        <h2>Comments</h2>
        <TextForm fields={create[0].fields} initialData={{ postId: post.id }} />
        <Suspense fallback={<Loader loadingText={"Loading comments..."} />}>
          <CommentList
            endpoint={`comment/post/${locationState.id}`}
            sendToPost={false}
          />
        </Suspense>
      </section>
    </div>
  );
}
