import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Post.module.css";
import { useEffect, useState } from "react";
import { create } from "@/fieldsets/commentFieldsets";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import TextForm from "@/components/TextForm";
import { useLocation } from "react-router-dom";
import requestHandler from "@/handlers/requestHandler";

export default function Post() {
  document.title = `${import.meta.env.VITE_TITLE}: Post`;
  const locationState = useLocation().state;
  const [currentPost, setCurrentPost] = useState();
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    (async () => {
      const [post, comments] = await Promise.all([
        requestHandler.get(`post/${locationState.id}`),
        requestHandler.get(`comment/post/${locationState.id}`),
      ]);

      if (post.data) setCurrentPost(post.data);
      if (comments.data) setPostComments(comments.data);
    })();
  }, []);

  return (
    <div className={`${styles.postPage} ${pageStyles.default}`}>
      <section className={styles.post}>
        {currentPost && <PostCard data={currentPost} />}
      </section>
      <section className={styles.comments}>
        <h2>Comments</h2>
        {currentPost && (
          <TextForm
            fields={create[0].fields}
            initialData={{ postId: currentPost.id }}
          />
        )}
        <CommentList comments={postComments} sendToPost={false} />
      </section>
    </div>
  );
}
