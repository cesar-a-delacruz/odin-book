import { useEffect, useState } from "react";
import styles from "./styles/Post.module.css";
import dbFaker from "@/api/dbFaker";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import TextForm from "@/components/TextForm";

export default function Post() {
  document.title = `${import.meta.env.VITE_TITLE}: Post`;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const db = await dbFaker();
      const dbPost = db.posts[0];
      dbPost.user = db.users.find((u) => u.id === dbPost.userId);
      dbPost.likes = db.likes.filter((l) => l.postId === dbPost.id).length;
      const dbComments = db.comments.filter((c) => {
        const belongsToPost = c.postId === dbPost.id;
        if (belongsToPost) c.user = db.users.find((u) => u.id === c.userId);
        return belongsToPost;
      });
      dbPost.comments = dbComments.length;
      setPost(dbPost);
      setComments(dbComments);
    })();
  }, []);

  return (
    <div className={styles.postPage}>
      <div className={styles.post}>{post && <PostCard data={post} />}</div>
      <div className={styles.comments}>
        <h2>Comments</h2>
        <TextForm
          attributes={{
            id: "content",
            placeholder: "New comment...",
          }}
          hiddenData={[{ id: "postId", value: post ? post.id : "" }]}
        />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}
