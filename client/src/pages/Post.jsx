import pageStyles from "@/utils/css/modules/defaultPage.module.css";
import styles from "./styles/Post.module.css";
import { Suspense, use, useContext } from "react";
import { create } from "@/fieldsets/commentFieldsets";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import TextForm from "@/components/TextForm";
import { useLocation } from "react-router-dom";
import Loader from "@/components/Loader";
import { fetchData, invalidateData } from "@/utils/js/fetchData";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";
import requestHandler from "@/handlers/requestHandler";
import { AlertContext } from "@/contexts/AlertContext";

export default function Post() {
  document.title = `${import.meta.env.VITE_TITLE}: Post`;
  const locationState = useLocation().state;
  const post = use(fetchData(`post/${locationState.id}`));
  if (post.error) throw Error(post.error);
  const { setAlert } = useContext(AlertContext);

  return (
    <div className={`${styles.postPage} ${pageStyles.default}`}>
      <section className={styles.post}>
        <PostCard data={post.data} />
      </section>

      <section className={styles.comments}>
        <h2>Comments</h2>
        <TextForm
          fields={create[0].fields}
          initialData={{ postId: post.data.id }}
          submitHandler={submitComment}
        />
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <Suspense fallback={<Loader loadingText={"Loading comments..."} />}>
            <CommentList
              endpoint={`comment/post/${locationState.id}`}
              sendToPost={false}
            />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );

  async function submitComment(data) {
    const response = await requestHandler.post(data, "comment");
    let alert = { text: "Comment published successfully.", type: "success" };

    if (response.error) alert = { text: response.error, type: "error" };
    else invalidateData(`comment/post/${locationState.id}`);
    setAlert(alert);

    return response;
  }
}
